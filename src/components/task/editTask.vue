<template>
  <div class="edittask">
    <mt-header fixed title="物业服务企业考核">
      <mt-button icon="back" slot="left"></mt-button>
      <mt-button slot="right">提交</mt-button>
    </mt-header>
    <div class="edittask-header">
      <div class="edittask-header_img">
        <img src="http://placehold.it/36x36" alt="">
      </div>
      <div class="edittask-header_text">
        <p>考核任务：2018年4月到5月份考核</p>
        <p>考核小区：鑫源小区</p>
      </div>
    </div>
    <ul class="mui-table-view">
        <li class="mui-table-view-cell mui-collapse">
            <a class="mui-navigate-right" href="#">环境卫生（20分）</a>
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
                  <span @click="koufen" class="edittask-view-footer_right">扣分</span>
                </div>
              </div>

            </div>
        </li>
        <li class="mui-table-view-cell mui-collapse">
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
        </li>
        <li class="mui-table-view-cell mui-collapse">
            <a class="mui-navigate-right" href="#">治安管理（20分）</a>
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
        </li>
        <li class="mui-table-view-cell mui-collapse">
            <a class="mui-navigate-right" href="#">物业管理（20分）</a>
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
        </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'edittask',
  methods: {
    koufen() {
      this.$router.push('/newdetail')
    }
  }
}
</script>

<style lang="less" scoped>
.edittask {
  padding-top: 40px;
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
