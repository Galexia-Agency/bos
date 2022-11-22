export default {
  async updateProject ({ commit, dispatch }, data) {
    try {
      const response = await this.$axios.$post('https://api.galexia.agency/projects',
        {
          id: data.id,
          name: data.name,
          status: data.status,
          hosting: data.hosting,
          php: data.php,
          github_url: data.github_url,
          drive_url: data.drive_url,
          project_url: data.project_url,
          project_login_url: data.project_login_url,
          pandle_id: data.pandle_id,
          completion_amount: data.completion_amount,
          bb_revenue: data.bb_revenue,
          bb_expenses: data.bb_expenses,
          viewer: data.viewer,
          contributor: data.contributor,
          admin: data.admin,
          updated_at: data.updated_at,
          enquiry_date: data.enquiry_date,
          start_date: data.start_date,
          ongoing: data.ongoing,
          completion_date: data.completion_date
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        }
      )
      // Don't update lists
      delete response[0].lists
      return await commit('updateProject', response[0])
    } catch (e) {
      if (await e.response && await e.response.status === 429) {
        // Data from the database
        const sourceOfTruth = e.response.data[0]
        // Don't update lists
        delete sourceOfTruth.lists
        // What we're going to force push up to the database after having merged our changes with the truth
        const whatToForcePush = sourceOfTruth
        try {
          // If the name state doesn't match, open the conflict resolution modal
          if (whatToForcePush.name !== data.name) {
            whatToForcePush.name = await dispatch('conflicts', {
              title: 'Name',
              type: 'text',
              before: whatToForcePush.name,
              after: data.name,
              required: true
            })
          }
          // If the status state doesn't match, open the conflict resolution modal
          if (whatToForcePush.status !== data.status) {
            whatToForcePush.status = await dispatch('conflicts', {
              title: 'Status',
              type: 'select',
              before: whatToForcePush.status,
              after: data.status,
              options: ['Hot Lead', 'Cold Lead', 'Development', 'Paused', 'In House', 'On-Going', 'Closed Lead', 'Completed', 'Cancelled'],
              required: true
            })
          }
          // If the project_url state doesn't match, open the conflict resolution modal
          if (whatToForcePush.project_url !== data.project_url) {
            whatToForcePush.project_url = await dispatch('conflicts', {
              title: 'Project URL',
              type: 'url',
              before: whatToForcePush.project_url,
              after: data.project_url
            })
          }
          // If the project_login_url state doesn't match, open the conflict resolution modal
          if (whatToForcePush.project_login_url !== data.project_login_url) {
            whatToForcePush.project_login_url = await dispatch('conflicts', {
              title: 'Project Login URL',
              type: 'url',
              before: whatToForcePush.project_login_url,
              after: data.project_login_url
            })
          }
          // If the hosting state doesn't match, open the conflict resolution modal
          if (whatToForcePush.hosting !== data.hosting) {
            whatToForcePush.hosting = await dispatch('conflicts', {
              title: 'Hosting',
              type: 'text',
              before: whatToForcePush.hosting,
              after: data.hosting
            })
          }
          // If the php state doesn't match, open the conflict resolution modal
          if (whatToForcePush.php !== data.php) {
            whatToForcePush.php = await dispatch('conflicts', {
              title: 'PHP Version',
              type: 'select',
              before: whatToForcePush.php,
              after: data.php,
              options: ['7.3', '7.4', '8.0', '8.1']
            })
          }
          // If the github_url state doesn't match, open the conflict resolution modal
          if (whatToForcePush.github_url !== data.github_url) {
            whatToForcePush.github_url = await dispatch('conflicts', {
              title: 'GitHub Link',
              type: 'url',
              before: whatToForcePush.github_url,
              after: data.github_url
            })
          }
          // If the drive_url state doesn't match, open the conflict resolution modal
          if (whatToForcePush.drive_url !== data.drive_url) {
            whatToForcePush.drive_url = await dispatch('conflicts', {
              title: 'Google Drive Link',
              type: 'url',
              before: whatToForcePush.drive_url,
              after: data.drive_url
            })
          }
          // If the viewer state doesn't match, open the conflict resolution modal
          if (whatToForcePush.viewer !== data.viewer) {
            whatToForcePush.viewer = await dispatch('conflicts', {
              title: 'Project Viewers',
              type: 'text',
              before: whatToForcePush.viewer,
              after: data.viewer,
              noSpaces: true,
              pattern: '[^s]+'
            })
          }
          // If the contributor state doesn't match, open the conflict resolution modal
          if (whatToForcePush.contributor !== data.contributor) {
            whatToForcePush.contributor = await dispatch('conflicts', {
              title: 'Project Contributors',
              type: 'text',
              before: whatToForcePush.contributor,
              after: data.contributor,
              noSpaces: true,
              pattern: '[^s]+'
            })
          }
          // If the admin state doesn't match, open the conflict resolution modal
          if (whatToForcePush.admin !== data.admin) {
            whatToForcePush.admin = await dispatch('conflicts', {
              title: 'Project Admins',
              type: 'text',
              before: whatToForcePush.admin,
              after: data.admin,
              noSpaces: true,
              pattern: '[^s]+'
            })
          }
          // If the completion_amount state doesn't match, open the conflict resolution modal
          if (whatToForcePush.completion_amount !== data.completion_amount) {
            whatToForcePush.completion_amount = await dispatch('conflicts', {
              title: 'Completion Total',
              type: 'number',
              before: whatToForcePush.completion_amount,
              after: data.completion_amount
            })
          }
          // If the bb_revenue state doesn't match, open the conflict resolution modal
          if (whatToForcePush.bb_revenue !== data.bb_revenue) {
            whatToForcePush.bb_revenue = await dispatch('conflicts', {
              title: 'Before Business Revenue',
              type: 'number',
              before: whatToForcePush.bb_revenue,
              after: data.bb_revenue
            })
          }
          // If the bb_expenses state doesn't match, open the conflict resolution modal
          if (whatToForcePush.bb_expenses !== data.bb_expenses) {
            whatToForcePush.bb_expenses = await dispatch('conflicts', {
              title: 'Before Business Expenses',
              type: 'number',
              before: whatToForcePush.bb_expenses,
              after: data.bb_expenses
            })
          }
          // If the enquiry_date state doesn't match, open the conflict resolution modal
          if (whatToForcePush.enquiry_date !== data.enquiry_date) {
            whatToForcePush.enquiry_date = await dispatch('conflicts', {
              title: 'Date of Enquiry',
              type: 'date',
              before: whatToForcePush.enquiry_date,
              after: data.enquiry_date
            })
          }
          // If the start_date state doesn't match, open the conflict resolution modal
          if (whatToForcePush.start_date !== data.start_date) {
            whatToForcePush.start_date = await dispatch('conflicts', {
              title: 'Date of Project Start',
              type: 'date',
              before: whatToForcePush.start_date,
              after: data.start_date
            })
          }
          // If the ongoing state doesn't match, open the conflict resolution modal
          if (whatToForcePush.ongoing !== data.ongoing) {
            whatToForcePush.ongoing = await dispatch('conflicts', {
              title: new Date(whatToForcePush.start_date) > new Date() ? 'Is' : 'Was' + 'this an ongoing project?',
              type: 'checkbox',
              before: whatToForcePush.ongoing,
              after: data.ongoing
            })
          }
          // If the completion_date state doesn't match, open the conflict resolution modal
          if (whatToForcePush.completion_date !== data.completion_date) {
            whatToForcePush.completion_date = await dispatch('conflicts', {
              title: 'Date of Project Completion',
              type: 'date',
              before: whatToForcePush.completion_date,
              after: data.completion_date
            })
          }
          // Force push the contact
          const response = await this.$axios.$post('https://api.galexia.agency/projects',
            {
              id: whatToForcePush.id,
              name: whatToForcePush.name,
              status: whatToForcePush.status,
              hosting: whatToForcePush.hosting,
              php: whatToForcePush.php,
              github_url: whatToForcePush.github_url,
              drive_url: whatToForcePush.drive_url,
              project_url: whatToForcePush.project_url,
              project_login_url: whatToForcePush.project_login_url,
              pandle_id: whatToForcePush.pandle_id,
              completion_amount: whatToForcePush.completion_amount,
              bb_revenue: whatToForcePush.bb_revenue,
              bb_expenses: whatToForcePush.bb_expenses,
              viewer: whatToForcePush.viewer,
              contributor: whatToForcePush.contributor,
              admin: whatToForcePush.admin,
              updated_at: whatToForcePush.updated_at,
              enquiry_date: data.enquiry_date,
              start_date: data.start_date,
              ongoing: data.ongoing,
              completion_date: data.completion_date,
              force: true
            },
            {
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              }
            }
          )
          // Don't update lists
          delete response[0].lists
          return await commit('updateProject', response[0])
        } catch (e) {
          const error = {}
          error.active = true
          error.description = e.message
          error.data = data
          return commit('error', { error })
        }
      } else {
        const error = {}
        error.active = true
        error.description = e.message
        error.data = data
        return commit('error', { error })
      }
    }
  }
}
