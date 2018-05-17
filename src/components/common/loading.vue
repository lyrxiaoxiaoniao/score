<template>
  <div id="loading">
    <div class="mint-indicator" v-show="isShow"  style="/* display: none; */">
      <div class="mint-indicator-wrapper" style="padding: 15px;">
        <span class="mint-indicator-spin">
          <div class="mint-spinner-snake" style="border-top-color: rgb(204, 204, 204); border-left-color: rgb(204, 204, 204); border-bottom-color: rgb(204, 204, 204); height: 32px; width: 32px;"></div>
        </span>
        <span class="mint-indicator-text" style="display: none;"></span>
      </div>
      <div class="mint-indicator-mask"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'loading',
    data () {
      return {

      }
    },
    props: [
      'isShow'
    ],
    mounted: function () {

    },
    methods: {

    }
  }
</script>

<style scoped lang="less">
  #loading {
    @-webkit-keyframes mint-spinner-rotate{
      0%{
        -webkit-transform:rotate(0deg);transform:rotate(0deg)
      }to{
           -webkit-transform:rotate(1turn);transform:rotate(1turn)
         }
    }
    @keyframes mint-spinner-rotate{
      0%{
        -webkit-transform:rotate(0deg);
        transform:rotate(0deg)
      }to{
           -webkit-transform:rotate(1turn);
           transform:rotate(1turn)
         }
    }
    .mint-indicator {
      -webkit-transition: opacity .2s linear;
      transition: opacity .2s linear;
      .mint-indicator-wrapper {
        z-index: 99999;
        top: 50%;
        left: 50%;
        position: fixed;
        -webkit-transform: translate(-50%,-50%);
        transform: translate(-50%,-50%);
        border-radius: 5px;
        background: rgba(0,0,0,.7);
        color: #fff;
        box-sizing: border-box;
        text-align: center;
        .mint-indicator-spin {
          display: inline-block;
          text-align: center;
          .mint-spinner-snake {
            -webkit-animation: mint-spinner-rotate .8s infinite linear;
            animation: mint-spinner-rotate .8s infinite linear;
            border: 4px solid transparent;
            border-radius: 50%;
          }
        }
        .mint-indicator-text {
          display: block;
          color: #fff;
          text-align: center;
          margin-top: 10px;
          font-size: 16px;
        }
      }
    }
  }
</style>
