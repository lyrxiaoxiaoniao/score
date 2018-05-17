<template>
  <div id="my" class="">
    <div class="mui-navbar">
      <div class="mui-navbar-inner mui-bar mui-bar-nav mui-navbar-center">
        <button type="button" class="mui-left mui-action-back mui-btn  mui-btn-link mui-btn-nav mui-pull-left">
          <span class="mui-icon mui-icon-left-nav"></span>
        </button>
        <h1 class="mui-center mui-title">我的管理中心</h1>
      </div>
    </div>
    <div class="mui-content">

      <ul class="mui-table-view mui-table-view-chevron">
        <li class="mui-table-view-cell mui-media">
          <a href="#/set" class="mui-navigate-right">
            <!--<img class="mui-media-object mui-pull-left head-img" id="head-img" src="../../../static/images/LaJiTouXiang.png">-->
            <img class="mui-media-object mui-pull-left head-img" id="head-img" :src="avatar">
            <div class="mui-media-body">
              {{realname ? realname : '默认用户'}} ( {{userphone ? userphone : '暂无绑定手机号'}} )
              <p v-show="depart || position" class="mui-ellipsis">{{depart ? depart : '默认'}}/{{position ? position : '默认'}}</p>
            </div>
          </a>
        </li>
      </ul>
      <ul class="mui-table-view mui-table-view-chevron">
        <li class="mui-table-view-cell">
          <a href="#/info" class="mui-navigate-right">我的资料</a>
        </li>
        <li class="mui-table-view-cell">
          <a href="#/m_role" class="mui-navigate-right">我的角色</a>
        </li>
      </ul>
      <ul class="mui-table-view mui-table-view-chevron">
        <li class="mui-table-view-cell">
          <a href="javascript:;" @tap="setSession(1)" class="mui-navigate-right">我的工作</a>
        </li>
        <li class="mui-table-view-cell">
          <a href="#/m_start_order" class="mui-navigate-right">我的工单</a>
        </li>
      </ul>
      <ul class="mui-table-view mui-table-view-chevron">
        <li class="mui-table-view-cell">
          <a href="#/m_evaluateOrFollow_order?type=0" class="mui-navigate-right">我关注的工单</a>
        </li>
        <li class="mui-table-view-cell">
          <a href="#/m_evaluateOrFollow_order?type=1" class="mui-navigate-right">我评价的工单</a>
        </li>
      </ul>
      <ul class="mui-table-view mui-table-view-chevron">
        <li class="mui-table-view-cell">
          <a href="#/forget" class="mui-navigate-right">密码服务</a>
        </li>
        <!-- <li class="mui-table-view-cell">
          <a href="http://gmum.shencom.cn/user/member/service" class="mui-navigate-right">联系客服</a>
        </li>
        <li class="mui-table-view-cell">
          <a href="http://gmum.shencom.cn/user/member/about" class="mui-navigate-right">关于我们</a>
        </li> -->
      </ul>
      <ul class="mui-table-view mui-table-view-chevron">
        <li @click="loginout" class="mui-table-view-cell sign-out">
          退出登录
        </li>
      </ul>
      <copy-right></copy-right>
    </div>

  </div>
</template>

<script>
  import copyRight from '../common/copyRight.vue'
  import { Toast } from 'mint-ui';

  export default {
    name: 'my',
    data () {
      return {
        phone: this.$store.state.phone,
        realname: '',
        userphone: '',
        depart: '',
        avatar: sessionStorage.user_avatar || './static/images/LaJiTouXiang.png',
        position: ''
      }
    },
    components: {
      copyRight
    },
    mounted: function () {

      const vm = this

      let obj = JSON.parse(localStorage.userinfo)
      vm.realname = obj.realname ? obj.realname : obj.nickname
      vm.userphone = obj.phone
      vm.phone = obj.phone
      vm.$store.commit('SET_CURRENT_PHONE', obj.phone)
      vm.getData()
    },
    methods: {
      loginout () {
        let v = this
        var btnArray = ['是', '否'];
        mui.confirm('是否退出登录？', '提示', btnArray, function(e) {
          if (e.index == 0) {

            v.$api.get(v.config.baseserverURI + v.config.basic.signout)
              .then(response => {
                if (response.data.errcode === '0000') {
                  if (response.data.errcode === '0000') {
                    v.$store.commit('SET_USER_INFO', null)
                    v.$store.commit('SET_TOKEN', null)
                    localStorage.setItem('userinfo', '')
                    localStorage.setItem('IWantLoginWithAccount', 'no')
                    console.log(2)
                    console.log(localStorage.userinfo)
                    v.$router.push('./login')
                    Toast('退出成功')
                  }
                }
              })
          } else {

          }
        })


      },
      setSession: function (type) {
        sessionStorage.setItem('workType', type)
        this.$router.push('./work')
      },
      getData () {
        let vm = this
        vm.$api.get(vm.config.baseserverURI + vm.config.mine.index, {phone: vm.phone})
        .then(function (response) {
					if (response.data.errcode === '0000') {
              let res = response.data.data
              if (res.rubPositionVO.rubPositionUserVO.userVO.realname) {
                vm.realname = res.rubPositionVO.rubPositionUserVO.userVO.realname
              }
              if (res.rubPositionVO.rubPositionUserVO.userVO.phone) {
                vm.userphone = res.rubPositionVO.rubPositionUserVO.userVO.phone
              }
              vm.depart = res.p_title
              vm.position = res.rubPositionVO.name
					} else {
//            Toast(response.data.errmsg)

          }
				})
      }
    }
  }
</script>

<style scoped lang="less">
  #my{
    /*margin-bottom: 100px;*/
    .mui-content{
      padding-top: 40px;
      margin-bottom: 100px;
      padding-bottom: 110px;

      .mui-table-view {
        margin-top: 15px;
      }
      .mui-ellipsis{
        line-height: 1.5;
      }
      .head {
        height: 40px;
      }
      #head {
        line-height: 40px;
      }
      .head-img {
        width: 1rem;
        height: 1rem;
        max-width: 1rem;
      }
      #head-img1 {
        position: absolute;
        bottom: 10px;
        right: 40px;
        width: 40px;
        height: 40px;
      }
      .update {
        font-style: normal;
        color: #999999;
        margin-right: -25px;
        font-size: 15px
      }
      .sign-out{
        text-align: center;
        padding-right: 15px;
      }
    }
  }
</style>
