import EventSourcePolyfill from 'eventsource'
import { buildAccessHeaders } from '~/utils/accessToken'

const MAX_FAILURES = 3
let sse
let failureCount = 0

const stopSse = () => {
  if (sse) {
    sse.close()
    sse = null
  }
  self.close()
}

async function startSse (url, id) {
  const headers = await buildAccessHeaders()
  failureCount = 0
  sse = new EventSourcePolyfill(url, {
    withCredentials: true,
    headers
  })
  sse.addEventListener(id, (event) => {
    postMessage(JSON.parse(event.data)[0])
  }, {
    once: false,
    retry: 5000
  })
  sse.addEventListener('error', () => {
    failureCount += 1
    if (failureCount > MAX_FAILURES) {
      stopSse()
    }
  })
}

onmessage = (e) => {
  const type = e.data[0].toLowerCase()
  if (type === 'start') {
    const url = e.data[1]
    const id = e.data[2]
    startSse(url, id).catch(() => {
      failureCount += 1
      if (failureCount > MAX_FAILURES) {
        stopSse()
      }
    })
  } else if (type === 'stop') {
    stopSse()
  }
}
