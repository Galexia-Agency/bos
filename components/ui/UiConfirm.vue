<style scoped>
  p {
    margin-bottom: 1em
  }
  .control {
    display: inline
  }
</style>

<template>
  <ui-modal
    ref="modal"
    :active="reveal"
    :cancellable="false"
  >
    <div class="query-form card">
      <form class="card-content" @submit.prevent="confirm">
        <p v-text="text" />
        <ui-button :autofocus="true" style-type="primary" type="submit">
          Yes
        </ui-button>
        <ui-button style-type="text" @click="cancel">
          No
        </ui-button>
      </form>
    </div>
  </ui-modal>
</template>

<script>
export default {
  data () {
    return {
      reveal: false,
      resolvePromise: undefined,
      text: 'Are you sure?'
    }
  },
  methods: {
    show (text) {
      if (this.reveal === false) {
        window.addEventListener('keydown', this.onKeyDown)
        this.reveal = true
        this.text = text
        return new Promise((resolve) => {
          this.resolvePromise = resolve
        })
      } else {
        this.reveal = false
        window.removeEventListener('keydown', this.onKeyDown)
      }
    },
    confirm () {
      this.reveal = false
      this.resolvePromise(true)
    },
    cancel () {
      this.reveal = false
      this.resolvePromise(false)
    },
    onKeyDown (event) {
      if (event.key === 'Escape') {
        this.cancel()
      }
    }
  }
}
</script>
