import axios from 'axios'
import store                   from './store'
function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null)
    return unescape(r[2]);
  return null;
}

axios.defaults.timeout = 5000

axios.interceptors.request.use(config => {
  config.headers.common['X-Requested-With'] = 'XMLHttpRequest'
  if(!store.state.scid) {
    store.state.scid = getQueryString('scid') || ''
    config.headers.common['scid'] = getQueryString('scid')
    sessionStorage.setItem("scid", getQueryString('scid'))
    store.state.scid = getQueryString('scid')
  }else {
    config.headers.common['scid'] = store.state.scid
    sessionStorage.setItem("scid", getQueryString('scid'))
    store.state.scid = getQueryString('scid')
  }
  return config
}, error => {
  return Promise.reject(error)
})

// http响应拦截器
axios.interceptors.response.use(res => { // 响应成功关闭loading
  if (res.data.errcode === '4000') {
    let url = res.data.data.redirectUrl
    window.location.href = url
  }
  return res
}, error => {
  if (error.message === 'Network Error') {
    return Promise.reject(error)
  }
})

export default axios

