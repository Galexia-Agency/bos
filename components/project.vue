<style scoped lang="scss">
  .edit {
    color: var(--primaryColor);
    font-size: 1.25rem
  }
  button.centered {
    display: inline-grid;
    font-size: 1.5rem;
    cursor: pointer;
    place-content: center;
    place-items: center;
    .fa-sort-up {
      margin-top: .4em
    }
    .fa-sort-down {
      margin-top: -.4em
    }
  }
  .project-details {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    align-items: center;
    h2 {
      margin: 0
    }
    .list-container {
      margin-right: 0;
      border: 1px solid transparent;
      transition: border-color .4s;
      &.toggled {
        border: 1px solid black
      }
    }
  }
  .container {
    margin: 2rem 0
  }
  .list-container {
    display: inline-block;
    width: auto;
    color: var(--primaryColor)
  }
  select {
    height: 100%;
    font-size: 16px;
    background: transparent;
    border: none
  }
</style>

<template>
  <div>
    <div class="project-details">
      <button type="button" class="centered" @click="toggleProjectVisibility">
        <font-awesome-icon v-if="show" :icon="['fa-solid', 'fa-sort-up']" />
        <font-awesome-icon v-else :icon="['fa-solid', 'fa-sort-down']" />
      </button>
      <h2>
        {{ project.name }}
      </h2>
      <a v-if="project.admin.includes(userInfo.email)" class="edit" @click="showProjectModal(project)">
        <font-awesome-icon :icon="['fa-solid', 'fa-edit']" />
      </a>
      <a v-if="project.project_url" class="list-container" :href="project.project_url" target="_blank">
        <font-awesome-icon :icon="['fa-solid', 'fa-desktop']" />
        <span>URL</span>
      </a>
      <a v-if="project.project_login_url" class="list-container" :href="project.project_login_url" target="_blank">
        <font-awesome-icon :icon="['fa-solid', 'fa-sign-in-alt']" />
        <span>Login</span>
      </a>
      <a v-if="project.github_url" class="list-container" :href="project.github_url" target="_blank">
        <font-awesome-icon :icon="['fa-brands', 'fa-github']" />
        <span>GitHub</span>
      </a>
      <a v-if="project.drive_url" class="list-container" :href="project.drive_url" target="_blank">
        <font-awesome-icon :icon="['fa-brands', 'fa-google-drive']" />
        <span>Drive</span>
      </a>
      <span v-if="project.hosting && project.hosting === 'Digital Ocean'" class="list-container">
        <font-awesome-icon :icon="['fa-brands', 'fa-digital-ocean']" />
        <span>Digital Ocean</span>
      </span>
      <span v-else-if="project.hosting && project.hosting === 'Netlify'" class="list-container">
        <font-awesome-icon :icon="['fa-solid', 'fa-cloud']" />
        <span>Netlify</span>
      </span>
      <a v-else-if="project.hosting && validURL(project.hosting)" :href="project.hosting" target="_blank" class="list-container">
        <font-awesome-icon :icon="['fa-solid', 'fa-cloud']" />
        <span v-text="formatURL(project.hosting)" />
      </a>
      <span v-else-if="project.hosting" class="list-container">
        <font-awesome-icon :icon="['fa-solid', 'fa-cloud']" />
        <span v-text="project.hosting" />
      </span>
      <div v-if="project.php" class="list-container">
        <font-awesome-icon :icon="['fa-brands', 'fa-php']" />
        <span v-text="project.php" />
      </div>
      <div class="list-container">
        <font-awesome-icon :icon="['fa-solid', 'fa-tasks']" />
        <span v-text="project.status" />
      </div>
      <div v-if="project.start_date && !project.ongoing" class="list-container">
        <font-awesome-icon :icon="['fa-solid', 'fa-calendar-alt']" />
        <span v-text="daysToStart" />
      </div>
      <div v-if="project.start_date && !project.ongoing" class="list-container">
        <font-awesome-icon :icon="['fa-solid', 'fa-calendar-alt']" />
        <span v-text="daysToComplete" />
      </div>
      <div v-if="project.daysWithUs" class="list-container">
        <font-awesome-icon :icon="['fa-solid', 'fa-calendar-alt']" />
        <span v-text="daysWithUs" />
      </div>
      <a v-if="$parent.client.pandle_id && !project.pandle_id && userInfo.groups.includes('admin')" class="list-container" @click="addProjectPandle()">
        <font-awesome-icon :icon="['fa-solid', 'fa-calculator']" />
        Add to Pandle
      </a>
      <a v-else-if="project.pandle_id && userInfo.groups.includes('admin')" class="list-container" :href="`https://my.pandle.com/projects/${project.pandle_id}`" target="_blank">
        <font-awesome-icon :icon="['fa-solid', 'fa-calculator']" />
        View in Pandle
      </a>
      <!-- <button v-if="project.pandle_id && userInfo.groups.includes('billing')" class="list-container" type="button" @click="createInvoice()">
        Create Invoice
      </button>
      <button v-if="project.pandle_id && userInfo.groups.includes('billing')" class="list-container" type="button" @click="createQuote()">
        Create Quote
      </button> -->
      <button v-if="project.pandle_id && userInfo.groups.includes('billing')" class="list-container" type="button" @click="showMoneyGraphsModal()">
        <font-awesome-icon :icon="['fa-solid', 'fa-chart-bar']" />
        View Monthly Monetary Accounts
      </button>
      <div class="list-container">
        <font-awesome-icon :icon="['fa-solid', 'fa-trash-can']" />
        <Toggle :model="showArchived" label="Show Deleted Items" :class="{toggled: showArchived}" @input="showArchived = $event" />
      </div>
    </div>
    <board v-show="show" :project-id="project.id" />
    <ui-modal
      ref="modal"
      :active="modal"
      @close="hideProjectModal"
    >
      <projectModal ref="project" @submit="updateProject" @cancel="hideProjectModal" />
    </ui-modal>
    <ui-modal
      ref="moneyGraphsModal"
      :active="moneyGraphsModal"
      :cancellable="true"
      @close="hideMoneyGraphsModal"
    >
      <projectMoneyGraphsModel ref="projectMoneyGraphs" :project="project" @cancel="hideMoneyGraphsModal" />
    </ui-modal>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import EventSourcePolyfill from 'eventsource'
// eslint-disable-next-line import/no-webpack-loader-syntax
import Worker from 'worker-loader!../workers/projectSSE.js'
import Toggle from '~/components/ui/UiToggle.vue'
import Board from '~/components/Board'
import projectModal from '~/components/modals/update/projectModal'
import projectMoneyGraphsModel from '~/components/modals/display/projectMoneyGraphsModel'

export default {
  components: {
    Toggle,
    Board,
    projectModal,
    projectMoneyGraphsModel
  },
  props: {
    projectId: {
      type: Number,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      modal: false,
      moneyGraphsModal: false,
      show: true,
      showArchived: false,
      sseWorker: null,
      sse: null,
      timeout: null
    }
  },
  computed: {
    ...mapState([
      'userInfo',
      'isRenewingTokens',
      'projects'
    ]),
    ...mapGetters([
      'getProjectById'
    ]),
    project () {
      return this.getProjectById(this.projectId)
    },
    daysToStart () {
      if (!this.project.enquiry_date) {
        return null
      }
      if (this.project.start_date) {
        if (this.project.daysToStart === 1) {
          return `Project took ${this.project.daysToStart} day to start`
        }
        return `Project took ${this.project.daysToStart} days to start`
      }
      if (this.project.daysToStart === 1) {
        return `Project has been a lead for ${this.project.daysToStart} day`
      }
      return `Project has been a lead for ${this.project.daysToStart} days`
    },
    daysToComplete () {
      if (this.project.ongoing) {
        return null
      }
      if (this.project.completion_date) {
        if (this.project.daysToComplete === 1) {
          return `Project took ${this.project.daysToComplete} day to complete`
        }
        return `Project took ${this.project.daysToComplete} days to complete`
      }
      if (this.project.daysToComplete === 1) {
        return `Project has taken ${this.project.daysToComplete} day`
      }
      return `Project has taken ${this.project.daysToComplete} days`
    },
    daysWithUs () {
      if (!this.project.daysWithUs) {
        return null
      }
      if (this.project.daysWithUs === 1) {
        return `Project has been with us for ${this.project.daysWithUs} day`
      }
      return `Project has been with us for ${this.project.daysWithUs} days`
    }
  },
  watch: {
    isRenewingTokens (newVal) {
      if (document.visibilityState === 'visible') {
        if (newVal) {
        // eslint-disable-next-line no-console
          console.log('Stopping SSE due to renewing tokens and we need to send the new token with SSE')
          this.sse_end()
        } else {
        // eslint-disable-next-line no-console
          console.log('Starting SSE due to tokens now being renewed')
          this.sse_start()
        }
      }
    }
  },
  mounted () {
    this.sse_start()
    document.addEventListener('visibilitychange', this.visibleChange)
    const projectVisibility = localStorage.getItem(`${this.project.client_name}_${this.project.name}_visibility`)
    if (projectVisibility !== null) {
      this.show = JSON.parse(projectVisibility)
    }
  },
  beforeDestroy () {
    clearTimeout(this.timeout)
    document.removeEventListener('visibilitychange', this.visibleChange)
    this.sse_end()
  },
  methods: {
    toggleProjectVisibility () {
      this.show = !this.show
      localStorage.setItem(`${this.project.client_name}_${this.project.name}_visibility`, this.show)
    },
    visibleChange () {
      if (document.visibilityState !== 'visible') {
        clearTimeout(this.timeout)
        this.sse_end()
      }
    },
    sse_start () {
      this.timeout = window.setTimeout(async () => {
        if (!this.isRenewingTokens && document.visibilityState === 'visible') {
          const id = this.project.id
          const authToken = `Bearer ${await this.$auth.getAccessToken()}`
          const self = this
          const url = `https://api.galexia.agency/projects/sse?id=${id}`
          if (window.Worker) {
            if (!this.sseWorker) {
              this.sseWorker = new Worker()
              this.sseWorker.postMessage(['start', url, id, authToken])
              this.sseWorker.onmessage = (e) => {
                self.sse_updateProject(e.data)
              }
              // eslint-disable-next-line no-console
              console.log('Started SSE')
            } else {
              this.sse_end()
              this.sse_start()
            }
          } else if (!this.sse) {
            this.sse = new EventSourcePolyfill(url, {
              headers: {
                Authorization: authToken
              },
              withCredentials: false
            })
            this.sse.addEventListener(id, function (event) {
              self.sse_updateProject(JSON.parse(event.data)[0])
            }, {
              once: false,
              retry: 5000
            })
            // eslint-disable-next-line no-console
            console.log('Started SSE')
          } else {
            this.sse_end()
            this.sse_start()
          }
        }
        // Delay the SSE request slightly for each consecutive project
      }, (this.index + 1) * 500)
    },
    sse_end () {
      if (window.Worker) {
        if (this.sseWorker) {
          this.sseWorker.postMessage(['stop'])
          this.sseWorker = null
          // eslint-disable-next-line no-console
          console.log('Stopped SSE')
        }
      } else if (this.sse) {
        this.sse.close()
        this.sse = null
        // eslint-disable-next-line no-console
        console.log('Stopped SSE')
      }
    },
    sse_updateProject (newProject) {
      try {
        this.$store.commit('loading', true)
        newProject.lists = JSON.parse(newProject.lists)
        const currentProject = this.$store.getters.getProjectById(newProject.id)
        // If the database content is newer, then replace our version
        if (new Date(newProject.updated_at) > new Date(currentProject.updated_at)) {
          this.$store.commit('updateProject', newProject)
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e)
        this.sse_end()
      } finally {
        // Give this a bit of a delay so the loading indicator actually appears
        window.setTimeout(() => {
          this.$store.commit('loading', false)
        }, 250)
      }
    },
    changeArchived () {
      this.showArchived = !this.showArchived
    },
    showProjectModal (data) {
      this.$parent.dragging = true
      this.modal = true
      this.$nextTick(() => {
        this.$refs.project.show(data)
      })
    },
    hideProjectModal () {
      this.$parent.dragging = false
      this.modal = false
    },
    showMoneyGraphsModal () {
      this.$parent.dragging = true
      this.moneyGraphsModal = true
    },
    hideMoneyGraphsModal () {
      this.$parent.dragging = false
      this.moneyGraphsModal = false
    },
    async updateProject (data) {
      this.hideProjectModal()
      try {
        await this.$store.dispatch('updateProject', data)
      } catch (e) {
        const error = {}
        error.description = e
        error.data = data
        this.$store.commit('error', error)
      }
    },
    async addProjectPandle () {
      const data = {}
      Object.assign(data, this.project)
      data.client_name = this.$parent.client.business_shortname
      try {
        await this.$store.dispatch('addProjectPandle', data)
      } catch (e) {
        const error = {}
        error.description = e
        error.data = data
        this.$store.commit('error', error)
      }
    }
  }
}
</script>
