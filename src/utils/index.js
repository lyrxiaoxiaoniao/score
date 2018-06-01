// 带时间的本地存储获取
/* eslint-disable */
class Storage {
  constructor() {
    this.storage = window.localStorage
    this.prefix = 'pfxt_'
  }

  set(key, value, fun) {
    let data = ''
    if (typeof value !== 'string') {
      try {
        data = JSON.stringify(value)
      } catch (e) {}
    } else {
      data = JSON.stringify(value)
    }
    this.storage.setItem(this.prefix + key, data)
    typeof fun === 'function' && fun()
  }

  get(key, fun) {
    let value = this.storage.getItem(this.prefix + key)
    try {
      value = JSON.parse(value)
      if (value === null) value = null
    } catch (e) {
      value = null
    }
    return typeof fun === 'function' ? fun.call(this, value) : value
  }
  setTime(key, value, fun) {
    let data = value
    data.time = new Date().getTime()
    if (typeof value !== 'string') {
      try {
        data = JSON.stringify(data)
      } catch (e) {}
    }
    this.storage.setItem(this.prefix + key, data)
    typeof fun === 'function' && fun()
  }
  getTime(key, time, fun) {
    let value = null
    let data = null
    try {
      data = this.storage.getItem(this.prefix + key) || null // 获取储存
      value = data ? JSON.parse(data) : {}
      if (!value.time) {
        console.error('获取的存储没有time字段!')
        return
      }
      const now = new Date().getTime() // 当前时间
      const H = time ? Number(time) * 3600000 : 24 * 3600000

      if (Number(value.time) < now - H) {
        this.storage.removeItem(this.prefix + key)
        value = null
      }
    } catch (e) {
      value = {}
    }
    return typeof fun === 'function' ? fun.call(this, value) : value
  }
  remove(key) {
    this.storage.removeItem(this.prefix + key)
  }
}

/**
 * 切换年月函数
 * yyyy-mm-dd
 * @param {Date} timestamp
 */
const _toYMD = function(timestamp) {
  let date = new Date(timestamp)
  let M = date.getMonth() + 1
  M = M < 10 ? '0' + M : M
  let d = date.getDate()
  d = d < 10 ? '0' + d : d
  return `${date.getFullYear()}-${M}-${d}`
}
/**
 * 切换年月日函数
 * yyyy-mm-dd hh:mm:ss
 * @param {Date} timestamp
 */
const _toDateTime = function(timestamp) {
  let date = new Date(timestamp)
  let M = date.getMonth() + 1
  M = M < 10 ? '0' + M : M
  let d = date.getDate()
  d = d < 10 ? '0' + d : d
  let h = date.getHours()
  h = h < 10 ? '0' + h : h
  let m = date.getMinutes()
  m = m < 10 ? '0' + m : m
  let s = date.getSeconds()
  s = s < 10 ? '0' + s : s
  return `${date.getFullYear()}-${M}-${d} ${h}:${m}:${s}`
}
export default {
  _Storage: new Storage(),
  _toDateTime,
  _toYMD
}
