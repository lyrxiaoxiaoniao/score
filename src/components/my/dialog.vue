<template>
  <div v-if="visiable" class="cdialog">
    <div class="cdialog-center">测试数据请问请问模块
      <div @click="onClose">关闭</div>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    visiable: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onClose() {
      this.$emit('update:visiable', false)
    }
  }
}
</script>

<style lang="less" scoped>
.cdialog {
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
  }
}
</style>
