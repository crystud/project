import axios from 'axios'

const baseUrl = new URL(global.window.origin)
const apiUrl = `${baseUrl.protocol}//${baseUrl.hostname}:4000/`

export default axios.create({
  baseURL: process.env.VUE_APP_API_URL || apiUrl,
})
