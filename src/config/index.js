export default {
  baseserverURI: '',
  // baseserverURI: '',
  // baseserverURI: 'https://tstgov.shencom.cn',
  // baseserverURI: 'https://gov.shencom.cn',
  getWXAPi: '/wx/config/show', // 获取微信配置
  getImgUrlAPI: '/api/files/create', // 上传图片接口
  getAdminUserCurrentAPI: '/admin/user/current', // 个人信息
  getUsrUserinfoShowAPI: '/wx/usr/userinfo/show', // 获取当前用户信息
  getAdminExtConfigAPI: '/admin/ext/config', // 版权信息
  getWechatFastLoginAPI: '/wx/user/wechat/binding/login', // 注册之后如果勾选
  getMobileRubbishUserFastLoginAPI: '/mobile/user/fast/login', // 注册之后如果不勾选
  basic: {
    key:
      '/-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArromvW2N/rg0ADw9zpTL\ncGdO0wNazPcp+SepPrv1dicCamEVPfvPKlWMuYszt/tE6lNjMT8pphmatPvgjAFy\nKfE1fEpcvHqRSZTUtlo/fGJzh2nss6mxyDXlqi+sGitjwaGj6/MXO6zLQcMQmZ/U\nvliOhECvuLBsAqqLY8ik63Ah7ylWAap3jDD0OvgSy+glqebwfacy9WPYOy4K75n/\nDQRw9FJBYFg1BtfbVn55Oji3AZ0E3lY96b0JhJGtFM6vjF0bhVDkmP/XZINPcVZy\nxydRFvxjgA6we/KmxXDD/JdZmvGmrZ2XCAhGS3vuk3XJnkMquGYO4GAI13JIs8Z1\nrwIDAQAB\n-----END PUBLIC KEY-----',
    // sendMail: '/mobile/rubbish/user/verify', // 注册用户发送验证码
    sendMail: '/mobile/user/verify', // 注册用户发送验证码
    // register: '/mobile/rubbish/user/create', // 用户注册
    wxRegister: '/wx/user/create', // 用户注册 在微信中
    noWxRegister: '/mobile/user/create', // 用户注册 在非微信中
    // login: '/mobile/rubbish/user/login', // 用户登录 正常
    login: '/mobile/user/login', // 用户登录 正常
    // loginWechat: '/wx/rubbish/user/wechat/login', // 用户登录(使用微信浏览器时)
    loginWechat: '/wx/user/wechat/fast/login', // 用户登录(使用微信浏览器时)
    relieveWechatLoginWechat: '/wx/rubbish/user/relieve/wx', // 解除微信绑定(使用微信浏览器时)
    // loginFastWechat: '/wx/rubbish/user/fast/login', // 微信一键登录
    loginFastWechat: '/wx/user/fast/login', // 微信一键登录
    wxUserRelieveWx: '/wx/user/relieve/wx', // 解除微信绑定(传用户id)
    // loginWechatVerify: '/wx/rubbish/user/wechat/verify', // 判断微信用户是否绑定了快捷登录
    loginWechatVerify: '/wx/user/wechat/verify', // 判断微信用户是否绑定了快捷登录
    // loginMail: '/mobile/rubbish/user/verifyl', // 登陆和重置密码时发送验证码
    loginMail: '/mobile/user/verifyl', // 登陆和重置密码时发送验证码
    // resetPassword: '/mobile/rubbish/user/reset', // 重置密码
    resetPassword: '/mobile/user/reset', // 重置密码
    refresh: '/mobile/rubbish/user/user', // 重置密码
    signout: '/sys/logout' // 退出登录
  },
  // 南湖评分接口
  task: {
    // 获取当前用户的任务/小区/评分列表。传taskId的值获取任务的小区列表，否则获取任务列表
    list: '/wx/fn/asm/tc/index',
    // 小区考核分类列表
    class: '/wx/fn/asm/category/index'
  }
}
