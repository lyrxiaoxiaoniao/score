let routers = [
  {
    path: '/copyRight',
    name: 'copyRight',
    component: () => import('../components/common/copyRight.vue')
  },
  {
    path: '/forget',
    name: 'forget',
    component: () => import('../components/login/forget.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/login/login.vue')
  },
  {
    path: '/wxlogin',
    name: 'wxlogin',
    component: () => import('../components/login/weChatLogin.vue')
  },
  {
    path: '/mine',
    name: 'mine',
    component: () => import('../components/my/index.vue')
  },
  // 主页
  {
    path: '/',
    name: 'home',
    component: () => import('../components/home/index.vue')
  },
  // 考核任务
  {
    path: '/task',
    name: 'task',
    component: () => import('../components/task/list.vue')
  },
  // 考核记录任务小区
  {
    path: '/village',
    name: 'village',
    component: () => import('../components/task/village.vue')
  },
  // 考核任务扣分
  {
    path: '/edittask',
    name: 'edittask',
    component: () => import('../components/task/editTask.vue')
  },
  // 考核任务扣分详情
  {
    path: '/detail',
    name: 'detail',
    component: () => import('../components/task/detail.vue')
  },
  // 考核任务多项目扣分详情
  {
    path: '/newdetail',
    name: 'newdetail',
    component: () => import('../components/task/newDetail.vue')
  },
  // 添加考核任务多项目扣分详情
  {
    path: '/adddetail',
    name: 'adddetail',
    component: () => import('../components/task/addDetail.vue')
  },
  // 查看详情考核任务多项目扣分 全部提交完成显示页面
  {
    path: '/editdetail',
    name: 'editdetail',
    component: () => import('../components/task/editDetail.vue')
  }
]
export default routers
