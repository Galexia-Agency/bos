const cloudinary = require('cloudinary').v2
const axios = require('axios')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

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

  try {
    const { file } = await JSON.parse(event.body)
    const response = await cloudinary.uploader.destroy('BOS/' + file.match(/([^/]+)(?=\.\w+$)/g))
    
    return callback(null, {
      statusCode: 200,
      headers,
      body: JSON.stringify(response)
    })
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
