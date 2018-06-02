<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {}
  },
  created() {
    sessionStorage.setItem('scid', this.getQueryString('scid'))
  },
  watch: {
    $route: function() {
      this.$store.state.routerchange = true
    }
  },
  methods: {
    getQueryString(name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
      var r = window.location.search.substr(1).match(reg)
      if (r != null) return unescape(r[2])
      return null
    }
  }
}
</script>

<style>
#app {
  height: 100%;
  width: 100%;
}
</style>
<style lang="less">
.mint-header{
  // background-color: #fff;
  // color: #000;
  height: 1.1733rem;
}
header{
  background-color: #26a2ff !important;
  h1{
    color: #fff !important;
  }
}
a {
    text-decoration: none;
    color: #fff;
}
</style>
