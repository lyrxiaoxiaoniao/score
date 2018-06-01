<template>
  <!-- 全局提示框 -->
  <div v-show="visible" class="dialog">
    <div class="dialog-center">
      <div class="dialog-center-image">
        <img v-if="type === 'warn'" src="./img/icon_warn.png" alt="">
        <img v-if="type === 'success'" src="./img/icon_success.png" alt="">
      </div>
      <div class="dialog-center-content">{{message}}</div>
      <div class="dialog-center-btn">
        <div v-if="showCancel" @click="onCancel" class="dialog-center-btn_item">{{cancelButtonText}}</div>
        <div @click="onConfirm" class="dialog-center-btn_item confim">{{confirmButtonText}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      message: '',
      type: 'warn',
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      showCancel: true
    }
  },
  computed: {
    // imageType() {
    //   return this.type === 'warn'
    //     ? '/img/icon_warn.png'
    //     : '/img/icon_success.png'
    // }
  },
  methods: {
    onConfirm() {
      this.visible = false
    },
    onCancel() {
      this.visible = false
    }
  }
}
</script>
<style lang="less" scoped>
.dialog {
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  &-center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 4.5333rem;
    width: 6.6667rem;
    border-radius: 0.1333rem;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    &-image {
      height: 1.92rem;
      padding-top: 1.28rem/2;
      padding-bottom: 0.5867rem/2;
      align-self: center;
      img {
        height: 2.56rem/2;
        width: 2.56rem/2;
      }
    }
    &-content {
      flex: 1;
      font-size: 0.8533rem/2;
      color: rgb(153, 153, 153);
      text-align: center;
      padding: 0 0.5333rem;
    }
    &-btn {
      height: 1.2rem;
      display: flex;
      justify-content: flex-start;
      border-top: 1px solid #f1e8e8;
      &_item {
        & + & {
          border-left: 1px solid #f1e8e8;
        }
        flex: 1;
        font-size: 0.8533rem/2;
        font-weight: 600;
        color: rgb(153, 153, 153);
        height: 1.1733rem;
        line-height: 1.1733rem;
        width: 100%;
        text-align: center;
      }
    }
    .confim {
      color: #1e9bff;
    }
  }
}
</style>
