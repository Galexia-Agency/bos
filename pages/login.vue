<style lang="scss">
  #login {
    width: 320px;
    padding: 8% 0 0;
    margin: auto;
    #okta-sign-in {
      min-width: auto;
      padding-top: 1.2rem
    }
    .infobox-error {
      color: red
    }
    .mfa-send-email-content {
      padding-bottom: 2rem
    }
    .resend-email-btn {
      display: block
    }
    h1 {
      text-align: center;
      a {
        background-position: center top;
        color: #3C434A;
        font-size: 20px;
        font-weight: 400;
        line-height: 1.3;
        margin: 0 auto 25px;
        padding: 0;
        text-decoration: none;
        text-indent: -9999px;
        outline: 0;
        overflow: hidden;
        display: block;
        background-image: url('./assets/img/logo.png');
        height: 125px;
        width: 125px;
        background-size: cover;
        background-repeat: no-repeat;
        margin-bottom: 40px;
        filter: drop-shadow(.5px 2.5px 2.5px #6564AE99)
      }
    }
    .o-form-head {
      display: none
    }
    .o-form-content {
      padding-bottom: 2rem
    }
    .o-form-button-bar {
      float: right;
      margin-top: -3.5rem;
      .button {
        background: var(--primaryColor);
        border-color: var(--primaryColor);
        color: white;
        display: inline-block;
        font-size: 13px;
        &:hover {
          background-color: #534BAE
        }
      }
    }
    .custom-checkbox {
      label {
        margin-left: .5rem;
        font-size: .9rem
      }
    }
    .o-form-input, .o-form-input-name-answer {
      input[type='text'], input[type='password'], input[type='tel'] {
        margin: 1rem 0;
        display: block;
        border-radius: .25rem;
        border: none;
        box-shadow: 0 5px 5px rgba(26, 35, 126, .075);
        background: -moz-linear-gradient(180deg, rgba(83, 75, 174, .15) 0%, rgba(26, 35, 126, .15) 100%);
        background: -webkit-linear-gradient(180deg, rgba(83, 75, 174, .15) 0%, rgba(26, 35, 126, .15) 100%);
        background: linear-gradient(180deg, rgba(83, 75, 174, .15) 0%, rgba(26, 35, 126, .15) 100%);
        font-size: 1rem;
        line-height: 1.75rem;
        width: 100%;
        font-family: Open Sans, sans-serif;
        padding: .5rem;
        min-height: 40px;
        max-height: none
      }
    }
    .okta-form-input-error {
      span {
        display: none
      }

      color: red;
      text-align: left;
      margin-bottom: .5em
    }
    .o-form-label label {
      font-size: 14px;
      line-height: 1.5;
      display: inline-block;
      margin-bottom: 3px
    }
  }
</style>
<template>
  <div id="login">
    <h1>
      <a href="https://galexia.agency">
        Galexia
      </a>
    </h1>
    <div id="okta-signin-container" />
  </div>
</template>

<script>
export default {
  layout: 'login',
  async mounted () {
    const scopes = ['openid', 'profile', 'email', 'groups']
    let OktaSignIn
    await import(/* webpackChunkName: "okta.signin", webpackPreload: true  */ '@okta/okta-signin-widget/dist/js/okta-sign-in.no-polyfill.min.js').then((module) => {
      OktaSignIn = module.default
    })
    this.$nextTick(function () {
      this.widget = new OktaSignIn({
        baseUrl: this.$config.OKTA_ISSUER,
        issuer: this.$config.OKTA_ISSUER + '/oauth2/default',
        clientId: this.$config.OKTA_CLIENT_ID,
        redirectUri: window.location.host === 'localhost:8888' ? 'http://' + window.location.host + '/implicit/callback' : 'https://' + window.location.host + '/implicit/callback'
      })
      this.widget.showSignInToGetTokens({
        el: '#okta-signin-container',
        scopes
      }).then(async (tokens) => {
        this.$nuxt.$loading.start()
        await this.$auth.handleLoginRedirect(tokens)
      }).catch((err) => {
        throw err
      })
    })
    if (await this.$auth.isAuthenticated()) {
      this.$router.push('/')
    } else {
      const cookies = document.cookie.split(';')
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i]
        const eqPos = cookie.indexOf('=')
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT'
      }
    }
  },
  async beforeDestroy () {
    this.widget.remove()
    await this.$auth.isAuthenticated()
  }
}
</script>
