<template>
  <div class="mine">
    <mt-header fixed title="我的">
      <mt-button @click="toBack" icon="back" slot="left"></mt-button>
    </mt-header>
    <div class="mine-header">
      <!-- 测试 -->
      <div class="mine-header-img">
        <img src="http://placehold.it/70x70" alt="">
      </div>
      <div class="mine-header-text">
        <p>小春</p>
      </div>
    </div>
    <div class="mine-container">
      <mt-cell @click.native="onShow" title="个人资料" is-link>
        <img slot="icon" src="/static/images/my/icon_ziliao.png" width="16" height="16">
      </mt-cell>
      <mt-cell @click.native="toTask" title="考核记录" is-link>
        <img slot="icon" src="/static/images/my/icon_jilv.png" width="16" height="16">
      </mt-cell>
    </div>
    <div class="mine-btn">退出登录</div>
    <copy-right></copy-right>
    <!-- <c-dialog :visiable.sync="show"></c-dialog> -->
  </div>
</template>

<script>
import copyRight from '../common/copyRight'
import CDialog from './dialog'
export default {
  name: 'mine',
  data() {
    return {
      show: true
    }
  },
  components: { copyRight, CDialog },
  mounted() {
    this.$LToast('MY HOME', 'success', {
      showCancel: true,
      confirmButtonText: 'confim',
      cancelButtonText: 'cancel'
    })
  },
  methods: {
    onShow() {
      // this.show = !this.show
      location.href =
        'https://gov.shencom.cn' +
        '/app/member/index.html?scid=' +
        sessionStorage.scid +
        '#/self'
    },
    toTask() {
      this.$router.push('/task')
    },
    toBack() {
      if (this.$store.state.routerchange) {
        this.$router.back()
      } else {
        this.$router.replace('/')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.mine {
  position: relative;
  padding-top: 1.1733rem;
  // padding-top: 40px;
  padding-bottom: 2.6133rem/2;
  height: 100%;
  &-header {
    width: 100%;
    height: 4rem;
    background: url('../../../static/images/my/banner.png') no-repeat
      center/cover;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    &-img {
      margin-left: 0.8rem;
      width: 1.6rem;
      height: 1.6rem;
      border-radius: 100%;
      overflow: hidden;
      img {
        width: 1.6rem;
        height: 1.6rem;
      }
    }
    &-text{
      padding-left: 0.4rem;
      flex: 1;
      p{
        line-height: 1.2rem/2;
        color: #fff;
        font-size: 0.3733rem;
      }
    }
  }
  &-container {
  }
  &-btn {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 2.3467rem/2;
    line-height: 2.3467rem/2;
    font-size: 0.96rem/2;
    text-align: center;
    border: 1px solid #ececec;
    border-radius: 0.1333rem;
    // color: #333;
    // background-color: #fff;
    color: #fff;
    background-color: #26a2ff;
    // &:hover{
    //   opacity: .5;
    // }
  }
}
</style>

