<template>
  <div class="detail">
    <mt-header fixed title="考核扣分">
      <mt-button icon="back" slot="left"></mt-button>
    </mt-header>
    <div class="detail-view">
      <div class="detail-view-item">
        <h3>考核类别：</h3>
        <p>环境卫生</p>
      </div>
      <div class="detail-view-item">
        <h3>考核内容：</h3>
        <p>无违反规划新增私搭乱建，无擅自改变房屋用途现象（2分）</p>
      </div>
      <div class="detail-view-item">
        <h3>考核标注：</h3>
        <p>有新建的，修改的扣2分</p>
      </div>
      <div class="detail-view-koufen">
        <span class="detail-view-koufen_left">当前扣分：0分</span>
        <!-- <span class="detail-view-koufen_right">扣分</span> -->
      </div>

      <div class="detail-view-item">
        <h3>扣分分值：2</h3>
        <p>问题描述：</p>
        <textarea cols="30" rows="5"></textarea>
      </div>

      <div class="detail-view-upload">
        <h3>图片证明：</h3>
        <div class="detail-view-upload-img">
          <div class="upload-img">
            <i @click="imgRemove"></i>
            <img src="http://placehold.it/70x70" alt="">
          </div>
          <div class="upload-img">
            <i @click="imgRemove"></i>
            <img src="http://placehold.it/70x70" alt="">
          </div>
          <div class="upload-img">
            <i @click="imgRemove"></i>
            <img src="http://placehold.it/70x70" alt="">
          </div>
          <div class="upload-img">
            <uploadimg class="showimg" @primary-imgUrl="getImgUrl"></uploadimg>
          </div>
        </div>
        <p>为了更好的记录问题，请务必上传照片，最多3张，每张大小不得超过5M，支持JPG/PMP/PNG格式！</p>
      </div>

    </div>
    <div class="detail-btn">确定</div>
  </div>
</template>

<script>
import uploadimg from '../common/uploadimg.vue'
export default {
  name: 'detail',
  data() {
    return {}
  },
  components: { uploadimg },
  methods: {
    imgRemove() {
      console.log('imgRemove');
    },
    getImgUrl() {}
  }
}
</script>

<style lang="less" scoped>
.detail {
  position: relative;
  padding: 0 0.5333rem/2;
  padding-top: 1.1733rem;
  // padding-top: 40px;
  height: 100%;
  &-view {
    margin-top: 0.2667rem;
    margin-bottom: 2.9333rem/2;
    background-color: #fff;
    padding: 0.8rem/2 0.5333rem/2;
    border: 1px solid #e6e6e6;
    border-radius: 0.1333rem;
    &-koufen {
      margin: 0.2667rem 0;
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
    &-upload {
      font-size: 0.7467rem/2;
      color: rgb(51, 51, 51);
      &-img {
        margin: 0.2667rem 0;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .upload-img {
          width: 1.8667rem;
          height: 1.8667rem;
          margin-right: 0.2667rem;
          position: relative;
          i {
            display: inline-block;
            width: 0.4rem;
            height: 0.4rem;
            position: absolute;
            top: 0;
            right: 0;
            background: url('../../../static/images/task/icon_del.png')
              no-repeat center/cover;
          }
          > img {
            width: 1.8667rem;
            height: 1.8667rem;
          }
          .showimg {
            background: url('../../../static/images/task/icon_upload.png')
              no-repeat center/cover;
            background-size: 100% 100%;
          }
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
    font-weight: 600;
    text-align: center;
    color: #fff;
    background-color: #26a2ff;
  }
}
</style>
