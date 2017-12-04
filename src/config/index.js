export default {
  // baseserverURI: 'http://192.168.1.13:8081/',
  // baseserverURI: '',
  // baseserverURI: 'https://tstgov.shencom.cn/',
  baseserverURI: 'https://gov.shencom.cn/',

  indexBanner: 'admin/record/show', // 首页轮播
  copyRight: 'wx/admin/ext/config', // 版权文字

  subjectBanner: 'wx/ncms/subject/banner',  // 专题banner
  categoryBanner: 'wx/ncms/category/banner',  // 栏目banner

  categoryIndex: 'wx/ncms/category/index',// 栏目列表 Byte is_recommend;// 1->当前用户的推荐栏目
  categoryTree: 'wx/ncms/category/tree',// 树形栏目列表
  commentMy: 'wx/ncms/comment/my',// 我的文章评论列表
  favorMy: 'wx/ncms/favor/my',// 我的关注/收藏文章列表

  // -------------------------------------------------------------------------------
  // 文章列表
  newArtical: 'wx/ishare/article/index', // 最新文章列表 
  hotArtical: 'wx/ishare/article/hot/index', // 最热文章列表 点击最多
  recommendArtical: 'wx/ishare/article/recommend/index', // 推荐文章列表 
  shareArtical: 'wx/ishare/article/share/index', // 分享排序的文章列表
  creditArtical: 'wx/ishare/article/credit/index', // 积分排序的文章列表
  // 获取短链接URL
  getshareURL: 'wx/ishare/article/generate',
  // 文章详情
  articalDetail: 'wx/ishare/article/show', // 文章详情
  articalRead: 'wx/ishare/article/read', // 查看原文
  // 分享回调
  shareCallback: 'wx/ishare/article/share', // 文章详情
  // 我的记录
  getconfigSubscribeAPI: 'wx/config/subscribe', // 是否关注
  getUserInfoApi: 'wx/usr/userinfo/get', // 根据id获取用户信息

  mine: 'wx/usr/userinfo/show', // 当前用户信息
  minecount: 'wx/ishare/article/mygrade', // 个人数据
  // myshare: 'wx/ishare/article/myshare', // 我的分享
  myview: 'wx/ishare/article/myview', // 我的阅读
  myshare: 'wx/ishare/sharelog/my', // 我的分享
  // myview: 'ishare/viewlog/my', // 我的阅读
  myaward: 'wx/ishare/article/myaward', // 我的奖励
  categoryIndex: '/wx/ishare/category/index', // 分类
  categoryTree: 'wx/ishare/category/tree', // 树
  myshareLog: 'wx/ishare/viewlog/detail', // 我的分享详情
  // myshareLogshow: 'wx/ishare/sharelog/show', // 我的分享文章
  // 排行
  clickRank: 'wx/ishare/view/share/rank', // 点击排行
  shareRank: 'wx/ishare/share/rank', // 分享排行
  creditRank: 'wx/ishare/article/credit/rank', // 积分排行
}
