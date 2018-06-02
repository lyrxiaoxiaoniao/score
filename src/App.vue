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
