const ACCESS_IDENTITY_ENDPOINT = '/cdn-cgi/access/get-identity'
const TOKEN_TTL_MS = 5 * 60 * 1000

let cachedToken = null
let cachedAt = 0
let inflightPromise = null

function getAccessToken () {
  if (cachedToken && (Date.now() - cachedAt) < TOKEN_TTL_MS) {
    return cachedToken
  }
  if (!inflightPromise) {
    inflightPromise = window.fetch(ACCESS_IDENTITY_ENDPOINT, {
      credentials: 'include'
    })
      .then((response) => {
        cachedAt = Date.now()
        cachedToken = response.headers.get('CF-Access-Jwt-Assertion')
        return cachedToken
      })
      .catch(() => null)
      .finally(() => {
        inflightPromise = null
      })
  }
  return inflightPromise
}

async function attachAccessCredentials (config) {
  config.withCredentials = true
  config.headers = config.headers || {}
  if (!config.headers['CF-Access-Jwt-Assertion'] && typeof window !== 'undefined') {
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
