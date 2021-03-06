export default {
  props: {
    name: String,
    value: [String, Number, Boolean],
    label: String
  },

  computed: {
    input: {
      get () {
        return this.value
      },

      set (value) {
        this.$emit('input', value)
      }
    }
  }
}
