<template>
  <div class="map">
    <div class="searchWrapper">

      <header v-if="!showList" class="mui-bar mui-bar-nav reg-btn-back">
        <a @tap="aGoBack" href="javascript:;" class="mui-icon mui-icon-left-nav mui-pull-left"></a>
        <!--<a href="javascript:;" class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>-->
        <div @click="showSearch" class="searchBtn">
          <img src="static/img/mirror.png">
          <span class="text">搜索</span>
        </div>
        <button @tap="primaryMap" class="mui-btn mui-btn-link mui-pull-right">确定</button>
      </header>
      <div class="searchInput" v-else>
        <img src="static/img/arrow.png" @click="hideList">
        <div class="inputWrapper">
          <img src="static/img/mirror.png">
          <input type="text" placeholder="搜索地点" v-model="keyword" @click="stop">
        </div>
        <div class="btnWrapper" @click="search">搜索</div>
      </div>
    </div>
    <div class="mapWrapper" v-show="!showList" :style="$route.query.lng ? 'height:100%' : 'height:40%'">
      <div id="map"></div>
      <div class="marker">
        <img src="static/img/marker.png">
      </div>
    </div>
    <div class="searchList" v-show="!showList && !$route.query.lng">
      <div class="currentPosition" :class="{active: current.active}" @click="toCurrent">{{current.address}}</div>
      <div class="searchItem" v-for="(item, index) in current.surroundingPois" @click="moveTo(item.point, index)" :key="index" :class="{active: item.active}">
        <div class="item">{{item.title}}</div>
        <div class="address">{{item.address}}</div>
      </div>
    </div>
    <div class="mainSearchList" v-show="showList">
      <div class="searchItem" v-for="(item, index) in searchList" @click="clickTo(item.point, index)" :key="index" :class="{active: item.active}" v-if="searchList.length">
        <div class="item">{{item.title}}</div>
        <div class="address">{{item.address}}</div>
      </div>
      <div class="text" v-if="noResult">
        无搜索结果
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'map',
    data() {
      return {
        current: {},
        searchList: [],
        map: null,
        reSearch: true,
        showList: false,
        keyword: '',
        keywordPre: '',
        noResult: false,
        choosePoint: null
      }
    },
    props: [
      'mapChange'
    ],
    watch: {
      mapChange: function () {
        let address = this.$store.state.address
        let getPoint = this.$store.state.getPoint
        console.log('getPoint.isDefaultGet')
        console.log(getPoint.isDefaultGet)
        console.log(getPoint.active)
        console.log(getPoint.active && getPoint.firstActive && !getPoint.secondActive)
        console.log(getPoint.active && getPoint.firstActive && getPoint.secondActive)

        if(!getPoint.isDefaultGet) { // 初始获取地址
          if(address) {
            this.showSearch()
            this.keyword = address
            this.search()
            setTimeout(() => {
              console.log($(".mainSearchList .searchItem").eq(0))
              $(".mainSearchList .searchItem").eq(0).click()
              console.log($(".mainSearchList .searchItem").eq(0).find('.item').text())
            },1000)
          }
        }else if(getPoint.isDefaultGet){
          if(!getPoint.active) { // 初始获取地址之后的搜索列表再显示
            if(address) {
              this.showSearch()
              this.keyword = address
              this.search()
            }
          }else if(getPoint.active && getPoint.firstActive && !getPoint.secondActive) { // 第一次点击
            if(address) {
              this.showSearch()
              this.keyword = address
              this.search()
            }
          }
        }
      }
    },
    methods: {
      aGoBack: function () {
        if(this.$store.state.isChooseMap) {
          this.$store.state.isChooseMap = false
          this.$emit('hide-popup', false)
        }else {
          this.$router.back()
        }
      },
      primaryMap() {
        let v = this
        if(v.current.active){
          v.$store.state.address = v.current.address

        }else{
          for( let i = 0; i < v.current.surroundingPois.length; i ++){
            if(v.current.surroundingPois[i].active == true){
              console.log(v.current.surroundingPois[i].address)
              v.$store.state.address = v.current.surroundingPois[i].address
            }
          }
        }
        if(this.$store.state.isChooseMap) {
          this.$store.state.isChooseMap = false
          console.log('v.choosePoint')
          console.log(v.choosePoint)
          this.$emit('primary-btn', v.choosePoint)
        }else {
          v.$router.back()
        }
      },
      moveTo(point, index) {
        this.choosePoint = point
        this.current.active = false
        this.current.surroundingPois.forEach((i, j) => {
          i.active = false
        })
        this.current.surroundingPois[index].active = true
        this.map.clearOverlays()
        var myIcon = new BMap.Icon('static/img/current.png', new BMap.Size(15, 15), {
          imageSize: new BMap.Size(15, 15)
        })
        var marker = new BMap.Marker(point, { icon: myIcon })
        this.map.addOverlay(marker)
        this.map.panTo(point)
      },
      stop(e) {
        e.stopPropagation()
      },
      toCurrent() {
        this.current.active = true
        this.current.surroundingPois.forEach(i => {
          i.active = false
        })
        this.map.clearOverlays()
        this.map.panTo(this.current.point)
      },
      showSearch(e) {
//        e.stopPropagation()

        this.keyword = ''
        this.searchList = []
        this.showList = true
      },
      hideList(e) {
        e.stopPropagation()

        this.showList = false
      },
      search(e) {
//        e.stopPropagation()

        var that = this

        var options = {
          onSearchComplete: function (results) {
            // 判断状态是否正确

            console.log('results')
            console.log(results)

            if (local.getStatus() == BMAP_STATUS_SUCCESS) {

              if(that.searchList.length === 0 || that.keyword !== that.keywordPre) {
                for( var keyName in results) {
                  if(Object.prototype.toString.call(results[keyName])=='[object Array]' && results[keyName].length > 0) {
                    if(results[keyName][0].address) {
                      results[keyName].forEach(i => {
                        i.active = false
                      })
                      that.searchList = results[keyName]
                      that.keywordPre = that.keyword
                    }
                  }
                }
              }
              let address = that.$store.state.address

              let getPoint = that.$store.state.getPoint

              console.log('getPoint.isDefaultGet2222')
              console.log(getPoint.isDefaultGet)
              console.log(getPoint.active)
              console.log(getPoint.active && getPoint.firstActive && !getPoint.secondActive)
              console.log(getPoint.active && getPoint.firstActive && getPoint.secondActive)

              if(!getPoint.isDefaultGet) { // 初始获取地址
                if(address) {

                  console.log($(".mainSearchList .searchItem").eq(0))
                  $(".mainSearchList .searchItem").eq(0).click()
                  console.log($(".mainSearchList .searchItem").eq(0).find('.item').text())

                }
              }

            } else {
              that.searchList = []
              that.noResult = true
            }
          }
        };
        var local = new BMap.LocalSearch(this.map, options);
        local.search(this.keyword)
      },
      clickTo(point, index) {
        var that = this
        that.choosePoint = point
        let getPoint = that.$store.state.getPoint
        let address = that.$store.state.address

        if(!getPoint.isDefaultGet) { // 初始获取地址
          if(address) {
            console.log('clickTo!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
            console.log(point)
            that.$emit('primary-btn', point)
          }
        }
        this.current.active = false
        setTimeout(() => {
          this.showList = false
        }, 200)
        this.searchList.forEach((i, j) => {
          i.active = false
        })
        this.searchList[index].active = true
        this.map.clearOverlays()
        var myIcon = new BMap.Icon('static/img/current.png', new BMap.Size(15, 15), {
          imageSize: new BMap.Size(15, 15)
        })
        var marker = new BMap.Marker(point, { icon: myIcon })
        this.map.addOverlay(marker)
        setTimeout(() => {
          this.map.panTo(point)
        }, 500)


        var geo = new BMap.Geocoder()
        var option = {
          poiRadius: 1000,
          numPois: 12
        }

        geo.getLocation(point, (e) => {

          e.active = false

          e.surroundingPois.forEach(i => {
            i.active = false
          })
          that.current = e

          that.current.active = true
        }, option)

      },
    },
    mounted() {

      const that = this
      let address = this.$store.state.address
      let address1 = this.$store.state.address1
      console.log(address1)
      // 生成地图实例
      var map = new BMap.Map("map")
      this.map = map
      let lng = this.$route.query.lng ? this.$route.query.lng : 114.136912
      let lat = this.$route.query.lat ? this.$route.query.lat : 22.549828
//    map.centerAndZoom(new BMap.Point(114.136912, 22.549828), 15)
      map.centerAndZoom(new BMap.Point(lng, lat), 15)
			// 创建地址解析器实例
	   var myGeo = new BMap.Geocoder()
	   // 将地址解析结果显示在地图上,并调整地图视野
	   myGeo.getPoint(address1, function(point){
		 if (point) {
			 map.centerAndZoom(point, 15)
		 }
	   }, "深圳")
      map.enableScrollWheelZoom()
      // 搜索配置
      var geo = new BMap.Geocoder()
      var option = {
        poiRadius: 1000,
        numPois: 12
      }
      // 当前位置定位
      if(!this.$route.query.lng && !address) {
        var geolocation = new BMap.Geolocation()
        geolocation.getCurrentPosition(function (r) {
          if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            map.panTo(r.point)
            var myIcon = new BMap.Icon('static/img/point.png', new BMap.Size(15, 15), {
              imageSize: new BMap.Size(15, 15)
            })
            var marker = new BMap.Marker(r.point, { icon: myIcon, enableMassClear: false })
            map.addOverlay(marker)

            that.choosePoint = r.point

            console.log('当前位置定位')

            geo.getLocation(r.point, (e) => {
              e.active = false

              e.surroundingPois.forEach(i => {
                i.active = false
              })
              that.current = e
              that.current.active = true
            }, option)
          }
          else {
            alert('failed' + this.getStatus())
          }
        }, { enableHighAccuracy: true })
      }

      // 添加定位控件
      var navigationControl = new BMap.NavigationControl({
        anchor: BMAP_ANCHOR_TOP_LEFT,
        type: BMAP_NAVIGATION_CONTROL_SMALL,
        enableGeolocation: true
      });
      map.addControl(navigationControl)

      var geolocationControl = new BMap.GeolocationControl()

      geolocationControl.addEventListener("locationSuccess", function (e) {
        // 定位成功事件
        map.clearOverlays()
        geo.getLocation(e.point, (e) => {
          e.active = false

          e.surroundingPois.forEach(i => {
            i.active = false
          })
          that.current = e

          that.current.active = true
        }, option)
      })

      geolocationControl.addEventListener("locationError", function (e) {
        // 定位失败事件
        alert(e.message);
      })
      map.addControl(geolocationControl)

      // 监听地图拖动结束
      map.addEventListener("dragend", function (e) {   //鼠标拖动事件
        if(that.$route.query.lng) {
          var Point = new BMap.Point(that.$route.query.lng, that.$route.query.lat)

        }else {
          var Point = new BMap.Point(map.getCenter().lng, map.getCenter().lat)

        }

        geo.getLocation(Point, (e) => {
          e.active = false

          e.surroundingPois.forEach(i => {
            i.active = false
          })
          that.current = e

          that.current.active = true
        }, option)
      })

      if(JSON.parse(localStorage.userinfo).id == '111') {
        // alert(11111)
        // alert(that.$store.state.mapAddress)
      }

      // if(that.$store.state.mapAddress) {
      if(true) {
        if(JSON.parse(localStorage.userinfo).id == '111') {
          // alert(22222)
        }
        var options = {
          onSearchComplete: function (results) {
            // 判断状态是否正确
            if (local.getStatus() == BMAP_STATUS_SUCCESS) {
              if(JSON.parse(localStorage.userinfo).id == '111') {
                // alert(3333)
                // alert(that.searchList.length === 0)
                // alert(that.keyword !== that.keywordPre)
                // alert(that.searchList.length === 0 || that.keyword !== that.keywordPre)
              }
              if(that.searchList.length === 0 || that.keyword !== that.keywordPre) {
                if(JSON.parse(localStorage.userinfo).id == '111') {
                  // alert(44444)
                }
                for( var keyName in results) {
                  if(Object.prototype.toString.call(results[keyName])=='[object Array]' && results[keyName].length > 0) {
                    if(results[keyName][0].address) {
                      if(JSON.parse(localStorage.userinfo).id == '111') {
                        // alert(55555)
                      }
                      results[keyName].forEach(i => {
                        i.active = false
                      })
                      that.searchList = results[keyName]
                      that.keywordPre = that.keyword
                    }
                  }
                }
              }

              if(JSON.parse(localStorage.userinfo).id == '111') {
                // alert(that.searchList.length)
              }

            } else {
              that.searchList = []
              that.noResult = true
            }
          }
        };
        var local = new BMap.LocalSearch(that.map, options);
        local.search('翻身路四十五区')
//        local.search(this.$store.state.mapAddress)
      }else {

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  #g_send{
    .mui-bar-nav{
      top:10px;
    }
    .searchInput{
      top:9px;
    }
  }
  .map {
    .mui-bar-nav{
      .mui-pull-right{
        position: absolute;
        right:8px;
        color: #007aff;
      }
    }

    height: 100vh;
    position: relative;

    color: #454545;
    font-size: 14px;
    .searchWrapper {
      height: 35px;
      display: flex;
      justify-content: center;
      align-items: center;

      background-color: white;
      .searchBtn {
        width: 80%;
        height: 70%;
        display: flex;
        align-items: center;
        justify-content: center;

        background: lightgray;
        border-radius: 50px;
        margin-top: 7px;
        margin-left: .9rem;
        img {
          height: 70%;
        }
        .text {
          color: white;
        }
      }
      .searchInput {
        position: fixed;
        top: 0;
        height: 35px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 10px;

        background-color: #373a41;
        img {
          height: 70%;
        }
        .inputWrapper {
          height: 60%;
          width: 70%;
          position: relative;
          display: flex;
          align-items: center;

          border-bottom: 1px solid #1aac19;
          &::before {
            position: absolute;
            content: '';
            top: 25%;
            left: -10px;
            height: 60%;

            border-left: 1px solid #2e3138;
          }
          img {
            margin-right: 10px;
            object-fit: cover;
            height: 100%;
          }
          input {
            width: 90%;
            height: 100%;

            border: none;
            outline: none;
            background-color: #373a41;
            color: white;
            margin-bottom: 0;
            padding: 0;
          }
        }
        .btnWrapper {
          height: 80%;
          width: 50px;
          margin-right: 5px;
          display: flex;
          justify-content: center;
          align-items: center;

          background-color: #1aac19;
          color: white;
          font-size: 12px;
          border-radius: 3px;
        }
      }
    }
    .mapWrapper {
      position: relative;
      height: 40%;
      #map {
        height: 100%;
      }
      .marker {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -24px;
        margin-left: -10px;
      }
    }
    .searchList {
      height: 55%;
      overflow: scroll;
      .currentPosition {
        height: 55px;

        line-height: 55px;
        padding: 0 10px;
        border-bottom: 1px solid #e5e5e5;
      }
      .searchItem {
        height: 55px;
        display: flex;
        flex-direction: column;
        justify-content: center;

        padding: 0 40px 0 10px;
        border-bottom: 1px solid #e5e5e5;
        .address {
          font-size: 12px;
          color: #9a9a9a;
        }
      }
      .active {
        position: relative;
        &::after {
          content: '';
          position: absolute;
          width: 16px;
          height: 16px;
          display: block;
          box-sizing: border-box;
          top: 50%;
          right: 7px;
          margin-top: -8px;

          border-radius: 50px;
          border: 1px solid #38993a;
        }
        &::before {
          content: '';
          position: absolute;
          width: 10px;
          height: 10px;
          display: block;
          box-sizing: border-box;
          top: 50%;
          right: 10px;
          margin-top: -5px;

          border-radius: 50px;
          background-color: #22ab27;
        }
      }
    }
    .mainSearchList {
      /*@extend .searchList;*/
      height: 55%;
      overflow: scroll;
      .currentPosition {
        height: 55px;

        line-height: 55px;
        padding: 0 10px;
        border-bottom: 1px solid #e5e5e5;
      }
      .searchItem {
        height: 55px;
        display: flex;
        flex-direction: column;
        justify-content: center;

        padding: 0 40px 0 10px;
        border-bottom: 1px solid #e5e5e5;
        .address {
          font-size: 12px;
          color: #9a9a9a;
        }
      }
      .active {
        position: relative;
        &::after {
          content: '';
          position: absolute;
          width: 16px;
          height: 16px;
          display: block;
          box-sizing: border-box;
          top: 50%;
          right: 7px;
          margin-top: -8px;

          border-radius: 50px;
          border: 1px solid #38993a;
        }
        &::before {
          content: '';
          position: absolute;
          width: 10px;
          height: 10px;
          display: block;
          box-sizing: border-box;
          top: 50%;
          right: 10px;
          margin-top: -5px;

          border-radius: 50px;
          background-color: #22ab27;
        }
      }
      height: 95%;
      .text {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        font-size: 12px;
        color: #909090;
      }
    }
  }
</style>
