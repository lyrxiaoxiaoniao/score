<template>
  <div id="forget" class="forget mui-content">
  	<div class="mui-scroll-wrapper">
  		<div class="mui-off-canvas-wrap mui-draggable">
  			<div class='mui-inner-wrap'>
  				<header class="mui-bar mui-bar-nav forget-btn-back">
			        <a href="javascript:;" class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
			        <h1 class="mui-title">密码服务</h1>

			    </header>
			    <div class="mui-content mui-scroll-wrapper">
			    	<div class="mui-scroll">
			    		<div class='forget-form-box'>
			        	<form class="mui-input-group">
								    <div class="mui-input-row">
								        <label>用户姓名</label>
								    <input v-model="form.realname" type="text" class="mui-input-clear" placeholder="请输入用户姓名">
								    </div>
								    <div class="mui-input-row">
								        <label>手机号码</label>
								        <input v-model="form.phone" type="number" class="" placeholder="请输入手机号码">
								    </div>
								    <div class="mui-input-row mui-button-row forget-btn-getCode">
								        <label style="text-align: left">短信验证</label>
								        <input v-model="form.code" type="number" class="" placeholder="请输入验证码">
												<button @click='getCode' type="button" class="mui-btn mui-btn-primary" >{{ codeMsg }}</button>
								    </div>
								    <div class="mui-input-row">
								        <label>设置密码</label>
								        <input v-model="form.new_pw" type="password" class="mui-input-password" placeholder="请输入密码">
								    		<!-- 蓝色开关关闭状态 -->
												<!-- <div class="mui-switch mui-switch-blue forget-switch-password" v-bind:class="{ 'mui-active' : isPassword }" @click="isPasswordEvent" >
												  <div class="mui-switch-handle"></div>
												</div> -->
								    </div>
								</form>
			        </div>
			        <div class="mui-input-row mui-checkbox mui-left forget-checked-box">
							  <label style="width: 75%;padding-left: 14px;">本人已经了解密码更改风险</label><a @tap="open" class="a-link" href="javascript:;">《修改密码服务协议》</a>
							  <input style="left:5%;" @change="isChecked" name="checkbox1" value="Item 1" type="checkbox" checked>
							</div>

							<button @click="resetPassword" type="button" class="mui-btn mui-btn-blue mui-btn-block forget-btn-loginBtn">更改密码</button>

			    	</div>
			    </div>
  			</div>
  		</div>
  	</div>
		<mt-popup
			style="width:90%;height:85%;overflow: scroll;overflow-wrap: break-word;"
			v-model="popupVisible"
			popup-transition="popup-fade">
			<modify-pwd></modify-pwd>
		</mt-popup>
  </div>
</template>

<script>
//  import './login.css'
import copyRight from '../common/copyRight.vue'
import ModifyPwd from './ModifyPwd'
import { Toast } from 'mint-ui';
  export default {
    name: 'forget',
    install: function () {
      Vue.component(this.name, this)
    },
    data () {
      return {
				scid: sessionStorage.scid,
      	codeMsg:'获取验证码',
      	codeCount: 0,
      	isPassword: false,
        form: {
					realname: '',
					phone: '',
					code: '',
					new_pw: ''
				},
				isRead: true,
				popupVisible: false
      }
    },
    components: {
			copyRight,
			ModifyPwd
    },
    methods: {
			open () {
				this.popupVisible = true
			},
    	/* 用户协议确定 */
			isChecked (e) {
				this.isRead = e.target.checked
			},
			isStringEmpty(string) {
				if (string.length === 0) {
					return true
				}
				return false
			},
			resetPassword () {
				let _this = this
				if (!_this.isRead) {
          Toast('请先阅读修改密码协议')
					return
				}
				if (_this.isStringEmpty(_this.form.realname) ||
					_this.isStringEmpty(_this.form.phone) ||
					_this.isStringEmpty(_this.form.new_pw) ||
					_this.isStringEmpty(_this.form.code)) {
          Toast('请填写完注册信息')

          return
				}
				if (_this.codeMsg === '获取验证码') {
          Toast('请填获取短信验证码')

          return
				}
				const encryptedPwd = _this.encrypt()
				const obj = {
					...this.form
				}
				obj.new_pw = encryptedPwd
				_this.$api.post(_this.config.baseserverURI + _this.config.basic.resetPassword, {scid : _this.scid, ...obj})
				.then(function (response) {
					if (response.data.errcode === '0000') {
            Toast('修改成功')

            _this.$router.push({path: '/login'})
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
					let content = this.form.new_pw
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

				if (_this.form.phone.length === 0) {
          Toast('请先填写手机号码与账号')

          return
				}
				if(!(/^1[3|4|5|7|8]\d{9}$/.test(_this.form.phone))){
					mui.alert('不是正确的11位手机号','消息','确定')
					return
				}
				this.$api.get(this.config.baseserverURI + this.config.basic.loginMail,{
					phone : _this.form.phone,
					scid : _this.scid
          // username : _this.form.username
        })
				.then(function (response) {
					if (response.data.errcode === '0000') {
            Toast('验证码发送成功')

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
			back: function() {
				this.$router.back()
			}
    }
  }
//  import './login.css';
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	.forget-form-box{
  	margin-top: 13px;
  	margin-bottom: 5px;
  }
 .forget-btn-back .mui-icon{
 	/*padding-top: 15px;*/
 	/*font-size: 13px;*/
 }
 .forget-btn-getCode{
 	height:40px;
 	padding-top: 0;
 }
 .forget-btn-getCode .mui-btn{
  	width: 100px;
    margin-top: -39px;
    margin-right: 9px;
   position: absolute;
   top: 40px;
   right: 0px;
  }
 .forget-switch-password{
  	width: 75px;
    margin-top: -36px;
    margin-right: 9px;
   position: absolute;
   top: 42px;
   right: 30px;
  }
  .forget-btn-loginBtn{
  	width: 90%;
    margin: 0 auto;
    margin-top: 10px;
    padding: 10px 0;
  }
  .forget-checked-box.mui-left input[type=checkbox], .forget-checked-box.mui-left input[type=radio]{
  	left: 17%;
  }
  .forget-checked-box{
    label{
      text-align: center;
    }
	}
	.a-link {
		position: absolute;
		top: .2rem;
    right: .1rem;
	}
	.mui-off-canvas-wrap .mui-bar {
    position: absolute!important;
    -webkit-transform: translate3d(0,0,0);
    transform: translate3d(0,0,0);
    -webkit-box-shadow: 0 1px 6px #ccc;
    box-shadow: 0 1px 6px #ccc;
	}
	.forget-btn-back .mui-icon[data-v-5bf1ce18] {
    padding-top: 10px;
	}
</style>
