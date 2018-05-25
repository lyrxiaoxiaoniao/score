<template>
  <!-- 全局提示框 -->
  <div v-show="visible" class="dialog-tips dialog-center">
      <div>{{message}}</div>
      <div @click="onHandle" class="btn">确定</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      message: ''
    }
  },
  methods: {
    onHandle() {
      console.log(132133333);
    }
  }
}
</script>
<style lang="less" scoped>
.dialog-tips {
  position: fixed;
  z-index: 100;
  min-width: 220px;
  padding: 40px 22px;
  white-space: nowrap;
  background-color: #fff;
  box-shadow: 0px 8px 15px 0 rgba(0, 0, 0, 0.1);
  text-align: center;
  .dialog-tips-icon {
    width: 54px;
    height: 54px;
    // @extend %bg-contain;
    background: #000;
    display: inline-block;
    margin-bottom: 13px;
  }
}
.dialog-center {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .btn {
    color: pink;
    height: 30px;
    line-height: 30px;
    width: 100%;
    text-align: center;
  }
}
</style>
