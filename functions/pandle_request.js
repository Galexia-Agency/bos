const axios = require('axios')
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json; charset=UTF-8',
  'X-Frame-Options': 'DENY',
  'Strict-Transport-Security': 'max-age=15552000; preload',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'no-referrer',
  'Content-Security-Policy': 'default-src "self"'
}

exports.handler = async function handler (event, context, callback) {
  if (event.httpMethod === 'OPTIONS') {
    return callback(null, {
      statusCode: 200,
      headers,
      body: ''
    })
  }
  
  const response = await axios.post('https://my.pandle.com/api/v1/auth/sign_in',
    {
      email: process.env.PANDLE_USERNAME,
      password: process.env.PANDLE_PASSWORD
    }
  )
  
  axios.interceptors.request.use(function (config) {
    config.headers['access-token'] = response.headers['access-token']
    config.headers.client = response.headers.client
    config.headers.uid = response.headers.uid
    return config
  })

  const data = JSON.parse(event.body)
  try {
    if (data.type === 'POST') {
      const response = await axios.post('https://my.pandle.com/api/v1' + data.url, data.body)

      return callback(null, {
        statusCode: 200,
        headers,
        body: JSON.stringify(response.data)
      })
    }
    
    if (data.type === 'GET') {
      const response = await axios.get('https://my.pandle.com/api/v1' + data.url)

      return callback(null, {
        statusCode: 200,
        headers,
        body: JSON.stringify(response.data)
      })
    }

    if (data.type === 'PATCH') {
      const response = await axios.patch('https://my.pandle.com/api/v1' + data.url, data.body)

      return callback(null, {
        statusCode: 200,
        headers,
        body: JSON.stringify(response.data)
      })
    }
  } catch (e) {
    if (e.response && e.response.status) {
      return callback(null, {
        statusCode: e.response.status,
        headers,
        body: JSON.stringify(e)
      })
    }

    return callback(null, {
      statusCode: 500,
      headers,
      body: JSON.stringify(e)
    })
  }
}
