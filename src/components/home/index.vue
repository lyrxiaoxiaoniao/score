<template>
  <div class="home">
    <div class="home-banner">
      <mt-swipe :auto="2000">
        <mt-swipe-item v-for="(item, index) in sliderList" :key="index">
          <img :src="item" alt="banner">
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
      <div @click="jumpDataCenter" class="home-nav-item">
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
        <div @click="jumpToClassify('最新通知', CategotyFirstDataId)" class="home-content-item_header">
          <div class="home-content-item_header_left"><i></i>最新通知</div>
          <div class="home-content-item_header_right">更多<i></i></div>
        </div>

        <div class="home-content-item_container">

          <div @click="jumpArticle(item.id)" v-for="item in newData" :key="item.id" class="home-content-item_container_show">
            <div class="home-content-item_container_show_img">
              <img v-if="item.picture" :src="item.picture">
              <img v-else="" src="http://placehold.it/70x70" alt="图片">
            </div>
            <div class="home-content-item_container_show_text">
              <div class="show-text-top">
                {{item.title}}
              </div>
              <div class="show-text-bottom">
                <span class="show-text-bottom-click">点击：{{ item.click ? item.click :  0}}</span>
                <span class="show-text-bottom-time">{{ item.created_at | toDateTime }}</span>
              </div>
            </div>
          </div>

          <!-- <div class="home-content-item_container_show">
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
          </div> -->

        </div>
      </div>
    </div>
    <loading :is-show="loadingData"></loading>
    <copy-right></copy-right>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import loading from '../common/loading'
import copyRight from '../common/copyRight';
export default {
  name: 'home',
  data() {
    return {
      sliderList: ['./static/images/home/banner.png'],
      newData: [],
      CategotyFirstDataId: null,
      categoryListCurrentPage: 0,
      loadingData: false
    }
  },
  components: { loading, copyRight },
  mounted() {
    // this.getBanner()
    this.getCategoryList()

    this.$LToast(
      '测试连接，我就是要测试，你把我怎样',
      'warn',
      {
        showCancel: true,
        confirmButtonText: 'ceshi',
        cancelButtonText: '请问去'
      },
      () => {
        console.log('点击确定')
      }
    )
  },
  methods: {
    toTask() {
      this.$router.push('/task')
    },
    jumpDataCenter() {
      Toast('数据中心待开放中，敬请期待')
    },
    jumpToClassify(name, id) {
      location.href = this.config.baseserverURI + '/app/cms/index.html?scid=' + sessionStorage.scid + '#/classify?name=' + name + '&id=' + id
    },
    jumpArticle(id) {
      location.href = this.config.baseserverURI + '/app/cms/index.html?scid=' + sessionStorage.scid + '#/Article?id=' + id
    },
    getCategotyFirstDataList: function(id) {
      let v = this
      v.loadingData = true
      let params = {
        currentPage: 1,
        pageSize: 5,
        category_id: id
      }
      v.$api
        .get(v.config.baseserverURI + v.config.getNcmsArticleIndexAPI, params)
        .then(function(json) {
          v.loadingData = false
          if (json.data.errcode == '0000') {
            if (json.data.data.data.length > 0) {
              v.newData = json.data.data.data
            }
          }
        })
        .catch(function() {})
    },
    getCategoryList: function() {
      // 普通栏目列表------------------------------------------------------------------------------
      let v = this
      v.loadingData = true
      v.categoryListCurrentPage++
      v.$api
        .get(v.config.baseserverURI + v.config.getNcmsCategoryIndexAPI, {
          pageSize: 10,
          currentPage: v.categoryListCurrentPage,
          rank: 'DESC'
        })
        .then(function(json) {
          if (json.data.errcode == '0000') {
            let data = json.data.data.data
            if (data && data.length > 0) {
              data.forEach(function(item) {
                if (item.display_name.indexOf('最新通知') > -1) {
                  v.getCategotyFirstDataList(item.id)
                  v.CategotyFirstDataId = item.id
                }
              })
            } else {
              v.loadingData = false
            }
          }
        })
        .catch(function() {})
    },
    getBanner: function () {
      let v = this
      v.loadingData = true
      v.$api.get(v.config.baseserverURI + v.config.getBannerAPI,{
        slug: v.$slug[sessionStorage.scid].team
      })
        .then(function (json) {
          v.loadingData = false
          let imgSrcArr = []
          let data = json.data.data
          for(let i = 0;i < data.length; i ++){
            let imgSrco = {}
            imgSrco.imgSrc = data[i].poster
            imgSrco.link = data[i].memo
            imgSrcArr.push(imgSrco)
          }
          for(let key in imgSrcArr){
            v.sliderList.push(imgSrcArr[key])
          }
        }).catch(function () {
      })
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
