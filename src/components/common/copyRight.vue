<template>
  <div id="copyRight">
    <div>
      <!--<p v-html="'版权所有©' + appName + '&nbsp;&nbsp;技术支持©深传互动'"></p>-->
      <p v-html="'版权所有©罗湖区城市管理局&nbsp;&nbsp;技术支持©深传互动'"></p>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'copyRight',
    data () {
      return {
        appName: this.$store.state.appName || '',
        systemAuthor:this.$store.state.systemAuthor || '',
      }
    },
    mounted: function () {
      if(this.appName == ''){
        this.getcopyright()
      }
    },
    methods: {
      getcopyright () {
        let v = this
        v.$api.get(v.config.baseserverURI + v.config.getAdminExtConfigAPI)
          .then(function (json) {
            if(json.data.errcode == '0000') {
              let data = json.data.data
              v.systemAuthor = '深传互动'
              v.$store.state.systemAuthor = '深传互动'
              data.forEach(item => {
                if(item.key.label == 'mobile_config_copyright') {
                  v.appName = item.value
                  v.$store.state.appName = item.value
                  v.systemAuthor = json.data.data.systemAuthor
                  v.$store.state.systemAuthor = json.data.data.systemAuthor
                }
              })
            }
          })
      }
    }
  }
</script>

<style scoped lang="less">
  #copyRight p{
    text-align: center;
    font-size: 3vw;
    margin-top:10px;
    margin-bottom:10px;
    span{
      font-size: 3vw;
      display: inline-block;
      width: 2rem;
      text-align: left;
    }
    img{
      vertical-align: middle;
      width: .3rem;
    }
  }
</style>
