const ACCESS_IDENTITY_ENDPOINT = '/cdn-cgi/access/get-identity'
const ACCESS_LOGOUT_ENDPOINT = '/cdn-cgi/access/logout'
const TOKEN_TTL_MS = 5 * 60 * 1000

let cachedToken = null
let cachedAt = 0
let inflightPromise = null

function getFetchFn () {
  if (typeof fetch === 'function') {
    return fetch
  }
  if (typeof globalThis !== 'undefined' && typeof globalThis.fetch === 'function') {
    return globalThis.fetch
  }
  if (typeof window !== 'undefined' && typeof window.fetch === 'function') {
    return window.fetch.bind(window)
  }
  return null
}

export function getAccessToken ({ forceRefresh = false } = {}) {
  const fetchFn = getFetchFn()
  if (!fetchFn) {
    return null
  }

  if (!forceRefresh && cachedToken && (Date.now() - cachedAt) < TOKEN_TTL_MS) {
    return cachedToken
  }

  if (!inflightPromise) {
    inflightPromise = fetchFn(ACCESS_IDENTITY_ENDPOINT, {
      credentials: 'include',
      cache: 'no-store',
      headers: {
        Accept: 'application/json'
      }
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

export async function refreshAccessToken () {
  clearAccessTokenCache()
  return await getAccessToken({ forceRefresh: true })
}

export async function buildAccessHeaders (options) {
  const token = await getAccessToken(options)
  if (token) {
    return {
      'CF-Access-Jwt-Assertion': token
    }
  }
  return {}
}

export function clearAccessTokenCache () {
  cachedToken = null
  cachedAt = 0
  inflightPromise = null
}

export function logoutFromAccess () {
  clearAccessTokenCache()
  if (typeof window !== 'undefined' && window.location) {
    window.location.assign(ACCESS_LOGOUT_ENDPOINT)
  }
}
