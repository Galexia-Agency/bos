<style lang="scss">
  :root {
    --primaryColor: #1A237E;
    --secondaryColor: #212121;
    --tertiaryColor: white;
    --primaryFont: 'Montserrat', serif;
    --secondaryFont: 'Open Sans', sans-serif;
    --borderRadius: 0;
    --fontSize: 16px;
    --scrollbarBG: #F3F3F3;
    --thumbBG: #1A237E4D;

    overflow: hidden
  }
  body {
    overflow: hidden
  }

  /* Scrollbars */
  *::-webkit-scrollbar {
    width: 16px
  }
  * {
    scrollbar-width: thin;
    scrollbar-color: var(--thumbBG) var(--scrollbarBG);
    box-sizing: border-box
  }
  ::-webkit-scrollbar-track {
    background: var(--scrollbarBG)
  }
  ::-webkit-scrollbar-thumb {
    background-color: var(--thumbBG);
    border-radius: 6px;
    border: 3px solid var(--scrollbarBG)
  }

  /* Content */
  .contentWrapper {
    font-family: var(--secondaryFont);
    color: var(--secondaryColor);
    font-size: 16px;
    font-weight: 400;
    margin: 0;
    display: grid;
    grid-template-columns: 300px 1fr;
    h1, h2, h3, h4, h5, h6 {
      font-family: var(--primaryFont);
      font-weight: 400;
      color: var(--primaryColor);
      margin: 0 0 1em
    }
    h1 {
      font-size: 1.66em
    }
    h2 {
      font-size: 1.5em;
      margin: 0 0 .5em
    }
    h3 {
      font-size: 1.33em
    }
    h4 {
      font-size: 1.25em
    }
    h5 {
      font-size: 1.2em
    }
    h6 {
      font-size: 1.1em
    }
    .button.is-primary[disabled], fieldset[disabled] .button.is-primary, .button.is-primary, .button.is-primary:hover, .button.is-primary.is-hovered {
      background: var(--primaryColor)
    }
    fieldset:not([disabled]) .button.is-primary:not([disabled]):hover, fieldset:not([disabled]) .button.is-primary.is-hovered:not([disabled]) {
      opacity: .9
    }
    .button.is-archive[disabled], fieldset[disabled] .button.is-archive, .button.is-archive, .button.is-archive:hover, .button.is-archive.is-hovered {
      background: transparent;
      border: 1px solid red;
      color: red
    }
    .button.is-archive:hover, .button.is-archive.is-hovered {
      background: whitesmoke
    }
    .input:focus, .textarea:focus, .select select:focus, .is-focused.input, .is-focused.textarea, .select select.is-focused, .input:active, .textarea:active, .select select:active, .is-active.input, .is-active.textarea, .select select.is-active {
      border-color: var(--primaryColor)
    }
    input[type='date'] {
      max-width: calc(100% - 49px)
    }
  }
  svg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {
    box-sizing: border-box
  }
  :focus:not(:focus-visible) {
    outline: none
  }
  :any-link {
    color: var(--primaryColor);
    text-decoration: none
  }
  main {
    padding: 2rem
  }
  nav {
    padding: 2rem;
    height: 100vh;
    overflow-y: scroll
  }
  button {
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    font-family: inherit;
    color: var(--primaryColor)
  }
  .search {
    width: 75%;
    font-size: 1rem;
    padding: .25rem
  }

  /* Card */
  .item-description {
    font-weight: 100
  }
  .item-title, .item-date {
    font-size: .9rem;
    max-width: 82%;
    overflow-wrap: break-word;
    word-wrap: break-word
  }
  .item-date, .item-assignee {
    color: var(--primaryColor);
    opacity: .6
  }

  /* Menu */
  .hamburger {
    /* stylelint-disable-next-line */
    display: none!important
  }

  @media (max-width: 1000px) {
    main, nav {
      padding: 1.5rem
    }
    main {
      padding-top: 4rem;
      min-width: 100vw
    }
    .hamburger, nav, .contentWrapper {
      /* stylelint-disable-next-line */
      transition: .5s!important
    }
    .hamburger {
      padding: 0;
      /* stylelint-disable-next-line */
      display: inline-block!important;
      position: absolute;
      left: 1.75rem;
      top: 1rem;
      cursor: pointer;
      z-index: 2
    }
    .contentWrapper {
      grid-template-columns: 1fr
    }
    nav {
      z-index: 98;
      position: absolute;
      left: Min(calc(-100vw - 3rem - 46px), -300px);
      width: Min(calc(100vw - 3rem - 46px), 300px);
      background: white;
      border-right: 2px solid #F3F3F3
    }
    .nav_open nav {
      left: 0
    }
    .nav_open .contentWrapper, .nav_open .hamburger {
      margin-left: Min(calc(100vw - 3rem - 46px), 300px)
    }
  }

  /* Board */
  .board {
    margin-top: 20px;
    white-space: nowrap;
    > * {
      display: inline-block
    }
    .new-list {
      margin-top: 10px
    }
  }

  $column-width: 320px;
  .smooth-dnd-draggable-wrapper .list-container {
    padding-bottom: 0
  }
  .list-container {
    width: $column-width;
    padding: 10px;
    margin: 5px;
    margin-right: 20px;
    background-color: #F3F3F3;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .12), 0 1px 1px rgba(0, 0, 0, .24);
    max-height: 60vh;
    overflow: auto;
    > .item-entry {
      background-color: #F3F3F3;
      padding-bottom: 10px;
      position: sticky;
      bottom: 0
    }
  }
  .lists-container {
    > * {
      display: inline-block;
      vertical-align: top
    }
  }
  .list-header {
    padding-bottom: 10px;
    padding-top: 10px;
    margin-top: -10px;
    margin-left: 5px;
    margin-right: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: .5rem;
    font-size: 18px;
    position: sticky;
    top: -10px;
    z-index: 1;
    background: #F3F3F3
  }
  .list-header .list-delete {
    opacity: 0
  }
  .list-header:hover .list-delete {
    opacity: 1
  }
  .list-title {
    border: none;
    background: transparent;
    font-size: 1rem;
    padding: .25rem;
    width: 75%
  }
  .archived {
    color: black;
    border: 1px solid black
  }
  .archived .list-title {
    width: 60%
  }
  .list-title:focus {
    background: white
  }
  .card {
    margin: 5px;
    background-color: white;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .12), 0 1px 1px rgba(0, 0, 0, .24);
    padding: 10px
  }
  .card-ghost {
    transition: .25s all;
    box-shadow: 0 5px 10px rgba(0, 0, 0, .12);
    transform: scale(1.1);
    cursor: move
  }
  .card-ghost-drop {
    transform: scale(1)
  }
  .list-drag-handle {
    cursor: move
  }
  .list-container.archived .list-drag-handle {
    cursor: not-allowed
  }
  .list-delete {
    cursor: pointer
  }
  .item-entry {
    padding-top: 10px;
    margin-top: 10px;
    border-top: 1px solid #DDDDDD
  }
  .new-list {
    width: $column-width;
    margin-left: -10px
  }
  .clear-button {
    position: absolute;
    top: 20px;
    right: 20px
  }
  .refresh {
    font-size: 2rem;
    width: min-content;
    position: absolute;
    right: 2rem;
    top: .5rem;
    cursor: pointer;
    z-index: 9;
    transition: transform .66s ease-in-out 0s
  }
  .refresh.clicked {
    transform: rotate(360deg)
  }
  .nav_open .refresh {
    opacity: 0;
    pointer-events: none
  }
  @media (hover: none) {
    .list-header .list-delete {
      display: inline
    }
  }

  /* Error */
  .error {
    background-color: white;
    display: grid;
    gap: 1rem;
    place-content: center;
    padding: 30px
  }

  /* NavLink */
  .contentWrapper h4#other {
    margin-top: .5rem;
    margin-bottom: .25em;
    text-decoration: underline
  }
  .navLink.other {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis
  }

  /* Loading */
  .sidebar-loading, .main-loading {
    background-color: #E4E4E4;
    animation: fade-data .6s linear infinite alternate-reverse
  }
  .loading-content {
    background: linear-gradient(90deg, #F4F4F4 8%, #E4E4E4 18%, #F4F4F4 33%);
    border-radius: 10px;
    animation: shimmer-data 5s linear infinite forwards;
    height: 20px;
    margin-bottom: 20px
  }
  /* stylelint-disable-next-line at-rule-no-unknown */
  @for $i from 2 through 10 {
    .loading-content:nth-child(#{$i}) {
      animation-delay: .25s * $i
    }
  }

  @keyframes fade-data {
    from {
      opacity: .6
    }
    to {
      opacity: 1
    }
  }
  @keyframes shimmer-data {
    from {
      background-position: 0 0
    }
    to {
      background-position: 100rem 0
    }
  }
</style>

<template>
  <div v-if="authenticated" class="contentWrapper">
    <ui-modal
      ref="modal"
      :active="error.active"
      :cancellable="!error.data"
      @close="$store.commit('error', { active: false })"
    >
      <div class="error">
        <h1>Uh oh! An error has occured</h1>
        <h2>{{ error.description }}</h2>
        <template v-if="error.data">
          <p>Please copy the below information so as to not lose your changes</p>
          <textarea :value="JSON.stringify(error.data)" rows="10" />
        </template>
      </div>
    </ui-modal>
    <template v-if="!$fetchState.pending">
      <Hamburger type="arrow" color="var(--primaryColor)" :expanded="expanded" />
      <button type="button" class="refresh" :class="{clicked: refreshed}" @click="refresh">
        <font-awesome-icon :icon="['fa-solid', 'fa-sync']" />
      </button>
      <nav>
        <nuxt-link to="/">
          <h2>Clients</h2>
        </nuxt-link>
        <input
          v-model="search"
          type="search"
          rel="search"
          placeholder="Search..."
          aria-label="Search..."
          class="search"
        >
        <project-nav-link v-if="filteredProjects.hotLeads.length > 0" type="Hot Leads" :clients="clients" :filtered-projects="filteredProjects.hotLeads" :search="search" />
        <project-nav-link v-if="filteredProjects.development.length > 0" type="Development" :clients="clients" :filtered-projects="filteredProjects.development" :search="search" />
        <project-nav-link v-if="filteredProjects.inHouse.length > 0" type="In House" :clients="clients" :filtered-projects="filteredProjects.inHouse" :search="search" />
        <project-nav-link v-if="filteredProjects.coldLeads.length > 0" type="Cold Leads" :clients="clients" :filtered-projects="filteredProjects.coldLeads" :search="search" />
        <project-nav-link v-if="filteredProjects.paused.length > 0" type="Paused" :clients="clients" :filtered-projects="filteredProjects.paused" :search="search" />
        <project-nav-link v-if="filteredProjects.onGoing.length > 0" type="On-Going" :clients="clients" :filtered-projects="filteredProjects.onGoing" :search="search" />
        <project-nav-link v-if="filteredProjects.closedLead.length > 0" type="Closed Leads" :clients="clients" :filtered-projects="filteredProjects.closedLead" :search="search" />
        <project-nav-link v-if="filteredProjects.completed.length > 0" type="Completed" :clients="clients" :filtered-projects="filteredProjects.completed" :search="search" />
        <project-nav-link v-if="filteredProjects.cancelled.length > 0" type="Cancelled" :clients="clients" :filtered-projects="filteredProjects.cancelled" :search="search" />
        <template v-if="filteredProjects.other.length > 0">
          <h4 id="other">
            Other
          </h4>
          <template v-for="(project, index) in filteredProjects.other">
            <nuxt-link
              v-show="((!search) || ((project.business_name).toLowerCase()).startsWith(search.toLowerCase()))"
              :key="index + project.business_name"
              :to="`/client/${project.business_shortname.toLowerCase()}`"
              class="navLink other"
              v-text="project.business_name"
            />
          </template>
        </template>
        <button v-if="claims.groups.includes('admin')" type="button" class="button primary" style="margin-top: .75em" @click="showClientModal()">
          New Client
        </button>
        <button type="button" class="button primary" style="margin-top: .75em" @click="logout()">
          Logout
        </button>
      </nav>
    </template>
    <template v-else>
      <nav class="sidebar-loading">
        <div class="loading-content" />
        <div class="loading-content" />
        <div class="loading-content" />
        <div class="loading-content" />
        <div class="loading-content" />
      </nav>
    </template>
    <nuxt keep-alive />
    <ui-modal
      ref="modal"
      :active="modal.client"
      @close="hideClientModal"
    >
      <clientModal ref="newClient" @add="newClient" @cancel="hideClientModal" />
    </ui-modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Hamburger from 'vue-hamburger/hamburger.vue'
import projectNavLink from '~/components/projectNavLink'
import clientModal from '~/components/modals/update/clientModal'

export default {
  components: {
    projectNavLink,
    Hamburger,
    clientModal
  },
  async fetch () {
    if (await this.$auth.isAuthenticated()) {
      this.$store.commit('okta', { authenticated: await this.$auth.isAuthenticated(), claims: await this.$auth.getUser() })
      this.$axios.setHeader('Authorization', `Bearer ${this.$auth.getAccessToken()}`)
      const self = this
      await this.$axios.$get('https://api.galexia.agency/get',
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        }
      )
        .then((response) => {
          response[3].forEach((project, index) => {
            if (project.lists) {
              response[3][index].lists = JSON.parse(project.lists)
            }
          })
          const clients = response[0].sort(function (a, b) {
            const textA = a.business_shortname.toUpperCase()
            const textB = b.business_shortname.toUpperCase()
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0
          })
          self.$store.commit('clients', clients)
          self.$store.commit('contacts', response[1])
          self.$store.commit('domains', response[2])
          self.$store.commit('projects', response[3])
          if (self.$route.name === 'client-client') {
            if (!self.$store.state.clients.find(client => client.business_shortname.toLowerCase() === self.$route.params.client)) {
              self.$nuxt.context.error({ statusCode: 404, message: 'Client not found' })
            }
          }
        })
        .catch(function (e) {
          const error = {}
          error.description = e.message
          self.$store.commit('error', error)
        })
    } else {
      this.$router.push('/login')
    }
  },
  data () {
    return {
      search: '',
      refreshed: false,
      modal: {
        client: false
      },
      expanded: null
    }
  },
  computed: {
    ...mapState([
      'error',
      'contacts',
      'domains',
      'projects',
      'clients',
      'authenticated',
      'claims'
    ]),
    filteredProjects () {
      const hotLeads = []
      const coldLeads = []
      const development = []
      const paused = []
      const inHouse = []
      const onGoing = []
      const closedLead = []
      const completed = []
      const cancelled = []
      const other = []
      this.clients.forEach((client) => {
        this.projects.forEach((project) => {
          if (project.client_id === client.id) {
            if (project.status === 'Lead') {
              hotLeads.push(project)
            } else if (project.status === 'Hot Lead') {
              hotLeads.push(project)
            } else if (project.status === 'Cold Lead') {
              coldLeads.push(project)
            } else if (project.status === 'Development') {
              development.push(project)
            } else if (project.status === 'Paused') {
              paused.push(project)
            } else if (project.status === 'In House') {
              inHouse.push(project)
            } else if (project.status === 'On-Going') {
              onGoing.push(project)
            } else if (project.status === 'Closed Lead') {
              closedLead.push(project)
            } else if (project.status === 'Completed') {
              completed.push(project)
            } else if (project.status === 'Cancelled') {
              cancelled.push(project)
            } else if (this.claims.groups.includes('admin')) {
              other.push(project)
            }
          }
        })
        if (
          hotLeads.find(e => e.client_id === client.id) === undefined &&
          coldLeads.find(e => e.client_id === client.id) === undefined &&
          development.find(e => e.client_id === client.id) === undefined &&
          paused.find(e => e.client_id === client.id) === undefined &&
          inHouse.find(e => e.client_id === client.id) === undefined &&
          onGoing.find(e => e.client_id === client.id) === undefined &&
          closedLead.find(e => e.client_id === client.id) === undefined &&
          completed.find(e => e.client_id === client.id) === undefined &&
          cancelled.find(e => e.client_id === client.id) === undefined &&
          this.claims.groups.includes('admin')
        ) {
          other.push(client)
        }
      })
      return {
        hotLeads,
        coldLeads,
        development,
        paused,
        inHouse,
        onGoing,
        closedLead,
        completed,
        cancelled,
        other
      }
    }
  },
  methods: {
    async logout () {
      this.$nuxt.$loading.start()
      await this.$auth.signOut()
      this.$store.dispatch('okta', { authenticated: await this.$auth.isAuthenticated() })
      localStorage.clear()
      sessionStorage.clear()
      const COOKIES = document.cookie.split(';')
      for (let i = 0; i < COOKIES.length; i++) {
        const COOKIE = COOKIES[i]
        const EQ_POS = COOKIE.indexOf('=')
        const NAME = EQ_POS > -1 ? COOKIE.substr(0, EQ_POS) : COOKIE
        document.cookie = NAME + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT'
      }
      this.$nuxt.$loading.finish()
    },
    refresh () {
      this.refreshed = true
      location.reload()
    },
    showClientModal (data) {
      this.modal.client = true
      const self = this
      document.documentElement.classList.remove('nav_open')
      setTimeout(function () {
        document.documentElement.classList.add('nav_close')
        self.expanded = false
      }, 500)
      this.$nextTick(() => {
        this.$refs.newClient.show(data)
      })
    },
    hideClientModal () {
      this.modal.client = false
    },
    async newClient (data) {
      this.hideClientModal()
      try {
        await this.$store.dispatch('addClient', data)
        this.$router.push('/client/' + data.business_shortname)
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
