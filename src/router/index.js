let routers = [
  {
    path: '/copyRight',
    name: 'copyRight',
    component: () => import('../components/common/copyRight.vue')
  },
  {
    path: '/uploadImg',
    name: 'uploadImg',
    component: () => import('../components/common/uploadImg.vue')
  }
]
export default routers
