<template>
  <div class="newdetail">
    <mt-header fixed title="考核扣分">
      <mt-button icon="back" slot="left"></mt-button>
    </mt-header>
    <div class="newdetail-view">
      <div class="newdetail-view-item">
        <h3>考核类别：</h3>
        <p>环境卫生</p>
      </div>
      <div class="newdetail-view-item">
        <h3>考核内容：</h3>
        <p>无违反规划新增私搭乱建，无擅自改变房屋用途现象（2分）</p>
      </div>
      <div class="newdetail-view-item">
        <h3>考核标注：</h3>
        <p>有新建的，修改的扣2分</p>
      </div>
      <div class="newdetail-view-koufen">
        <span class="newdetail-view-koufen_left">当前扣分：0分</span>
        <!-- <span class="newdetail-view-koufen_right">扣分</span> -->
      </div>

      <div class="newdetail-view-content">

        <div @click="toEdit" class="newdetail-view-content-item">
          <i></i>
          <div class="item-left">
            <img src="static/images/task/icon_upload.png" alt="">
          </div>
          <div class="item-right">
            <h3>扣分：0.5</h3>
            <h3>扣分原因：</h3>
            <p>广告牌尺寸过于庞大，影响整体统一美观，并且破损严重，不但有漏电隐患，还有可能引发火灾。。。。。</p>
          </div>
        </div>

        <div @click="toEdit" class="newdetail-view-content-item">
          <i></i>
          <div class="item-left">
            <img src="static/images/task/icon_upload.png" alt="">
          </div>
          <div class="item-right">
            <h3>扣分：0.5</h3>
            <h3>扣分原因：</h3>
            <p>广告牌尺寸过于庞大，影响整体统一美观，并且破损严重，不但有漏电隐患，还有可能引发火灾。。。。。</p>
          </div>
        </div>

        <div @click="toEdit" class="newdetail-view-content-item">
          <i></i>
          <div class="item-left">
            <img src="static/images/task/icon_upload.png" alt="">
          </div>
          <div class="item-right">
            <h3>扣分：0.5</h3>
            <h3>扣分原因：</h3>
            <p>广告牌尺寸过于庞大，影响整体统一美观，并且破损严重，不但有漏电隐患，还有可能引发火灾。。。。。</p>
          </div>
        </div>

      </div>

    </div>
    <div class="newdetail-btn">确定</div>
  </div>
</template>

<script>
export default {
  name: 'newdetail',
  data() {
    return {}
  },
  methods: {
    toEdit() {
      this.$router.push('/adddetail')
    }
  }
}
</script>

<style lang="less" scoped>
.newdetail {
  position: relative;
  padding: 0 0.5333rem/2;
  padding-top: 40px;
  height: 100%;
  &-view {
    margin-top: 0.2667rem;
    margin-bottom: 2.9333rem/2;
    background-color: #fff;
    padding: 0.8rem/2 0.5333rem/2;
    border: 1px solid #e6e6e6;
    border-radius: 0.1333rem;
    &-koufen {
      margin-top: 0.2667rem;
      border-bottom: 1px solid #e6e6e6;
      height: 0.9333rem;
      &_left {
        text-align: center;
        width: 6.0267rem/2;
        height: 1.28rem/2;
        line-height: 1.28rem/2;
        float: left;
        background-color: rgb(255, 62, 80);
        color: #fff;
        border-radius: 0.5333rem;
      }
      &_right {
        text-align: center;
        width: 4.4rem/2;
        height: 1.4933rem/2;
        line-height: 1.4933rem/2;
        border-radius: 0.2133rem;
        border: 1px solid rgb(255, 62, 80);
        float: right;
        color: rgb(255, 62, 80);
      }
    }
    &-item {
      margin-bottom: 0.2667rem;
      h3 {
        font-size: 0.8533rem/2;
        color: rgb(51, 51, 51);
      }
      p {
        margin-top: 0.1333rem;
        font-size: 0.7467rem/2;
        color: rgb(102, 102, 102);
      }
      textarea {
        margin-top: 0.1333rem;
        background-color: #efefef;
        padding: 0.2667rem;
      }
    }
    &-content {
      &-item {
        position: relative;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        border-bottom: 1px solid #e6e6e6;
        padding: 0.2667rem 0;
        .item-left {
          margin-right: 0.5333rem/2;
          height: 1.8667rem;
          width: 1.8667rem;
          img {
            height: 1.8667rem;
            width: 1.8667rem;
          }
        }
        .item-right {
          flex: 1;
          padding-right: 0.4rem;
          height: 1.8667rem;
          h3 {
            line-height: 1.3;
          }
          p {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
          }
        }
        i {
          position: absolute;
          display: inline-block;
          width: 0.32rem;
          height: 0.48rem;
          top: 50%;
          margin-top: -0.24rem;
          right: 0;
          background: url('../../../static/images/home/icon_more.png') no-repeat
            center/cover;
        }
      }
    }
  }
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
    color: #fff;
    background-color: #26a2ff;
  }
}
</style>
