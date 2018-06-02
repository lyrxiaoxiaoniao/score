<template>
  <div class="village">
    <mt-header fixed title="考核记录">
      <mt-button @click="toBack" icon="back" slot="left"></mt-button>
    </mt-header>
    <div class="village-tab">
      <div @tap="handclick(0)" class="village-tab-item" :class="{'active' : isFocus === 0}">
        <span>全部</span>
      </div>
      <div @tap="handclick(1)" class="village-tab-item" :class="{'active' : isFocus === 1}">
        <span>进行中</span>
      </div>
      <div @tap="handclick(2)" class="village-tab-item" :class="{'active' : isFocus === 2}">
        <span>已完成</span>
      </div>
    </div>
    <div v-show="taskDetail" class="village-header">
      <div class="village-header-item">
        <span>考核任务：</span>{{taskDetail.name}}
        <div class="village-header-item_badge">
          <div class="badge-item-pray">
            <i></i>
            已考核社区：5
          </div>
        </div>
      </div>
      <div class="village-header-item">
        <span>考核时间：</span>{{taskDetail.beginTime | toYMDhm}} 至 {{taskDetail.endTime | toYMDhm}}
      </div>
    </div>
    <div class="village-top">
      考核小区
    </div>

    <mt-loadmore v-if="dataList" :bottom-method="loadBottom" :auto-fill = autofill :bottom-all-loaded="allLoaded" ref="loadmore">
      <div class="village-content">

        <div v-for="item in dataList.content" :key="item.id" class="village-content-item">
          <div class="content-img">
            <img src="http://placehold.it/70x870" alt="">
          </div>
          <div class="content-text">
            <p class="content-text-title">{{item.community.name}}</p>
            <p class="content-text-memo"> <i class="mui-icon mui-icon-location"></i> {{item.community.detailAddress}}</p>
            <p class="content-text-memo"> <i class="mui-icon mui-icon-phone"></i> {{item.community.phone}}</p>
          </div>
          <div @click="toDetail(item)" class="content-badge">
            <div :class="item.userAccessStatus ? (item.userAccessStatus === 1 ? 'badge-item-red' : 'badge-item-blue') : 'badge-item-red'">
              <i></i>{{item.userAccessStatus ? (item.userAccessStatus === 1 ? '正在考核' : '考核详情') : '马上考核'}}
            </div>
          </div>
          <i :class="item.userAccessStatus ? (item.userAccessStatus === 1 ? 'content-rate-red2' : 'content-rate-blue') : 'content-rate-red'"></i>
        </div>

      </div>
    </mt-loadmore>
    <div>
      <not-data :isshowimg="isshowNodata" :isshowtext="allLoaded"></not-data>
    </div>
    <loading :is-show="loadingData"></loading>
    <copy-right></copy-right>
  </div>
</template>

<script>
import copyRight from '../common/copyRight.vue'
import notData from '../common/notData.vue'
import loading from '../common/loading.vue'
export default {
  name: 'village',
  data() {
    return {
      isFocus: 0,
      dataList: null,
      taskDetail: JSON.parse(sessionStorage.getItem('taskDetail')),
      autofill: false,
      allLoaded: false, // 是否全部加载完成
      isshowNodata: false, // 显示是否有数据
      loadingData: true, // loading
      param: {
        taskId: this.$route.query.taskId || null,
        size: 10,
        page: 0,
        key: '',
        userAccessStatus: null // 用户评审状态 不传是全部 0.未开始 1.进行中 2.已完成
      }
    }
  },
  components: { copyRight, notData, loading },
  mounted() {
    this.getList()
  },
  methods: {
    toBack() {
      if (this.$store.state.routerchange) {
        this.$router.back()
      } else {
        this.$router.replace('/')
      }
    },
    toDetail(item) {
      sessionStorage.setItem('communityDetail', JSON.stringify(item))
      sessionStorage.setItem('tcId', JSON.stringify(item.id))
      if (item.userAccessStatus === 2) {
        this.$router.push({
          path: '/editdetail',
          query: { communityId: item.id }
        })
      } else {
        this.$router.push({
          path: '/edittask',
          query: { communityId: item.id }
        })
      }
    },
    loadBottom() {
      this.getList('down')
      this.$refs.loadmore.onBottomLoaded()
    },
    handclick(type) {
      this.isFocus = type
      if (type === 0) {
        this.getDefaultPsram()
        this.getList()
      }
      if (type === 1) {
        this.getDefaultPsram()
        this.param.userAccessStatus = 1
        this.getList()
      }
      if (type === 2) {
        this.getDefaultPsram()
        this.param.userAccessStatus = 2
        this.getList()
      }
    },
    getDefaultPsram() {
      this.param = {
        taskId: this.$route.query.taskId || null,
        size: 10,
        page: 0,
        key: '',
        userAccessStatus: null // 用户评审状态 不传是全部 0.未开始 1.进行中 2.已完成
      }
    },
    toEditTask(id) {
      this.$router.push({
        path: '/village',
        query: { taskId: id }
      })
    },
    getList(type) {
      // 状态初始化
      this.allLoaded = false
      this.isshowNodata = false

      if (type === 'down') {
        this.param.page += 1
      }
      this.$api
        .get(this.config.baseserverURI + this.config.task.list, this.param)
        .then(res => {
          if (res.data.errcode === '0000') {
            this.loadingData = false
            const response = res.data.data
            if (this.param.page !== 0 && !response.content.length) {
              this.allLoaded = true
            }
            if (!response.content.length && this.param.page === 0) {
              this.isshowNodata = true
            }
            if (this.param.page !== 0 && response.content.length) {
              this.dataList.content = this.dataList.content.concat(
                response.content
              )
            } else if (this.param.page === 0) {
              this.dataList = res.data.data
            }
          }
          // console.log(this.dataList)
        })
    }
  }
}
</script>

<style lang="less" scoped>
.village {
  padding-top: 1.1733rem;
  // padding-top: 40px;
  &-tab {
    background-color: #fff;
    height: 1.1733rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #e6e6e6;
    &-item {
      width: 33.3333%;
      height: 1.1733rem;
      line-height: 1.1733rem;
      text-align: center;
      span {
        border-left: 1px solid #e6e6e6;
        display: inline-block;
        width: 100%;
        color: #333;
      }
    }
    &-item.active {
      position: relative;
      &::after {
        position: absolute;
        left: 50%;
        margin-left: -1.8667rem/2;
        bottom: 0;
        display: block;
        content: '';
        width: 1.8667rem;
        height: 0.08rem;
        background-color: #1e9bff;
      }
      span {
        color: #1e9bff;
      }
    }
  }
  &-header {
    background-color: #fff;
    padding: 0 0.2667rem;
    &-item {
      position: relative;
      height: 1.1733rem;
      line-height: 1.1733rem;
      font-size: 0.3733rem;
      color: rgb(153, 153, 153);
      border-bottom: 1px solid #e6e6e6;
      span {
        font-size: 0.3733rem;
        color: rgb(102, 102, 102);
      }
      &_badge {
        position: absolute;
        top: 0.4267rem/2;
        right: 0;
      }
    }
  }
  &-top {
    margin-top: 0.2667rem;
    padding: 0.2667rem;
    background-color: #fff;
    font-size: 0.3467rem;
    color: rgb(96, 96, 96);
    border-top: 1px solid #e6e6e6;
    border-bottom: 1px solid #e6e6e6;
  }
  &-content {
    padding: 0 0.2667rem;
    background-color: #fff;
    &-item {
      position: relative;
      border-bottom: 1px solid #e6e6e6;
      padding: 0.2667rem 0;
      width: 100%;
      height: 2.4rem;
      display: flex;
      justify-content: flex-start;
      .content-img {
        width: 1.8667rem;
        height: 1.8667rem;
        margin-right: 0.2667rem;
        img {
          width: 1.8667rem;
          height: 1.8667rem;
        }
      }
      .content-text {
        flex: 1;
        &-title {
          font-size: 0.48rem;
          color: rgb(51, 51, 51);
        }
        &-memo {
          font-size: 0.3467rem;
          color: rgb(102, 102, 102);
          i {
            font-size: 15px;
          }
        }
      }
      .content-badge {
        position: absolute;
        bottom: 0.2667rem;
        right: 0;
      }
      .content-rate-red {
        position: absolute;
        display: inline-block;
        top: 0;
        right: -0.2667rem;
        width: 1.1733rem;
        height: 1.1733rem;
        background: url('../../../static/images/task/img_daikaohe.png')
          no-repeat center/cover;
      }
      .content-rate-red2 {
        position: absolute;
        display: inline-block;
        top: 0;
        right: -0.2667rem;
        width: 1.1733rem;
        height: 1.1733rem;
        background: url('../../../static/images/task/img_kaohezhong.png')
          no-repeat center/cover;
      }
      .content-rate-blue {
        position: absolute;
        display: inline-block;
        top: 0;
        right: -0.2667rem;
        width: 1.1733rem;
        height: 1.1733rem;
        background: url('../../../static/images/task/img_yikaohe.png') no-repeat
          center/cover;
      }
    }
  }
  .badge-item-pray {
    position: relative;
    height: 1.4933rem/2;
    line-height: 1.4933rem/2;
    border: 1px solid #e6e6e6;
    border-radius: 5px;
    padding: 0 0.2667rem 0 0.7467rem;
    color: rgb(153, 153, 153);
    font-size: 0.32rem;
    i {
      position: absolute;
      top: 0.1867rem;
      left: 0.2667rem;
      display: inline-block;
      background: url('../../../static/images/task/icon_yjkh.png') no-repeat
        center/cover;
      width: 0.7467rem/2;
      height: 0.7467rem/2;
    }
  }
  .badge-item-red {
    position: relative;
    height: 1.4933rem/2;
    line-height: 1.4933rem/2;
    border: 1px solid rgb(255, 62, 80);
    border-radius: 5px;
    padding: 0 0.2667rem 0 0.7467rem;
    color: rgb(255, 62, 80);
    font-size: 0.32rem;
    i {
      position: absolute;
      top: 0.1867rem;
      left: 0.2667rem;
      display: inline-block;
      background: url('../../../static/images/task/icon_mskh.png') no-repeat
        center/cover;
      width: 0.7467rem/2;
      height: 0.7467rem/2;
    }
  }
  .badge-item-blue {
    position: relative;
    height: 1.4933rem/2;
    line-height: 1.4933rem/2;
    border: 1px solid rgb(30, 155, 255);
    border-radius: 5px;
    padding: 0 0.2667rem 0 0.7467rem;
    color: rgb(30, 155, 255);
    font-size: 0.32rem;
    i {
      position: absolute;
      top: 0.1867rem;
      left: 0.2667rem;
      display: inline-block;
      background: url('../../../static/images/task/icon_khxq.png') no-repeat
        center/cover;
      width: 0.7467rem/2;
      height: 0.7467rem/2;
    }
  }
}
</style>
