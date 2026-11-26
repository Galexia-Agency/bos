<template>
  <main>
    <section>
      <h2>
        Money Breakdown
      </h2>
      <table>
        <tbody>
          <tr>
            <td>
              Date of Incorporation
            </td>
            <td v-text="humanReadableDate($config.COMPANY_INCORPORATION)" />
          </tr>
          <template v-for="year in yearlyMoneyBreakdown">
            <tr :key="year.label + '_divider'" class="divider" />
            <tr :key="year.label + '_revenue'">
              <td>
                {{ year.label }} Revenue
              </td>
              <td v-text="'£' + year.revenue.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')" />
            </tr>
            <tr :key="year.label + '_expenses'">
              <td>
                {{ year.label }} Expenses
              </td>
              <td v-text="'-£' + year.expenses.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')" />
            </tr>
            <tr :key="year.label + '_netProfit'">
              <td>
                {{ year.label }} Net Profit
              </td>
              <td v-text="'£' + year.netProfit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')" />
            </tr>
            <tr :key="year.label + '_netProfitMargin'">
              <td>
                {{ year.label }} Net Profit Margin
              </td>
              <td v-text="year.netProfitMargin.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '%'" />
            </tr>
          </template>
          <tr class="divider" />
          <tr>
            <td>
              All Time Revenue
            </td>
            <td v-text="'£' + allTimeRevenue.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')" />
          </tr>
          <tr>
            <td>
              All Time Expenses
            </td>
            <td v-text="'-£' + allTimeExpenses.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')" />
          </tr>
          <tr>
            <td>
              All Time Net Profit
            </td>
            <td v-text="'£' + allTimeNetProfit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')" />
          </tr>
          <tr>
            <td>
              All Time Net Profit Margin
            </td>
            <td v-text="allTimeNetProfitMargin.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '%'" />
          </tr>
        </tbody>
      </table>
    </section>
    <ClientCompletion />
  </main>
</template>

<script>
import { mapState } from 'vuex'
import ClientCompletion from './clientCompletion'
import { buildYearlyAccounts } from '~/utils/yearlyAccounts'

export default {
  name: 'MoneyBreakdown',
  components: {
    ClientCompletion
  },
  computed: {
    ...mapState([
      'projects',
      'pandle'
    ]),
    bb_projectsRevenue () {
      let a = 0
      for (const project in this.projects) {
        if (this.projects[project].bb_revenue) {
          a += parseFloat(this.projects[project].bb_revenue)
        }
      }
      return a
    },
    bb_projectExpenses () {
      let a = 0
      for (const project in this.projects) {
        if (this.projects[project].bb_expenses) {
          a += parseFloat(this.projects[project].bb_expenses)
        }
      }
      return a
    },
    allTimeRevenue () {
      let a = this.bb_projectsRevenue
      this.pandle.dashboard.monthlyCharts.forEach((month) => {
        a += parseFloat(month.sales)
      })
      return a
    },
    allTimeExpenses () {
      let a = this.bb_projectExpenses
      this.pandle.dashboard.monthlyCharts.forEach((month) => {
        a += parseFloat(month.expenses)
      })
      return a
    },
    allTimeNetProfit () {
      return this.allTimeRevenue - this.allTimeExpenses
    },
    allTimeNetProfitMargin () {
      return (this.allTimeNetProfit / this.allTimeRevenue) * 100
    },
    yearlyMoneyBreakdown () {
      return buildYearlyAccounts(this.pandle.dashboard.monthlyCharts, this.$config.COMPANY_INCORPORATION)
    }
  }
}
</script>
