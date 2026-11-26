function calendarDate (value) {
  // Pandle uses YYYY/MM/DD; also accept ISO dates without timezone shifts.
  const parts = String(value).match(/^(\d{4})[-/](\d{2})[-/](\d{2})/)
  return parts ? new Date(Number(parts[1]), Number(parts[2]) - 1, Number(parts[3])) : new Date(value)
}

export function buildYearlyAccounts (months, incorporationDate, today = new Date()) {
  const incorporation = calendarDate(incorporationDate)
  const incorporationYear = incorporation.getFullYear()
  const firstYear = incorporationYear - (incorporation.getMonth() < 8 ? 1 : 0)
  const accounts = {}

  function accountingYear (date) {
    // Include the initial September weeks in the year ending the following September.
    if (incorporation.getMonth() === 8 && date.getFullYear() === incorporationYear && date.getMonth() === 8) {
      return incorporationYear
    }
    return date.getFullYear() - (date.getMonth() < 9 ? 1 : 0)
  }

  months.forEach((month) => {
    const year = accountingYear(calendarDate(month.month))
    if (!accounts[year]) {
      accounts[year] = { revenue: 0, expenses: 0 }
    }
    accounts[year].revenue += parseFloat(month.sales)
    accounts[year].expenses += parseFloat(month.expenses)
  })

  const currentYear = accountingYear(today)
  const formatDate = (date) => date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

  return Object.keys(accounts).sort((a, b) => Number(a) - Number(b)).map((year) => {
    const start = Number(year) === firstYear ? incorporation : new Date(Number(year), 9, 1)
    const end = new Date(Number(year) + 1, 8, 30)
    const { revenue, expenses } = accounts[year]
    const netProfit = revenue - expenses
    return {
      label: `${formatDate(start)} – ${formatDate(end)}${Number(year) === currentYear ? ' (YTD)' : ''}`,
      revenue,
      expenses,
      netProfit,
      netProfitMargin: revenue === 0 ? 0 : (netProfit / revenue) * 100
    }
  })
}
