<template>
  <div class="home">
    <div class="home-banner">
      <mt-swipe :auto="2000">
        <mt-swipe-item>
          <img src="static/images/home/banner.png" alt="banner">
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="home-nav">
      <div @click="toTask" class="home-nav-item">
        <div class="home-nav-item_img">
          <img src="static/images/home/icon_kaohe.png" alt="">
        </div>
        <div class="home-nav-item_text">考核</div>
      </div>
      <div class="home-nav-item">
        <div class="home-nav-item_img">
          <img src="static/images/home/icon_data.png" alt="">
        </div>
        <div class="home-nav-item_text">数据中心</div>
      </div>
      <div class="home-nav-item">
        <div class="home-nav-item_img">
          <img src="static/images/home/icon_my.png" alt="">
        </div>
        <div class="home-nav-item_text">我的</div>
      </div>
    </div>
    <div class="home-content">
      <div class="home-content-item">
        <div class="home-content-item_header">
          <div class="home-content-item_header_left"><i></i>最新通知</div>
          <div class="home-content-item_header_right">更多<i></i></div>
        </div>

        <div class="home-content-item_container">

          <div class="home-content-item_container_show">
            <div class="home-content-item_container_show_img">
              <img src="http://placehold.it/70x70" alt="图片">
            </div>
            <div class="home-content-item_container_show_text">
              <div class="show-text-top">
                关于在各街道社区实行大件垃圾分类管理执行的最新通知-关于2018-05-22 15:12:00
              </div>
              <div class="show-text-bottom">
                <span class="show-text-bottom-click">点击：100</span>
                <span class="show-text-bottom-time">2018-05-22</span>
              </div>
            </div>
          </div>

          <div class="home-content-item_container_show">
            <div class="home-content-item_container_show_img">
              <img src="http://placehold.it/70x70" alt="图片">
            </div>
            <div class="home-content-item_container_show_text">
              <div class="show-text-top">
                关于在各街道社区实行大件垃圾分类管理执行的最新通知-关于2018-05-22 15:12:00
              </div>
              <div class="show-text-bottom">
                <span class="show-text-bottom-click">点击：100</span>
                <span class="show-text-bottom-time">2018-05-22</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  mounted() {},
  methods: {
    toTask() {
      this.$router.push('/task')
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  width: 100%;
  &-banner {
    height: 8rem/2;
    border-bottom: 1px solid #e6e6e6;
    img {
      width: 100%;
      height: 8rem/2;
    }
  }
  &-nav {
    height: 4.8rem/2;
    background-color: #fff;
    display: flex;
    justify-content: center;
    border-bottom: 1px solid #e6e6e6;
    &-item {
      width: 33.333%;
      display: flex;
      align-items: center;
      flex-direction: column;
      &_img {
        margin-top: 1.0667rem/2;
        height: 2.3467rem/2;
        img {
          width: 2.3467rem/2;
          height: 2.3467rem/2;
        }
      }
      &_text {
        font-size: 0.7467rem/2;
        color: #333;
      }
    }
  }
  &-content {
    margin-top: 0.5333rem/2;
    border: 1px solid #e6e6e6;
    background-color: #fff;
    &-item {
      &_header {
        height: 1.92rem/2;
        padding: 0 0.5333rem/2;
        border-bottom: 1px solid #e6e6e6;
        &_left {
          position: relative;
          float: left;
          line-height: 1.92rem/2;
          font-size: 0.7467rem/2;
          font-weight: 600;
          color: rgb(102, 102, 102);
          padding-left: 0.8533rem/2;
          i {
            position: absolute;
            top: 0.5333rem/2;
            left: 0;
            display: inline-block;
            width: 0.8533rem/2;
            height: 0.8533rem/2;
            background: url(../../../static/images/home/icon_newmsg.png)
              no-repeat center/cover;
          }
        }
        &_right {
          position: relative;
          float: right;
          line-height: 1.92rem/2;
          font-size: 0.7467rem/2;
          font-weight: 600;
          color: rgb(153, 153, 153);
          padding-right: 0.8rem/2;
          i {
            position: absolute;
            top: 0.5333rem/2;
            right: 0;
            display: inline-block;
            width: 0.48rem/2;
            height: 0.8533rem/2;
            background: url(../../../static/images/home/icon_more.png) no-repeat
              center/cover;
          }
        }
      }
      &_container {
        padding: 0 0.5333rem/2;
        &_show {
          & + & {
            border-top: 1px solid #e6e6e6;
          }
          padding: 0.5333rem/2 0;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          &_img {
            margin-right: 0.5333rem/2;
            height: 1.8667rem;
            width: 1.8667rem;
            img {
              height: 1.8667rem;
              width: 1.8667rem;
            }
          }
          &_text {
            flex: 1;
            height: 1.8667rem;
            display: flex;
            flex-direction: column;
            .show-text-top {
              color: #333;
              font-size: 0.8533rem/2;
              font-weight: 600;
              line-height: 1.2;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
            }
            .show-text-bottom {
              flex: 1;
              color: rgb(153, 153, 153);
              font-size: 0.7467rem/2;
              position: relative;
              &-click {
                position: absolute;
                bottom: 0;
                left: 0;
              }
              &-time {
                position: absolute;
                bottom: 0;
                right: 0;
              }
            }
          }
        }
      }
    }
  }
}
</style>
