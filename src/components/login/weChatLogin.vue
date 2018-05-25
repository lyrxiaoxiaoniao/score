<template>
  <div id="weChatLogin" class="login mui-content">
    <div class="mui-scroll-wrapper">
      <div class="mui-off-canvas-wrap mui-draggable">
        <div class='mui-inner-wrap'>
          <header class="mui-bar mui-bar-nav">
            <h1 class="mui-title">一键登录</h1>
          </header>
          <div class="mui-content mui-scroll-wrapper">
            <div class="">

              <div class="img-box">
                <img :src="avatar" />
                <!--<img src="../../../static/images/LaJiTouXiang.png" />-->
                <span>您的微信已绑定</span>
                <p>罗湖城管垃圾分类综合管理平台账号，可一键登录</p>
              </div>
              <div class="login-btn">
                <button @tap="login(1)" type="button" class="mui-btn mui-btn-success mui-btn-block">
                  一键微信登录
                </button>
                <button @tap="login(2)" type="button" class="mui-btn mui-btn-primary mui-btn-block">
                  输入密码登录
                </button>
                <!--<a @tap="login(1)" href="javascript:;" class="nowLogin">-->
                  <!--<span>一键微信登录</span>-->
                <!--</a>-->
                <!--<a @tap="login(2)" href="javascript:;" class="nowLogin">-->
                  <!--<span>输入密码登录</span>-->
                <!--</a>-->

              </div>
              <copy-ight></copy-ight>
              <loading :is-show="loadingData"></loading>

            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import copyRight from '../common/copyRight.vue'
  import { Toast } from 'mint-ui';
  import loading from '../common/loading.vue'

  export default {
    name: 'weChatLogin',
    data () {
      return {
        avatar: null,
        loadingData: false,

      }
    },
    components: {
      copyRight, loading
    },
    mounted: function() {
      this.getCurrentAvatar()
      localStorage.setItem('IWantLoginWithAccount', 'no')
    },
    methods: {

      getCurrentAvatar() {
        let _this = this

        _this.avatar = _this.$route.query.avatar

        sessionStorage.setItem('user_avatar', response.data.data.avatar)

        return

        _this.loadingData = true

        _this.$api.get(_this.config.baseserverURI + _this.config.getAdminUserCurrentAPI)
          .then(function (response) {
            _this.loadingData = false
            if (response.data.errcode === '0000') {
              _this.avatar = response.data.data.avatar
              sessionStorage.setItem('user_avatar', response.data.data.avatar)
            } else {
              Toast(response.data.errmsg)
            }
          })
          .catch(function (error) {
            // console.log(error)
          })
      },

      login: function (type) {
        let _this = this

        if(type === 2) {
          _this.$router.push({path: './login'})

          localStorage.setItem('IWantLoginWithAccount', 'ok')
          return
        }

        _this.$api.get(_this.config.baseserverURI + _this.config.basic.loginFastWechat)
          .then(function (response) {
            if (response.data.errcode === '0000') {
              _this.$store.commit('SET_USER_INFO', response.data.data)
              _this.$store.commit('SET_TOKEN', response.data.data.token)
              _this.$store.commit('SET_CURRENT_PHONE', response.data.data.phone)
              _this.$store.commit('SET_USER_ID', response.data.data.id)
              sessionStorage.setItem('user_avatar', response.data.data.avatar)
              localStorage.setItem('userinfo', JSON.stringify(response.data.data))
              _this.$router.push({path: './index'})
            } else {
              Toast(response.data.errmsg)
            }
          })
          .catch(function (error) {
            // console.log(error)
          })
      },
    }
  }
</script>

<style lang="less" scoped>
  #weChatLogin {
    height: 100%;
    .mui-content{
      .img-box{
        padding-top: 2rem;
        text-align: center;
        img{
          width: 2rem;
          height: 2rem;
          border:1px solid transparent;
          border-radius: 50%;
        }
        span{
          display: block;
          margin:.2rem 0;
        }
      }
      .login-btn{
        padding-top: 1.2rem;
        button{
          width: 7rem;
          margin:.5rem auto;
          font-size: 4vw;
          padding: 10px;
          border-radius: 40px;
          img{
            width: 20px;
            vertical-align: middle;
          }
        }
        /*.nowLogin{*/
          /*display: block;*/
          /*padding: 5px 10px;*/
          /*background-color: #4cd964;*/
          /*margin-bottom: .5rem;*/
          /*width: ;*/
        /*}*/
      }
    }
  }

</style>
