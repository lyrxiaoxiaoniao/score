<template>
  <div id="login" class="login mui-content" v-if="isShowTemplate">
  	<div class="mui-scroll-wrapper">
  		<div class="mui-off-canvas-wrap mui-draggable">
  			<div class='mui-inner-wrap'>
  				<header class="mui-bar mui-bar-nav">
			        <h1 class="mui-title">用户登录</h1>
			    </header>
			    <div class="mui-content mui-scroll-wrapper">
			    	<div class="">
			    		<div class='login-form-box'>
			        	<form class="mui-input-group">
								    <!-- <div class="mui-input-row">
								        <label>用户名</label>
								    		<input type="text" v-model="form.username" class="mui-input-clear" placeholder="请输入用户名">
								    </div> -->
								    <div class="mui-input-row">
								        <label>手机号码</label>
								    <input type="number" v-model="form.phone" class="mui-input-clear" placeholder="请输入手机号码">
								    </div>
								    <div class="mui-input-row">
								        <label>用户密码</label>
								        <input v-model="form.password" type="password" class="mui-input-password" placeholder="请输入密码">

                    </div>
								    <div class="mui-input-row mui-button-row login-btn-getCode">
								        <label style="text-align: left">短信验证</label>
								        <input v-model="form.code" type="number" placeholder="请输入验证码">
												<button @click='getCode' type="button" class="mui-btn mui-btn-primary" >{{ codeMsg }}</button>

								    </div>
								    <!--<div class="mui-button-row">
								        <button type="button" class="mui-btn mui-btn-primary" >确认</button>
								    </div>-->
								</form>
			        </div>
			        <div v-if="true" class="mui-input-row mui-checkbox mui-left login-checked-box" v-show="isWX">
							  <label>与微信用户绑定，免密码快捷登录</label>
							  <input v-model="isBindWX" name="checkbox1" value="Item 1" type="checkbox" checked>
							</div>

							<button @click="login" type="button" class="mui-btn mui-btn-blue mui-btn-block login-btn-loginBtn">登录</button>
			    		<div class="login-router-link">
			    			<!--<router-link class='login-router-reg' to='/reg'>账号注册</router-link>-->
			    			<a href="javascript:;"  @tap="jumpReg" class='login-router-reg'>账号注册</a>
			    			<!--<router-link class='login-router-forget' to='/forget'>忘记密码?</router-link>-->
			    			<a href="javascript:;" @tap="jumpForget" class='login-router-forget'>忘记密码?</a>
			    		</div>
			    	</div>
            <copy-right></copy-right>
            <loading :is-show="loadingData"></loading>

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
    name: 'login',
    data () {
      return {
				scid: sessionStorage.scid,
      	codeMsg:'获取验证码',
      	codeCount: 0,
        openid: null,
      	form:	{
					realname: '',
					phone: '',
					password: '',
					code: '',
				},
        loadingData: false,

        isBindWX: false,
        ua: window.navigator.userAgent.toLowerCase(),
				isWX: false,
        isShowTemplate: false, // 判断是否是本地登录、或者是微信登录，如果是，显示当前帐号密码式的登录页，如果不是，跳转首页或一键登录页
      }
    },
    components: {
      copyRight, loading
    },
    mounted: function() {

      this.isLogin()

    },
    methods: {
      // 是否登录
      isLogin() {
        let v = this
        v.loadingData = true

        v.$api.get(v.config.baseserverURI + v.config.getWxConfigAPI) // 做这部请求是为了让wx接口先行，来获取正常的个人信息
          .then(function (res) {
            v.$api.get(v.config.baseserverURI + v.config.getAdminUserCurrentAPI)
              .then(function (json) {
                v.loadingData = false
                if(json.data.errcode === '0000') {
                  if(v.ua.match(/MicroMessenger/i) == 'micromessenger'){
                    v.isWX = true

                    if(json.data.data.type === 0) { // 环境为微信浏览器，游客（未注册）

                      v.isShowTemplate = true
                    }else if(json.data.data.type === 1) { // 环境为微信浏览器，已注册，但未绑定微信

                      console.log(1)
                      console.log(localStorage.userinfo)
                      if(localStorage.userinfo) {
                        // localStorage.setItem('userinfo', JSON.stringify(json.data.data))
                        v.$router.push('./index')
                      }else {
                        v.isShowTemplate = true
                      }
                    }else if(json.data.data.type === 2) { // 环境为微信浏览器，已注册，已绑定微信

                      if(localStorage.IWantLoginWithAccount !== 'ok') {
                        v.getLoginWechatVerifyData()
                      }else {
                        v.isShowTemplate = true
                      }
                    }
                  }else { // 环境为非微信浏览器
                    if(localStorage.userinfo != 'null' || localStorage.userinfo) {
                      localStorage.setItem('userinfo', JSON.stringify(json.data.data))
                      v.$router.push('./index')
                    }else {
                      v.isShowTemplate = true
                    }
                  }
                }else {
                  v.isShowTemplate = true
                }
              })
          }).catch(function () {

        })

      },
      getLoginWechatVerifyData: function () {
        let _this = this
        _this.$api.get(_this.config.baseserverURI + _this.config.basic.loginWechatVerify,{
            openid: _this.openid
        })
          .then(function (response) {
            if (response.data.errcode === '0000') {
              _this.$router.push({
                path: './weChatLogin',
                query: {
                    avatar: response.data.errmsg
                }
              })
            } else {
              _this.isShowTemplate = true
            }
          })
          .catch(function (error) {
            // console.log(error)
          })
      },
      getCurrentAvatar() {
        let _this = this

        _this.$api.post(_this.config.baseserverURI + _this.config.getUsrUserinfoShowAPI)
          .then(function (response) {
            if (response.data.errcode === '0000') {
              _this.openid = response.data.data.openid
            } else {
              Toast(response.data.errmsg)
            }
          })
          .catch(function (error) {
            // console.log(error)
          })
      },
      jumpReg:function () {
        this.$router.push('./reg')
      },
      jumpForget:function () {
        this.$router.push('./forget')
      },
			toDialog () {
				this.popupVisible = true
			},
      login: function () {
        let _this = this
        if(!_this.form.password) {
            mui.alert('密码不能为空','消息','确定')
            return
        }
				if (_this.codeMsg === '获取验证码') {

          Toast('请填获取短信验证码')
					return
				}
        if(!_this.form.code) {
          mui.alert('验证码不能为空','消息','确定')
          return
				}
				const encryptedPwd = _this.encrypt()
				const obj = {
					...this.form
				}
				obj.password = encryptedPwd

				_this.$api.post(_this.config.baseserverURI + (_this.isBindWX ? _this.config.basic.loginWechat : _this.config.basic.login), {scid: _this.scid, ...obj})
				.then(function (response) {
					if (response.data.errcode === '0000') {
            localStorage.setItem('IWantLoginWithAccount', 'no')
            _this.$store.commit('SET_USER_INFO', response.data.data)
            _this.$store.commit('SET_TOKEN', response.data.data.token)
            _this.$store.commit('SET_CURRENT_PHONE', response.data.data.phone)
            _this.$store.commit('SET_USER_ID', response.data.data.id)
            _this.$router.push({path: './index'})
            localStorage.setItem('userinfo', JSON.stringify(response.data.data))
            // if(_this.isBindWX) {
            //   localStorage.setItem('IWantLoginWithAccount', 'no')
            // }
					} else {
            Toast(response.data.errmsg)
					}
				})
				.catch(function (error) {
					// console.log(error)
				})
			},
				/* 密码加密 */
			encrypt(string) {
				const pubkey = this.config.basic.key
				try {
					let content = this.form.password
					let crypt = new window.JSEncrypt()
					crypt.setKey(pubkey)
					let crypted = crypt.encrypt(content)
					return crypted
				} catch (ex) {
					return false
				}
			},
    	getCode: function() {
    		let _this = this

        if (_this.codeCount > 0) {
          Toast('请稍后获取验证码')
          return
        }


    		if(!(/^1[3|4|5|7|8]\d{9}$/.test(_this.form.phone))){
          mui.alert('不是正确的11位手机号','消息','确定')
		      return
				}
				// if (_this.form.username.length === 0) {
//        Toast('请先填写用户名')
				// 	return
				// }
				this.$api.get(this.config.baseserverURI + this.config.basic.loginMail,{
          phone : _this.form.phone,
          scid : _this.scid
        })
				.then(function (response) {
					if (response.data.errcode === '0000') {
            Toast('验证码发送成功')

          } else {
            Toast(response.data.errmsg)

          }
				})
				.catch(function (error) {
					// console.log(error)
				})
    		if (_this.codeMsg === '获取验证码' || _this.codeMsg === '重新获取'){
    			_this.codeCount = 60
    			var inter = setInterval(function(){
    				if(_this.codeCount == 0){
    					_this.codeMsg = '重新获取'
    					clearInterval(inter)
    					return
    				}
    				_this.codeCount --
    				_this.codeMsg = _this.codeCount + 's后获取'
    			},1000)

    		}
			}
    }
  }
//  import './login.css';
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	#login {
		height: 100%;
	}
 /*@import '../../assets/css/login.css';*/
  .login-form-box{
  	margin-top: 13px;
  	margin-bottom: 5px;
  }
  .login-btn-getCode{
	 	height:40px;
	 	padding-top: 0;
	 }
  .login-btn-getCode .mui-btn{
  	width: 100px;
    margin-top: -39px;
    margin-right: 9px;
    position: absolute;
    top: 42px;
    right: 0px;
  }
  .login-btn-loginBtn{
  	width: 90%;
    margin: 0 auto;
    margin-top: 10px;
    padding: 10px 0;
  }
  .login-router-link{
  	width: 90%;
  	margin: 0 auto;
  	margin-top: 10px;
    height: 1rem;
  }
  .login-router-link a{
  	display: inline-block;
  }
  .login-router-reg{
  	float: left;
  }
  .login-router-forget{
  	float: right;
  }
  .login-checked-box.mui-left input[type=checkbox], .login-checked-box.mui-left input[type=radio]{
  	left: 17%;
  }
 .login-checked-box{
   label{
     text-align: center;
   }
 }
 .mui-off-canvas-wrap .mui-bar {
    position: absolute!important;
    -webkit-transform: translate3d(0,0,0);
    transform: translate3d(0,0,0);
    -webkit-box-shadow: 0 1px 6px #ccc;
    box-shadow: 0 1px 6px #ccc;
	}
</style>
