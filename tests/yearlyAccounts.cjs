const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')

async function main () {
  const source = fs.readFileSync(path.join(__dirname, '../utils/yearlyAccounts.js'), 'utf8')
  const { buildYearlyAccounts } = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`)
  const incorporation = '2020/09/15'
  const month = (date, sales, expenses) => ({ month: date, sales: String(sales), expenses: String(expenses) })
  const months = [
    month('2022/09/30', 600, 60),
    month('2020/09/15', 100, 10),
    month('2021/10/01', 500, 50),
    month('2020/10/01', 200, 20),
    month('2021/09/30', 400, 40),
    month('2021/01/01', 300, 30)
  ]
  const original = JSON.stringify(months)
  const accounts = buildYearlyAccounts(months, incorporation, new Date(2022, 8, 30))

  assert.deepEqual(accounts, [
    {
      label: '15 Sept 2020 – 30 Sept 2021',
      revenue: 1000,
      expenses: 100,
      netProfit: 900,
      netProfitMargin: 90
    },
    {
      label: '1 Oct 2021 – 30 Sept 2022 (YTD)',
      revenue: 1100,
      expenses: 110,
      netProfit: 990,
      netProfitMargin: 90
    }
  ])
  assert.equal(JSON.stringify(months), original, 'Input data must remain unchanged')
  assert.equal(accounts.reduce((total, year) => total + year.revenue, 0), 2100)
  assert.equal(accounts.reduce((total, year) => total + year.expenses, 0), 210)

  const boundaryMonths = [...months, month('2022-10-01T00:00:00Z', 700, 70)]
  for (const today of [new Date(2022, 9, 1), new Date(2023, 0, 1), new Date(2023, 8, 30)]) {
    const result = buildYearlyAccounts(boundaryMonths, incorporation, today)
    assert.equal(result.filter((year) => year.label.includes('YTD')).length, 1)
    assert.equal(result[1].label, '1 Oct 2021 – 30 Sept 2022')
    assert.equal(result[2].label, '1 Oct 2022 – 30 Sept 2023 (YTD)')
    assert.equal(result[2].revenue, 700)
  }

  for (const today of [new Date(2020, 8, 20), new Date(2020, 9, 1), new Date(2021, 0, 1), new Date(2021, 8, 30)]) {
    const first = buildYearlyAccounts(months.slice(1), incorporation, today)
    assert.equal(first[0].label, '15 Sept 2020 – 30 Sept 2021 (YTD)')
  }

  const isoDates = buildYearlyAccounts([
    month('2023-10-01', 10.25, 2.5),
    month('2024-02-29', 20.5, 3.25),
    month('2024-09-30', 30.75, 4.5),
    month('2024-10-01', 40, 5)
  ], '2020-09-15', new Date(2024, 9, 1))
  assert.equal(isoDates[0].label, '1 Oct 2023 – 30 Sept 2024')
  assert.equal(isoDates[0].revenue, 61.5)
  assert.equal(isoDates[0].expenses, 10.25)
  assert.equal(isoDates[1].label, '1 Oct 2024 – 30 Sept 2025 (YTD)')

  const noSales = buildYearlyAccounts([month('2022/10/01', 0, 25)], incorporation, new Date(2022, 10, 1))
  assert.equal(noSales[0].netProfit, -25)
  assert.equal(noSales[0].netProfitMargin, 0)
  assert.deepEqual(buildYearlyAccounts([], incorporation), [])
  process.stdout.write('Accounting period checks passed.\n')
}

main().catch((error) => {
  process.stderr.write(`${error.stack}\n`)
  process.exitCode = 1
})
