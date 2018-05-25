<template>
  <div class="task">
    <mt-header fixed title="考核任务">
      <mt-button icon="back" slot="left"></mt-button>
    </mt-header>
    <div class="task-tab">
      <div @tap="handclick(0)" class="task-tab-item" :class="{'active' : isFocus === 0}">
        <span>全部</span>
      </div>
      <div @tap="handclick(1)" class="task-tab-item" :class="{'active' : isFocus === 1}">
        <span>进行中</span>
      </div>
      <div @tap="handclick(2)" class="task-tab-item" :class="{'active' : isFocus === 2}">
        <span>已完成</span>
      </div>
    </div>
    <mt-loadmore v-if="dataList" :bottom-method="loadBottom" :auto-fill = autofill :bottom-all-loaded="allLoaded" ref="loadmore">
      <div class="task-container">
        <div @click="toEditTask(item.task)" v-for="item in dataList.content" :key="item.id" class="task-container-item">
          {{item.task.name}}
          <i></i>
        </div>
        <!-- <div @click="toEditTask" class="task-container-item">
          2018年5月到6月份考核
          <i></i>
        </div>
        <div @click="toEditTask" class="task-container-item">
          2018年6月到7月份考核
          <i></i>
        </div>
        <div @click="toEditTask" class="task-container-item">
          2018年7月到8月份考核
          <i></i>
        </div> -->
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
  name: 'task',
  data() {
    return {
      isFocus: 0,
      dataList: null,
      autofill: false,
      allLoaded: false, // 是否全部加载完成
      isshowNodata: false, // 显示是否有数据
      loadingData: true, // loading
      param: {
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
        size: 10,
        page: 0,
        key: '',
        userAccessStatus: null // 用户评审状态 不传是全部 0.未开始 1.进行中 2.已完成
      }
    },
    toEditTask(data) {
      sessionStorage.setItem('taskDetail', JSON.stringify(data))
      this.$router.push({
        path: '/village',
        query: { taskId: data.id }
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
        })
    }
  }
}
</script>

<style lang="less" scoped>
.task {
  padding-top: 40px;
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
  &-container {
    border-bottom: 1px solid #e6e6e6;
    background: #fff;
    &-item {
      & + & {
        border-top: 1px solid #e6e6e6;
      }
      position: relative;
      padding: 0 0.5333rem/2;
      height: 2.3467rem/2;
      line-height: 2.3467rem/2;
      color: #333;
      font-size: 0.8533rem/2;
      i {
        position: absolute;
        top: 0.8rem/2;
        right: 0.5333rem/2;
        display: inline-block;
        width: 0.48rem/2;
        height: 0.8533rem/2;
        background: url(../../../static/images/home/icon_more.png) no-repeat
          center/cover;
      }
    }
  }
}
</style>
