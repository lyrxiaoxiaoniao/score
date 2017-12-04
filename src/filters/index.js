/**
 * 切换年月函数
 * yyyy-mm-dd
 * @param {*} timestamp 
 */
export function toYMD (timestamp) {
  let date = new Date(timestamp)
  let M = date.getMonth() + 1
  M = M < 10 ? ('0' + M) : M
  let d = date.getDate()
  d = d < 10 ? ('0' + d) : d
  return `${date.getFullYear()}-${M}-${d}`
}
/**
 * 切换年月函数
 * yyyy-mm-dd hh:mm:ss
 * @param {*} timestamp 
 */
export function toDateTime (timestamp) {
  let date = new Date(timestamp)
  let M = date.getMonth() + 1
  M = M < 10 ? ('0' + M) : M
  let d = date.getDate()
  d = d < 10 ? ('0' + d) : d
  let h = date.getHours()
  h = h < 10 ? ('0' + h) : h
  let m = date.getMinutes()
  m = m < 10 ? ('0' + m) : m
  let s = date.getSeconds()
  s = s < 10 ? ('0' + s) : s
  return `${date.getFullYear()}-${M}-${d} ${h}:${m}:${s}`
}