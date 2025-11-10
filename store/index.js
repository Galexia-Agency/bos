import importedActions from '../actions'

export const state = () => ({
  loading: false,
  isClientLoaded: false,
  // Default values for me now that we're not using Okta
  userInfo: {
    email: 'joe@galexia.agency',
    groups: ['admin', 'billing']
  },
  clients: [],
  contacts: [],
  domains: [],
  projects: [],
  filteredProjects: {},
  products: [],
  error: {
    active: false
  },
  conflicts: {
    promise: null,
    resolvePromise: null,
    title: '',
    before: '',
    after: '',
    updated: '',
    type: 'text',
    reveal: false
  },
  pandle: {
    dashboard: {
      monthlyCharts: []
    }
  }
})

export const actions = {
  async nuxtClientInit ({ commit, dispatch }, { $axios }) {
    commit('isClientLoaded', false)
    // eslint-disable-next-line no-console
    console.log('Starting the initial get')
    await Promise.all([
      $axios.$get('https://api.galexia.agency/get', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    ]).then(([response]) => {
      response[3].forEach((project, index) => {
        if (project.lists) {
          response[3][index].lists = JSON.parse(project.lists)
        }
        if (project.ongoing) {
          response[3][index].ongoing = Boolean(project.ongoing)
        }
      })
      commit('clients', response[0].sort(function (a, b) {
        const textA = a.business_shortname.toUpperCase()
        const textB = b.business_shortname.toUpperCase()
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0
      }))
      commit('contacts', response[1])
      commit('domains', response[2])
      commit('projects', response[3])
      commit('products', response[4])
      commit('pandleDashboard', response[5])
      dispatch('projectDatesHelper')
      dispatch('updateClientPandleDataHelper')
      dispatch('filteredProjectsHelper')
      commit('isClientLoaded', true)
      // eslint-disable-next-line no-console
      console.log('Initial get has completed')
    }).catch(function (e) {
      const error = {}
      error.description = e
      commit('error', error)
    })
  },
  ...importedActions
}

export default {
  state,
  actions
}
