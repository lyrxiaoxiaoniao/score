<template>
  <div class="mine">
    <mt-header fixed title="我的">
      <mt-button @click="toBack" icon="back" slot="left"></mt-button>
    </mt-header>
    <div>
      <mt-cell title="个人资料" is-link>
        <img slot="icon" src="http://placehold.it/100x100" width="24" height="24">
      </mt-cell>
      <mt-cell title="考核记录" is-link>
        <img slot="icon" src="http://placehold.it/100x100" width="24" height="24">
      </mt-cell>
    </div>

    <div class="mine-btn">退出登录</div>
    <copy-right></copy-right>
  </div>
</template>

<script>
import copyRight from '../common/copyRight'
export default {
  name: 'mine',
  data() {
    return {}
  },
  components: { copyRight },
  mounted() {
    this.$LToast('MY HOME', 'success', {
      showCancel: true,
      confirmButtonText: 'confim',
      cancelButtonText: 'cancel'
    })
  },
  methods: {
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
  padding-top: 40px;
  padding-bottom: 2.6133rem/2;
  height: 100%;
  &-btn {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 2.6133rem/2;
    line-height: 2.6133rem/2;
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
