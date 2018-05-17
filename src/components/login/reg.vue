<template>
  <div id="reg" class="reg mui-content">
  	<div class="mui-scroll-wrapper">
  		<div class="mui-off-canvas-wrap mui-draggable">
  			<div class='mui-inner-wrap'>
  				<header class="mui-bar mui-bar-nav reg-btn-back">
			        <a href="javascript:;" class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
			        <h1 class="mui-title">用户注册</h1>

			    </header>
			    <div class="mui-content mui-scroll-wrapper" v-show="!isShowLogin">
			    	<div class="mui-scroll">
			    		<div class='reg-form-box'>
			        	<form class="mui-input-group">
								    <div class="mui-input-row">
								        <label>用户姓名</label>
								    <input v-model="form.realname" type="text" class="mui-input-clear" placeholder="请输入用户姓名">
								    </div>
								    <div class="mui-input-row">
								        <label>手机号码</label>
								        <input v-model="form.phone" type="number" class="" placeholder="请输入手机号码">
								    </div>
								    <div class="mui-input-row mui-button-row reg-btn-getCode">
								        <label style="text-align: left">短信验证</label>
								        <input v-model="form.code" type="number" class="" placeholder="请输入验证码">
												<button @click='getCode' type="button" class="mui-btn mui-btn-primary" >{{ codeMsg }}</button>
								    </div>
								    <div class="mui-input-row">
								        <label>设置密码</label>
								        <input v-model="form.password" type="password" class="mui-input-password" placeholder="请输入密码">
								    		<!-- 蓝色开关关闭状态 -->
												<!-- <div class="mui-switch mui-switch-blue reg-switch-password" v-bind:class="{ 'mui-active' : isPassword }" @click="isPasswordEvent">
												  <div class="mui-switch-handle"></div>
												</div> -->
								    </div>
								</form>
			        </div>
			        <div class="mui-input-row mui-checkbox mui-left reg-checked-box">
									<label style="width:75%;">本人已经阅读并同意</label><a @tap="open" class="a-link" href="javascript:;">《用户协议》</a>
							  	<input @change="isChecked" name="checkbox1" value="Item 1" type="checkbox" checked>
							</div>
							<button @click="register" type="button" class="mui-btn mui-btn-blue mui-btn-block reg-btn-loginBtn">用户注册</button>

			    	</div>
			    </div>
          <div class="success_box" v-show="isShowLogin">

            <img src="../../assets/images/reg_success.png" height="200" width="200"/>
            <h3>恭喜您，注册成功！</h3>
            <p>登录帐号：{{ form ? form.phone : '' }}</p>
            <button @tap="loginPost" type="button" class="mui-btn mui-btn-primary mui-btn-block">快速登录</button>
            <div v-show="isWX" class="mui-input-row mui-checkbox mui-left reg-checked-box">
              <label style="width:100%;">与本微信用户绑定，免密码快捷登录</label>
              <input @change="isChecked_login" name="checkbox1" value="Item 1" type="checkbox" checked>
            </div>
          </div>
  			</div>
  		</div>
  	</div>
		<mt-popup
			style="width:90%;height:85%;overflow: scroll;overflow-wrap: break-word;"
			v-model="popupVisible"
			popup-transition="popup-fade">
			<user-agreement></user-agreement>
		</mt-popup>

  </div>
</template>

<script>
//  import './login.css'
import copyRight from '../common/copyRight.vue'
import userAgreement from './UserAgreement'
import { Toast } from 'mint-ui';

  export default {
    name: 'reg',
    install: function () {
      Vue.component(this.name, this)
    },
    data () {
      return {
				scid: sessionStorage.scid,
      	codeMsg:'获取验证码',
      	codeCount: 0,
				form: {
					realname: '',
					phone: '',
					code: '',
					password: ''
				},
				isRead: true,
        isBindWX: true,
				popupVisible: false,
				isPost: false,
        isShowLogin: false,
        isWX: false,
        ua: window.navigator.userAgent.toLowerCase(),
      }
    },
    mounted: function () {
      if(this.ua.match(/MicroMessenger/i) == 'micromessenger') {
        this.isWX = true
      }else {
        this.isBindWX = false
      }
    },
    components: {
			copyRight,
			userAgreement
    },
    methods: {
      loginPost() {
        const vm = this
        if (vm.isPost)
          return

        vm.isPost = true
        let uri = ''
        if(vm.isBindWX) {
            uri = vm.config.baseserverURI + vm.config.getWechatFastLoginAPI
        }else {
            uri = vm.config.baseserverURI + vm.config.getMobileRubbishUserFastLoginAPI
        }
        vm.$api.get(uri)
          .then(function (response) {
            vm.isPost = false
            if (response.data.errcode === '0000') {
              vm.$store.commit('SET_USER_INFO', response.data.data)
              vm.$store.commit('SET_TOKEN', response.data.data.token)
              vm.$store.commit('SET_CURRENT_PHONE', response.data.data.phone)
              vm.$store.commit('SET_USER_ID', response.data.data.id)
              vm.$router.push({path: './index'})
              localStorage.setItem('userinfo', JSON.stringify(response.data.data))
              Toast('登录成功')
              // vm.$router.push({path: '/login'})
            }else {
              mui.alert(response.data.errmsg,'消息','确定')
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      },
			open () {
				this.popupVisible = true
			},
    	getCode: function() {
				let _this = this


        if (_this.codeCount > 0) {
          Toast('请稍后获取验证码')
          return
        }

				if (_this.form.phone.length === 0) {
          Toast('请先填写手机号码')
					return
				}
				if(!(/^1[3|4|5|7|8]\d{9}$/.test(_this.form.phone))){
          Toast('不是正确的11位手机号')

          return
				}
				_this.$api.get(_this.config.baseserverURI + _this.config.basic.sendMail,{
					phone : _this.form.phone,
					scid : _this.scid
        })
				.then(function (response) {
					if (response.data.errcode === '0000') {
            Toast('验证码发送成功')

          } else {
            Toast(response.data.errmsg)

            _this.form.phone = ''
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
			},
			/* 用户协议确定 */
			isChecked (e) {
				this.isRead = e.target.checked
			},
      isChecked_login(e) {
        this.isBindWX = e.target.checked

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
			register () {
				const vm = this
        if (vm.isPost)
          return

				if (!vm.isRead) {
          Toast('请先阅读用户协议')
					return
				}
				if (vm.isStringEmpty(vm.form.realname) ||
					vm.isStringEmpty(vm.form.phone) ||
					vm.isStringEmpty(vm.form.password) ||
					vm.isStringEmpty(vm.form.code)) {
          Toast('请填写完注册信息')

          return
				}
				if (vm.codeMsg === '获取验证码') {
          Toast('请填获取短信验证码')

          return
				}
				const encryptedPwd = vm.encrypt()
				const sendData = {
					...vm.form
				}
				vm.isPost = true
				sendData.password = encryptedPwd
				// sendData.nickname = sendData.username
				vm.$api.post(this.config.baseserverURI + (vm.isWX ? vm.config.basic.wxRegister : vm.config.basic.noWxRegister), {scid: vm.scid, ...sendData})
				.then(function (response) {
          vm.isPost = false
					if (response.data.errcode === '0000') {
              Toast('注册成功')
              vm.isShowLogin = true
//							vm.$router.push({path: '/login'})
					}else {
							mui.alert(response.data.errmsg,'消息','确定')
					}
				})
				.catch(function (error) {
					console.log(error)
				})
			},
			isStringEmpty(string) {
				if (string.length === 0) {
					return true
				}
				return false
			},
			back: function() {
				this.$router.back()
			}
    }
  }
//  import './login.css';
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .success_box{
    padding-top: 74px;
    text-align: center;
    img{
      width: 30%;
      height: 30%;
    }
    h3{
      font-weight: 600;
      margin: 1rem 0 .5rem;
    }
    p{
      margin: .3rem 0 1.5rem;
    }
    button {

      width: 90%;
      margin-left: 5%;
      font-size: 4vw;
      padding: 10px;
    }
    .mui-input-row{

    }
  }
	.reg-form-box{
  	margin-top: 13px;
  	margin-bottom: 5px;
  }
 .reg-btn-back .mui-icon{
 	/*padding-top: 15px;*/
 	/*font-size: 13px;*/
 }
 .reg-btn-getCode{
 	height:40px;
 	padding-top: 0;
 }
 .reg-btn-getCode .mui-btn{
  	width: 100px;
    margin-top: -39px;
    margin-right: 9px;
   position: absolute;
   top: 40px;
   right: 0px;
  }
 .reg-switch-password{
  	width: 75px;
    margin-top: -36px;
    margin-right: 9px;
     position: absolute;
     top: 40px;
     right: 30px;
   /*padding: 40px 20px 0 0;*/
  }
  .reg-btn-loginBtn{
  	width: 90%;
    margin: 0 auto;
    margin-top: 10px;
    padding: 10px 0;
  }
  .reg-checked-box.mui-left input[type=checkbox], .reg-checked-box.mui-left input[type=radio]{
  	left: 17%;
  }
  .reg-checked-box{
    label{
      text-align: center;
    }
	}
	.a-link {
		position: absolute;
		top: .2rem;
    right: 1.5rem
	}
	.mui-off-canvas-wrap .mui-bar {
    position: absolute!important;
    -webkit-transform: translate3d(0,0,0);
    transform: translate3d(0,0,0);
    -webkit-box-shadow: 0 1px 6px #ccc;
    box-shadow: 0 1px 6px #ccc;
	}
	.reg-btn-back .mui-icon[data-v-454a3c9d] {
    padding-top: 10px;
	}
</style>
