export default {
  async addContact ({ commit }, data) {
    data.email = data.email.toLowerCase()
    const response = await this.$axios.$put('https://api.galexia.agency/contacts',
      {
        ...data
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
    return await commit('contacts', response)
  },
  async updateContact ({ commit, dispatch }, data) {
    try {
      data.email = data.email.toLowerCase()
      const response = await this.$axios.$post('https://api.galexia.agency/contacts',
        {
          ...data
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        }
      )
      return await commit('updateContact', response[0])
    } catch (e) {
      if (await e.response && await e.response.status === 429) {
        // Data from the database
        const sourceOfTruth = e.response.data[0]
        // What we're going to force push up to the database after having merged our changes with the truth
        const whatToForcePush = sourceOfTruth
        try {
          // If the gender state doesn't match, open the conflict resolution modal
          if (whatToForcePush.title !== data.title) {
            whatToForcePush.title = await dispatch('conflicts', {
              title: 'Gender',
              type: 'select',
              options: ['Male', 'Female', 'Other'],
              before: whatToForcePush.title,
              after: data.title
            })
          }
          // If the first name state doesn't match, open the conflict resolution modal
          if (whatToForcePush.f_name !== data.f_name) {
            whatToForcePush.f_name = await dispatch('conflicts', {
              title: 'First Name',
              type: 'text',
              before: whatToForcePush.f_name,
              after: data.f_name,
              required: true
            })
          }
          // If the last name state doesn't match, open the conflict resolution modal
          if (whatToForcePush.l_name !== data.l_name) {
            whatToForcePush.l_name = await dispatch('conflicts', {
              title: 'Last Name',
              type: 'text',
              before: whatToForcePush.l_name,
              after: data.l_name,
              required: true
            })
          }
          // If the telephone state doesn't match, open the conflict resolution modal
          if (whatToForcePush.tel !== data.tel) {
            whatToForcePush.tel = await dispatch('conflicts', {
              title: 'Telephone',
              type: 'text',
              before: whatToForcePush.tel,
              after: data.tel,
              pattern: '[^s]+',
              noSpaces: true
            })
          }
          // If the email state doesn't match, open the conflict resolution modal
          if (whatToForcePush.email !== data.email) {
            whatToForcePush.email = await dispatch('conflicts', {
              title: 'Email',
              type: 'text',
              before: whatToForcePush.email,
              after: data.email,
              pattern: '[^s]+',
              noSpaces: true,
              required: true
            }).toLowerCase()
          }
          // If the role state doesn't match, open the conflict resolution modal
          if (whatToForcePush.role !== data.role) {
            whatToForcePush.role = await dispatch('conflicts', {
              title: 'Role',
              type: 'text',
              before: whatToForcePush.role,
              after: data.role
            })
          }
          // If the facebook state doesn't match, open the conflict resolution modal
          if (whatToForcePush.facebook !== data.facebook) {
            whatToForcePush.facebook = await dispatch('conflicts', {
              title: 'Facebook Profile Link',
              type: 'url',
              before: whatToForcePush.facebook,
              after: data.facebook
            })
          }
          // Force push the contact
          const response = await this.$axios.$post('https://api.galexia.agency/contacts',
            {
              ...whatToForcePush,
              force: true
            },
            {
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              }
            }
          )
          return await commit('updateContact', response[0])
        } catch (e) {
          const error = {}
          error.active = true
          error.description = e
          error.data = data
          return commit('error', error)
        }
      } else {
        const error = {}
        error.active = true
        error.description = e
        error.data = data
        return commit('error', error)
      }
    }
  }
}
