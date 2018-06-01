import ToastComponent from './index.vue'
const LToast = {}

// 注册Toast
LToast.install = function(Vue) {
  // 生成一个Vue的子类
  // 同时这个子类也就是组件
  const ToastConstructor = Vue.extend(ToastComponent)
  // 生成一个该子类的实例
  const instance = new ToastConstructor()
  // 将这个实例挂载在我创建的div上
  // 并将此div加入全局挂载点内部
  instance.$mount(document.createElement('div'))
  document.body.appendChild(instance.$el)

  /**
   * 通过Vue的原型注册一个方法
   * 让所有实例共享这个方法
   * @param {String} content  必填 |提示内容
   * @param {String} type  必填 | 暂时支持'warn', 'success'
   * @param {Object} param3  选填 | 设置按钮文字，是否展示取消按钮， showCancel:默认true; confirmButtonText默认：确定; cancelButtonText默认：取消
   * @param {Function} confimFn  选填 | 点击确认按钮回调
   * @param {Function} cancelFn  选填 | 点击取消按钮回调
   */
  Vue.prototype.$LToast = ( content, type, {showCancel= true, confirmButtonText='', cancelButtonText= ''} = {}, confimFn, cancelFn) => {
    instance.visible = true
    instance.message = content
    instance.type = type
    instance.showCancel = showCancel
    if (confirmButtonText) {
      instance.confirmButtonText = confirmButtonText
    }
    if (cancelButtonText) {
      instance.cancelButtonText = cancelButtonText
    }
    if (typeof confimFn === 'function') {
      instance.onConfirm = () => {
        confimFn()
        instance.visible = false
      }
    }
    if (typeof cancelFn === 'function') {
      instance.onCancel = () => {
        cancelFn()
        instance.visible = false
      }
    }
  }
}

// this.$LToast('1234', '提示', {
//   showCancel: false,
//   confirmButtonText: 'ceshi',
//   cancelButtonText: '请问去'
// }, ()=>{
//   console.log('确定')
// }, ()=> {
//   console.log('取消')
// })
export default LToast
