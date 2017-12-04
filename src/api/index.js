import axios from '../interceptor.js'
import config from '../config'

export default {
  get(uri, data = null) {
    if (!uri) {
      console.log('API function call requires uri argument')
      return
    }
    return axios.get(uri, {
      params: data
    })
  },
  post(uri, data = null) {
    if (!uri) {
      console.log('API function call requires uri argument')
      return
    }

    return axios.post(uri, data)
  }
}
