const axios = require('axios')
const { siteUrl } = require('./siteConfig')

const fetch = endpoint => axios.get(`${siteUrl}/api/${endpoint}`)
const endpoints = ['character', 'location', 'episode']

module.exports = async () => {
  const res = await Promise.all(endpoints.map(endpoint => fetch(endpoint)))

  return res.reduce((acc, item) => {
    const arr = item.config.url.split("/")
    const endpoint = arr[arr.length - 1]

    if (endpoints.includes(endpoint)) {
      return {
        ...acc,
        [endpoint]: item.data.info.count
      }
    }
  }, {})

}
