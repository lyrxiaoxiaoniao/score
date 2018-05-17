import api from '../api'
import config from '../config'
export default {
  //朋友圈分享
  shareFriend(title, desc, link, imgUrl, type, dataUrl) {
    api
      .get(config.baseserverURI + config.getWXAPi)
      .then(function(json) {
        let data = json.data.data
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: data.appId, // 必填，公众号的唯一标识
          timestamp: data.timestamp, // 必填，生成签名的时间戳
          nonceStr: data.nonceStr, // 必填，生成签名的随机串
          signature: data.signature, // 必填，签名，见附录1
          jsApiList: data.jsApiList // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        })

        wx.ready(function() {
          // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
          wx.onMenuShareAppMessage({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: link, // 分享链接
            imgUrl: imgUrl, // 分享图标
            type: type ? type : '', // 分享类型,music、video或link，不填默认为link
            dataUrl: dataUrl ? dataUrl : '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function(res) {},
            cancel: function() {
              // 用户取消分享后执行的回调函数
            }
          })

          wx.onMenuShareTimeline({
            title: title, // 分享标题
            link: link, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success: function(res) {},
            cancel: function() {
              // 用户取消分享后执行的回调函数
            }
          })

          wx.onMenuShareQQ({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: link, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success: function(res) {},
            cancel: function() {
              // 用户取消分享后执行的回调函数
            }
          })

          wx.onMenuShareQZone({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: link, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success: function(res) {},
            cancel: function() {
              // 用户取消分享后执行的回调函数
            }
          })

          wx.onMenuShareWeibo({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: link, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success: function(res) {},
            cancel: function() {
              // 用户取消分享后执行的回调函数
            }
          })
        })
      })
      .catch(function(json) {})
  }
}
