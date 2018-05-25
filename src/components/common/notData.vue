<template>
  <div id="notData">
    <div>
      <img v-show="isshowimg" src="../../../static/images/img_nodata.png" height="1672" width="5415"/>
      <p v-show="isshowtext">{{notDataTxt}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'notData',
  data() {
    return {
      notDataTxt: '没有更多数据了'
    }
  },
  props: ['isshowimg', 'isshowtext'],
  mounted: function() {},
  methods: {}
}
</script>

<style scoped lang="less">
#notData {
  text-align: center;
  img {
    width: 50%;
    height: 100%;
  }
  p {
    text-align: center;
    font-size: 3.4vw;
    margin-bottom: 20px;
    margin-top: 20px;
  }
}
</style>
