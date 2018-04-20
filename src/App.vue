<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div>{{time|toYMD}}</div>
    <div @click="getTime">{{time|toDateTime}}</div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      time: Date.now()
    }
  },
  computed: {
  },
  watch: {
    time : function (val) {
      this.time = val
    }
  },
  methods: {
    getTime () {
      this.time = Date.now()
    }
  },
  mounted() {
    this.$api.get(this.$config.baseserverURI + this.$config.baseAPi, {vars: {"action":"systemmessage_list_get","userid":"1","pagenum":"1"}})
    .then(res => {
      console.log(res, 'eqweqweqwew')
    })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
