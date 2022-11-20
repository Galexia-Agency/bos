import Vue from 'vue'

Vue.mixin({
  methods: {
    daysRemaining (upcomingDate) {
      const ONE_DAY = 1000 * 60 * 60 * 24
      const differenceMs = (new Date() - upcomingDate + 1) * -1
      const days = Math.round(differenceMs / ONE_DAY)
      if (days > 0) {
        return days + 1 + ' days left'
      } else if (days === -1) {
        return 'Due today'
      } else if (days === 0) {
        return '1 day left'
      } else {
        return Math.abs(days) + ' days overdue'
      }
    },
    diffDays (startDate, endDate) {
      if (!endDate) {
        endDate = new Date()
      } else {
        endDate = new Date(endDate)
      }
      const diffTime = Math.abs(new Date(startDate) - new Date(endDate))
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    },
    humanReadableDate (date) {
      const options = { year: 'numeric', month: 'short', day: 'numeric' }
      return new Date(date).toLocaleDateString(undefined, options)
    }
  }
})
