import { getAccessToken } from '~/utils/accessToken'

async function attachAccessCredentials (config) {
  config.withCredentials = true
  config.headers = config.headers || {}
  if (!config.headers['CF-Access-Jwt-Assertion']) {
    const token = await getAccessToken()
    if (token) {
      config.headers['CF-Access-Jwt-Assertion'] = token
    }
  }

  return config
}

export default function ({ $axios, $api }) {
  if (process.server) {
    return
  }

  const clients = [$axios, $api].filter(Boolean)
  clients.forEach((client) => {
    client.interceptors.request.use(attachAccessCredentials, (error) => Promise.reject(error))
  })
}
