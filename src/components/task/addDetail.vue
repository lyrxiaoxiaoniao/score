<template>
  <div class="adddetail">
    <mt-header fixed title="考核扣分">
      <mt-button icon="back" slot="left"></mt-button>
    </mt-header>
    <div class="adddetail-view">
      <div class="adddetail-view-item">
        <h3>扣分分值：2</h3>
        <p>问题描述：</p>
        <textarea cols="30" rows="5"></textarea>
      </div>

      <div class="adddetail-view-upload">
        <h3>图片证明：</h3>
        <div class="adddetail-view-upload-img">
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
            <uploadimg class="showimg" :fileURL="uploadUrl" @primary-imgUrl="getImgUrl"></uploadimg>
          </div>
        </div>
        <p>为了更好的记录问题，请务必上传照片，最多3张，每张大小不得超过5M，支持JPG/PMP/PNG格式！</p>
      </div>
    </div>
    <div class="adddetail-btn">
      <div class="adddetail-btn-cancel">取消</div>
      <div class="adddetail-btn-confirm">确定</div>
    </div>
  </div>
</template>

<script>
import uploadimg from '../common/uploadimg.vue'
export default {
  name: 'adddetail',
  data() {
    return {
      uploadUrl: this.config.baseserverURI + this.config.getImgUrlAPI
    }
  },
  components: { uploadimg },
  methods: {
    imgRemove() {},
    getImgUrl() {}
  }
}
</script>

<style lang="less" scoped>
.adddetail {
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
    font-size: 0.96rem/2;
    font-weight: 600;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    div {
      flex: 1;
      height: 2.6133rem/2;
      line-height: 2.6133rem/2;
      text-align: center;
    }
    &-cancel {
      border-top: 1px solid #e6e6e6;
      color: #999;
      background-color: #fff;
    }
    &-confirm {
      color: #fff;
      background-color: #26a2ff;
    }
  }
}
</style>
