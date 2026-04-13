import { getAccessToken, logoutFromAccess, refreshAccessToken } from '~/utils/accessToken'

const RETRY_AUTH_HEADER = 'CF-Access-Jwt-Assertion'

function isAuthFailure (error) {
  return error && error.response && [401, 403].includes(error.response.status)
}

async function attachAccessCredentials (config) {
  config.withCredentials = true
  config.headers = config.headers || {}
  if (!config.headers[RETRY_AUTH_HEADER]) {
    const token = await getAccessToken()
    if (token) {
      config.headers[RETRY_AUTH_HEADER] = token
    }
  }

  return config
}

function makeAuthFailureHandler (client) {
  return async function handleAuthFailure (error) {
    const config = error && error.config
    if (!isAuthFailure(error) || !config || config._accessRetry) {
      return Promise.reject(error)
    }

    config._accessRetry = true
    const token = await refreshAccessToken()
    if (!token) {
      logoutFromAccess()
      return Promise.reject(error)
    }

    config.headers = config.headers || {}
    config.headers[RETRY_AUTH_HEADER] = token
    return client.request(config)
  }
}

export default function ({ $axios, $api }) {
  if (process.server) {
    return
  }

  const clients = [$axios, $api].filter(Boolean)
  clients.forEach((client) => {
    client.interceptors.request.use(attachAccessCredentials, (error) => Promise.reject(error))
    client.interceptors.response.use((response) => response, makeAuthFailureHandler(client))
  })
}
