<template>
  <div id="set" class="mui-fullscreen">
    <div class="mui-content mui-views">
      <div class="mui-view">
        <div class="mui-navbar">
          <div class="mui-navbar-inner mui-bar mui-bar-nav mui-navbar-center">
            <button type="button" class="mui-left mui-action-back mui-btn  mui-btn-link mui-btn-nav mui-pull-left">
              <span class="mui-icon mui-icon-left-nav"></span>
            </button>
            <h1 class="mui-center mui-title">我的资料</h1>
            <button @click="onEdit" class="mui-btn mui-btn-link mui-pull-right">保存</button>
          </div>
        </div>
        <div class="mui-pages">
          <div id="setting" class="mui-page mui-page-center">
            <!--页面标题栏开始-->

            <!--页面标题栏结束-->
            <!--页面主内容区开始-->
            <div class="mui-page-content">
              <div class="" data-scroll="2">

                <ul class="avatar mui-table-view mui-table-view-chevron">
                  <li class="mui-table-view-cell">
                    <a @click="clickAvatar" href="javascript:;" class="mui-navigate-right">
                      <span>头像</span>
                      <img :src="form.avatar" alt="">
                    </a>
                  </li>
                </ul>

                <form class="mui-input-group" style="margin-top: 15px">
                  <div class="mui-input-row">
                    <label>用户姓名</label>
                    <input v-model="form.realname" type="text" class="mui-input-clear" placeholder="请输入用户姓名">
                  </div>
                  <div class="mui-input-row">
                    <label>手机号码</label>
                    <input v-model="form.phone" disabled type="number" class="" placeholder="请输入手机号码">
                  </div>
                  <div class="mui-input-row">
                    <label>性别</label>
                    <input v-model="form.sexValue" readonly @tap='chooseSex' type="text" class="" placeholder="请选择性别">
                  </div>
                  <div class="mui-input-row">
                    <label>归属部门</label>
                    <input v-model="form.depart" readonly @tap='chooseDepart' type="text" class="" placeholder="请选择归属部门">
                  </div>
                  <div class="mui-input-row">
                    <label>担任职务</label>
                    <input v-model="form.position" readonly @tap='choosePosition' type="text" class="" placeholder="担任职务">
                  </div>
                </form>
                <copy-right></copy-right>
              </div>
            </div>
            <!--页面主内容区结束-->
            <loading :is-show="loadingData"></loading>
            <div id="sheet1" class="mui-popover mui-popover-bottom mui-popover-action ">
              <!-- 可选择菜单 -->
              <ul class="mui-table-view">
                <li class="mui-table-view-cell">
                  <a @tap="avatarHandle(1)" href="javascript:;">查看大图</a>
                </li>
                <li class="mui-table-view-cell" style="height: 41px;">
                  <a style="width: 100%;text-align: center;margin-left: 0;" @tap="avatarHandle(2)" href="javascript:;">
                    <span style="display: inline-block;width: 100%;">更换头像</span>
                    <!--<input style="position: absolute;opacity: 0;display: inline-block;width: 100%;left: 0;" type="file" class="upImg" id="upload" accept="image" @change="upload">-->
                    <uploadimg v-on:primary-imgUrl="getImgUrl"></uploadimg>
                  </a>
                </li>
              </ul>
              <!-- 取消菜单 -->
              <ul class="mui-table-view">
                <li class="mui-table-view-cell">
                  <a href="#sheet1"><b>取消</b></a>
                </li>
              </ul>
            </div>
            <transition name="slide-fade" class="fadeView">
              <div v-if="showImg">
                <image-view :imgArr="imageViewArr"
                            :showImageView="true"
                            :imageIndex="0"
                            v-on:hideImage="hideImageView"></image-view>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import copyRight from '../common/copyRight.vue'
  import { Toast } from 'mint-ui';
  import imageView from 'vue-imageview'
  import loading from '../common/loading.vue'
  import Exif from 'exif-js'
  import uploadimg from '../common/uploadimg.vue'

  export default {
    name: 'set',
    data () {
      return {
        loadingData: false,
        value: '123123',
        phone: this.$store.state.phone,
        form: {
          id: '',
          realname: '',
          phone: '',
          sexValue: '',
          sex: '',
          depart: '',
          departArr: [],
          position: '',
          positionId: '',
          avatar:  sessionStorage.user_avatar || './static/images/LaJiTouXiang.png',
        },
        sexData: [{text:'男',value:1},{text:'女',value:2},{text:'保密',value:3}],
        departData: '',
        positionData: '',
        positionId: null,
        // 图片数组
        imageViewArr: null,
        // 显示组件
        showImg: false,
        headerImage:'',
        picValue:'',
        textss: '',
        src: null,
        fileNamess: null,
      }
    },
    components: {
      copyRight, loading, imageView, uploadimg
    },
    mounted: function () {
      this.getData()
      this.getDepart()
    },
    methods: {
      getImgUrl(data) {
        this.form.avatar = data
      },
      showImgView () {
        let vm = this
        let ua = navigator.userAgent.toLowerCase();
        vm.form.avatar.replace(/(^\s*)|(\s*$)/g, "")
        vm.imageViewArr = [vm.form.avatar]
        if(ua.match(/MicroMessenger/i) == "micromessenger") {

          wx.previewImage({
            current: vm.imageViewArr, // 当前显示图片的http链接
            urls: vm.imageViewArr // 需要预览的图片http链接列表
          });
        } else {
          vm.showImg = true
          vm.loadingData = true
          let PageHeight = $("body").height()
          setTimeout(() => {
            vm.loadingData = false
            let img = $("#imageView .imageBox li img")
            let imgHeight = $("#imageView .imageBox li img").height()
            $("#imageView > div").css('visibility', 'visible')
            $("#imageView > div").css('margin-top', (PageHeight-imgHeight)/2)

          },100)
        }
      },
      hideImageView () {
        this.showImg = false
      },
      avatarHandle(type) {
        mui('#sheet1').popover('toggle');
        if(type === 1) { //查看大图
          this.showImgView()

        }else if(type === 2) { //更换头像

        }
      },
      clickAvatar () {
        mui('#sheet1').popover('toggle');
      },
      chooseSex () {
        let _this = this
        var picker = new mui.PopPicker()
        picker.setData(_this.sexData)
        picker.pickers[0].setSelectedIndex(0)
        picker.show(function (selectItems) {
          _this.form.sexValue= selectItems[0].text
          _this.form.sex= selectItems[0].value
        })
      },
      choosePosition () {
        let _this = this
        var picker = new mui.PopPicker()
        picker.setData(_this.positionData)
        picker.show(function (selectItems) {
          _this.form.position = selectItems[0].text
          _this.form.positionId = selectItems[0].value
          _this.form.positionBean = {id: selectItems[0].value}
        })
      },
      /* 设置归属部门 */
      chooseDepart () {
        let _this = this
        var picker = new mui.PopPicker({
          layer: 2
        })
        picker.setData(_this.departData)
        picker.show(function(SelectedItem) {
          _this.form.depart = ''
          _this.form.departArr = []
          SelectedItem.forEach(v => {
            _this.form.depart += v.text
            _this.form.departArr = Number(v.value)
          })
          _this.positionId = _this.form.departArr
          _this.getDepartList()
          _this.form.position = ''
        })
      },
      iteration (res) {
        const _this = this
        res.forEach(v => {
          v.text = v.title
          v.value = String(v.id)
          if (v.children.length === 0) {
            v.children = null
          } else {
            _this.iteration(v.children)
          }
        })
        return res
      },
      getDepart () {
        let vm = this
        vm.$api.get(vm.config.baseserverURI + vm.config.mine.organization)
        .then(response => {
          if (response.data.errcode === '0000') {
            vm.departData = vm.iteration(response.data.data)
          } else {
            Toast(response.data.errmsg)
          }
        })
      },
      getPositionList (res) {
        res.forEach(v => {
          v.value = v.id
          v.text = v.name
        })
        return res
      },
      getDepartList () {
        let vm = this
        let id = null
        if (!vm.positionId) {
          Toast('请先选择归属部门')

          return
        } else {
          id = vm.positionId
        }
        vm.$api.get(vm.config.baseserverURI + vm.config.mine.positionList, {organization_id: id})
        .then(response => {
          if (response.data.errcode === '0000') {
            vm.positionData = vm.getPositionList(response.data.data)
          } else {
            Toast(response.data.errmsg)

          }
        })
      },
      getData () {
        let vm = this
        vm.$api.get(vm.config.baseserverURI + vm.config.mine.index, {phone: vm.phone})
        .then(function (response) {
					if (response.data.errcode === '0000') {
              let res = response.data.data
              vm.setDefault(res)
              vm.getDepartList()
					} else {
            vm.form.phone = vm.phone
            // vm.form.id = vm.$store.state.id
            vm.form.id = JSON.parse(localStorage.userinfo).id
          }
				})
				.catch(function (error) {
				})
      },
      setDefault (res) {
        let vm = this
        vm.form.id = res.rubPositionVO.rubPositionUserVO.userVO.id
        vm.form.realname = res.rubPositionVO.rubPositionUserVO.userVO.realname
        vm.form.phone = res.rubPositionVO.rubPositionUserVO.userVO.phone
        vm.form.sex = res.rubPositionVO.rubPositionUserVO.userVO.sex
        vm.sexData.forEach(v => {
          if (v.value === vm.form.sex) {
            vm.form.sexValue = v.text
            return
          }
        })
        vm.form.depart = res.p_title + res.title
        vm.form.positionId = res.id
        vm.form.positionBean = {id: res.id}
        vm.positionId = res.id
        vm.form.position = res.rubPositionVO.name
      },
      onEdit () {
        let vm = this
        vm.$api.post(vm.config.baseserverURI + vm.config.mine.updateInfo, vm.form)
        .then(function (response) {
					if (response.data.errcode === '0000') {
					    sessionStorage.setItem('user_avatar', vm.form.avatar)
            Toast('编辑成功')

          } else {
            Toast(response.data.errmsg)

          }
				})
				.catch(function (error) {
				})
      }
    }
  }
</script>

<style scoped lang="less">
  #set{
    height: 100%;
    .avatar{ // 头像
      .mui-navigate-right{
        height: 50px;
        line-height: 50px;
        img{
          height: 38px;
          width: 38px;
          vertical-align: middle;
          float: right;
          margin-top: -5px;
          margin-right: -25px;
        }
        span {
          display: inline-block;
          position: relative;
          top:-10px;
        }
      }
    }

    .mui-scroll-wrapper{
      /*padding-top: 54px;*/
    }
    .mui-ellipsis{
      line-height: 1.5;
      margin-top:10px;
    }
    .mui-views,
    .mui-view,
    .mui-pages,
    .mui-page,
    .mui-page-content {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      background-color: #f6f6f6;
    }
    .mui-pages {
      top: 46px;
      height: auto;
    }
    .mui-scroll-wrapper,
    .mui-scroll {
      background-color: #f6f6f6;
    }
    .mui-page.mui-transitioning {
      -webkit-transition: -webkit-transform 300ms ease;
      transition: transform 300ms ease;
    }
    .mui-page-left {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
    .mui-ios .mui-page-left {
      -webkit-transform: translate3d(-20%, 0, 0);
      transform: translate3d(-20%, 0, 0);
    }
    .mui-navbar {
      position: fixed;
      right: 0;
      left: 0;
      z-index: 10;
      height: 44px;
      background-color: #f7f7f8;
    }
    .mui-navbar .mui-bar {
      position: absolute;
      background: transparent;
      text-align: center;
    }
    .mui-android .mui-navbar-inner.mui-navbar-left {
      opacity: 0;
    }
    .mui-ios .mui-navbar-left .mui-left,
    .mui-ios .mui-navbar-left .mui-center,
    .mui-ios .mui-navbar-left .mui-right {
      opacity: 0;
    }
    .mui-navbar .mui-btn-nav {
      -webkit-transition: none;
      transition: none;
      -webkit-transition-duration: .0s;
      transition-duration: .0s;
    }
    .mui-navbar .mui-bar .mui-title {
      display: inline-block;
      width: auto;
    }
    .mui-page-shadow {
      position: absolute;
      right: 100%;
      top: 0;
      width: 16px;
      height: 100%;
      z-index: -1;
      content: '';
    }
    .mui-page-shadow {
      background: -webkit-linear-gradient(left, rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, 0) 10%, rgba(0, 0, 0, .01) 50%, rgba(0, 0, 0, .2) 100%);
      background: linear-gradient(to right, rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, 0) 10%, rgba(0, 0, 0, .01) 50%, rgba(0, 0, 0, .2) 100%);
    }
    .mui-navbar-inner.mui-transitioning,
    .mui-navbar-inner .mui-transitioning {
      -webkit-transition: opacity 300ms ease, -webkit-transform 300ms ease;
      transition: opacity 300ms ease, transform 300ms ease;
    }
    .mui-page {
      display: none;
    }
    .mui-pages .mui-page {
      display: block;
    }
    .mui-page .mui-table-view:first-child {
      margin-top: 15px;
    }
    .mui-page .mui-table-view:last-child {
      margin-bottom: 30px;
    }
    .mui-table-view {
      margin-top: 20px;
    }

    .mui-table-view span.mui-pull-right {
      color: #999;
    }
    .mui-table-view-divider {
      background-color: #f6f6f6;
      font-size: 14px;
    }
    .mui-table-view-divider:before,
    .mui-table-view-divider:after {
      height: 0;
    }
    .head {
      height: 40px;
    }
    #head {
      line-height: 40px;
    }
    .head-img {
      width: 40px;
      height: 40px;
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
    .mui-fullscreen {
      position: fixed;
      z-index: 20;
      background-color: #000;
    }
    .mui-ios .mui-navbar .mui-bar .mui-title {
      position: static;
    }
  }
</style>
