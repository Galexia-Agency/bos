<style scoped>
  textarea {
    min-height: 8em;
    resize: horizontal
  }
</style>

<template>
  <form class="query-form card" @submit.prevent="submit">
    <div class="card-content">
      <ui-input
        v-model="business_name"
        name="business_name"
        label="Business Name *"
        type="text"
        :autofocus="true"
        :required="true"
        @input="businessShortnameCreator"
      />
      <ui-input
        v-model="business_shortname"
        name="business_shortname"
        label="Business Shortname *"
        type="text"
        :required="true"
      />
      <ui-input
        v-model="about"
        name="about"
        label="About The Business"
        type="textarea"
      />
      <ui-input
        v-model="billing_email"
        name="billing_email"
        label="Billing Email"
        type="email"
      />
      <ui-input
        v-model="address.line1"
        name="address_line_1"
        label="Address Line 1"
        type="text"
      />
      <ui-input
        v-model="address.line2"
        name="address_line_2"
        label="Address Line 2"
        type="text"
      />
      <ui-input
        v-model="address.line3"
        name="address_line_3"
        label="Address Line 3"
        type="text"
      />
      <ui-input
        v-model="address.town"
        name="town_city"
        label="Town / City"
        type="text"
      />
      <ui-input
        v-model="address.county"
        name="county"
        label="County"
        type="text"
      />
      <ui-input
        v-model="address.postcode"
        name="postcode"
        label="Postcode"
        type="text"
      />
      <ui-input
        v-model="address.country"
        name="country"
        label="Country"
        type="text"
      />
      <ui-input
        v-model="source"
        name="source"
        label="Source"
        type="text"
      />
      <div class="field is-grouped">
        <ui-button type="submit" style-type="primary" :disabled="business_name === null || business_shortname === null">
          {{ id ? 'Update' : 'Add' }}
        </ui-button>
        <ui-button style-type="text" @click="cancel">
          Cancel
        </ui-button>
      </div>
    </div>
  </form>
</template>

<script>
function data () {
  return {
    business_name: null,
    business_shortname: null,
    about: null,
    address: {
      line1: '',
      line2: '',
      line3: '',
      county: '',
      country: 'United Kingdom',
      postcode: '',
      town: ''
    },
    source: null,
    id: null,
    pandle_id: null,
    billing_email: null,
    updated_at: null,
    created_at: null
  }
}
export default {
  data () {
    return data()
  },
  computed: {
    values () {
      return this.$data
    }
  },
  methods: {
    show (data) {
      this.reset()
      if (data) {
        // Clone the data so we don't get Vuex moaning about mutation state
        const newData = {}
        Object.assign(newData, data)
        // Check if we're already an address, and thus hydrate it, if not, create a new object placeholder
        if (newData.address && this.isJsonString(newData.address)) {
          newData.address = JSON.parse(newData.address)
        } else {
          newData.address = {
            line1: '',
            line2: '',
            line3: '',
            county: '',
            country: 'United Kingdom',
            postcode: '',
            town: ''
          }
        }
        Object.assign(this, newData)
      }
    },
    submit () {
      if (this.billing_email) {
        this.billing_email = this.billing_email.toLowerCase()
      }
      if (this.id) {
        this.$emit('submit', this.values)
      } else {
        this.$emit('add', this.values)
      }
    },
    cancel () {
      this.$emit('cancel', this.values)
    },
    reset () {
      Object.assign(this, data())
    },
    businessShortnameCreator ($event) {
      const currentBusinessShortName = this.business_shortname ? this.safeURL(this.business_shortname) : ''
      const newBusinessShortName = $event ? this.safeURL($event) : ''
      if (
        currentBusinessShortName.slice(0, -1) === newBusinessShortName ||
        currentBusinessShortName === newBusinessShortName.slice(0, -1) ||
        currentBusinessShortName.slice(0, -2) === newBusinessShortName ||
        currentBusinessShortName === newBusinessShortName.slice(0, -2)
      ) {
        this.business_shortname = newBusinessShortName
      }
    }
  }
}
</script>
