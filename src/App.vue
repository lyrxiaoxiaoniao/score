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
  watch: {
    '$route': function () {
      this.$store.state.routerchange = true
    }
  },
}
</script>

<style>
#app {
  height: 100%;
  width: 100%;
}
</style>
