<template>
  <div class="edittask">
    <mt-header fixed title="物业服务企业考核">
      <mt-button @click="toBack" icon="back" slot="left"></mt-button>
      <mt-button @click="onSubmit" slot="right">提交</mt-button>
    </mt-header>
    <div class="edittask-header">
      <div class="edittask-header_img">
        <img src="http://placehold.it/36x36" alt="">
      </div>
      <div class="edittask-header_text">
        <p>考核任务：{{communityDetail.task.name}}</p>
        <p>考核小区：{{communityDetail.community.name}}</p>
      </div>
    </div>
    <ul v-show="dataList" class="mui-table-view">
        <li @tap="showItem(index)" v-for="(rules, index) in dataList" :key="rules.id" class="mui-table-view-cell mui-collapse">
          <a class="mui-navigate-right" href="#">{{rules.displayName}}</a>
          <div class="mui-collapse-content">

            <div v-show="rules.items.length" v-for="item in rules.items" :key="item.id" class="edittask-view">
              <div class="edittask-view-item">
                <h3>考核内容：</h3>
                <!-- <p>无违反规划新增私搭乱建，无擅自改变房屋用途现象（2分）</p> -->
                <p>{{item.content}} ({{item.score}}分)</p>
              </div>
              <div class="edittask-view-item">
                <h3>考核标注：</h3>
                <!-- <p>有新建的，修改的扣2分</p> -->
                <p>{{item.standard}} ({{item.deducte}}分)</p>
              </div>
              <div class="edittask-view-footer">
                <span class="edittask-view-footer_left">当前扣分：{{showItemDetail[item.id] ? showItemDetail[item.id].length * item.deducte : 0}}分</span>
                <span @click="koufen(item, rules.displayName)" class="edittask-view-footer_right">扣分</span>
              </div>
            </div>

            <div v-show="!rules.items.length" class="edittask-view">
              暂无考核内容！
            </div>

          </div>
        </li>

        <!-- <li class="mui-table-view-cell mui-collapse">
            <a class="mui-navigate-right" href="#">安全管理（20分）</a>
            <div class="mui-collapse-content">

              <div class="edittask-view">
                <div class="edittask-view-item">
                  <h3>考核内容：</h3>
                  <p>无违反规划新增私搭乱建，无擅自改变房屋用途现象（2分）</p>
                </div>
                <div class="edittask-view-item">
                  <h3>考核标注：</h3>
                  <p>有新建的，修改的扣2分</p>
                </div>
                <div class="edittask-view-footer">
                  <span class="edittask-view-footer_left">当前扣分：2分</span>
                  <span class="edittask-view-footer_right">扣分</span>
                </div>
              </div>

            </div>
        </li> -->

    </ul>
    <copy-right></copy-right>
  </div>
</template>

<script>
import copyRight from '../common/copyRight'
export default {
  name: 'edittask',
  data() {
    return {
      communityDetail:
        JSON.parse(sessionStorage.getItem('communityDetail')) || null,
      dataList: null,
      param: {
        taskId: sessionStorage.getItem('taskId'),
        status: 1,
        size: 1000,
        page: 0,
        key: ''
      },
      paramDetail: {
        tcId: JSON.parse(sessionStorage.getItem('tcId')) || '',
        itemIds: []
      },
      submitParam: {
        tcId: JSON.parse(sessionStorage.getItem('tcId')) || '',
        userAccessStatus: 2
      },
      showItemsArr: [],
      showItemDetail: {}
    }
  },
  components: { copyRight },
  mounted() {
    this.getCategoryList()
  },
  methods: {
    onSubmit() {
      // {tcId: JSON.parse(sessionStorage.getItem('tcId')), userAccessStatus: 2}
      this.$LToast(
        '提交后，不能在进行修改哦 确认提交',
        'warn',
        true,
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        },
        () => {
          console.log('提交成功！')
          // this.$api
          //   .post(
          //     this.config.baseserverURI + this.config.task.update,
          //     this.submitParam
          //   )
          //   .then(res => {
          //     console.log('提交成功！')
          //   })
        }
      )
    },
    toBack() {
      if (this.$store.state.routerchange) {
        this.$router.back()
      } else {
        this.$router.replace('/')
      }
    },
    showItem(index) {
      if (this.handleClick(index)) {
        this.paramDetail.itemIds = []
        this.paramDetail.itemIds = this.dataList[index].items.map(v => {
          return v.id
        })
        if (!this.paramDetail.itemIds.length) {
          return
        }
        let paramdata =
          '?tcId=' +
          this.paramDetail.tcId +
          '&itemIds=' +
          this.paramDetail.itemIds.join('&itemIds=')
        console.log(paramdata, 'itemIds')
        this.$api
          .get(this.config.baseserverURI + this.config.score.index + paramdata)
          .then(res => {
            console.log(this.unique(res.data.data), 'cheshishuju1111111')
            this.showItemDetail = this.unique(res.data.data)
          })
      }
    },
    unique(arr) {
      let json = {}
      for (var i = 0; i < arr.length; i++) {
        if (!json[arr[i].itemId]) {
          json[arr[i].itemId] = []
          json[arr[i].itemId].push(arr[i])
        } else {
          json[arr[i].itemId].push(arr[i])
        }
      }
      return json
    },
    // 得到当前是哪个item展开,当前点击展开返回true,否则为false
    handleClick(index) {
      let isShow
      this.showItemsArr.forEach((v, i) => {
        if (i === index) {
          v.show = !v.show
          isShow = v.show
        } else {
          v.show = false
        }
      })
      return isShow
    },
    koufen(item, name) {
      sessionStorage.setItem('itemDetail', JSON.stringify(item))
      this.$router.push({
        path: '/newdetail',
        query: { itemId: item.id, name: name }
      })
    },
    getCategoryList() {
      this.$api
        .get(this.config.baseserverURI + this.config.task.class, this.param)
        .then(res => {
          if (res.data.errcode === '0000') {
            console.log(res.data.data, '123123')
            this.dataList = res.data.data.content
            this.dataList.forEach(v => {
              this.showItemsArr.push({ show: false })
            })
          }
        })
    }
  }
}
</script>

<style lang="less" scoped>
.edittask {
  padding-top: 1.1733rem;
  // padding-top: 40px;
  &-header {
    background-color: #fff;
    padding: 0.5333rem/2;
    display: flex;
    justify-content: flex-start;
    &_img {
      height: 0.96rem;
      width: 0.96rem;
      margin-right: 0.5333rem/2;
      img {
        height: 0.96rem;
        width: 0.96rem;
      }
    }
    &_text {
      flex: 1;
    }
  }
  &-view {
    & + & {
      margin-top: 0.2667rem;
    }
    background-color: #fff;
    padding: 0.8rem/2 0.5333rem/2;
    border: 1px solid #e6e6e6;
    border-radius: 0.1333rem;
    &-footer {
      margin-top: 0.2667rem;
      border-top: 1px solid #e6e6e6;
      height: 1.1733rem;
      &_left {
        margin-top: 0.8rem/2;
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
        margin-top: 0.8rem/2;
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
    }
  }
  .mui-table-view-cell:after {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0px;
    height: 1px;
    content: '';
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    background-color: #c8c7cc;
  }
}
</style>
