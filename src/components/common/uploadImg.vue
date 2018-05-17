<template>
  <div id="g_send">
    <input type="file" class="upImg" id="upload" @change="upload" accept="image/*">
    <loading :is-show="loadingData"></loading>

  </div>
</template>

<script>
  import Exif from 'exif-js'
  import loading from '../common/loading.vue'
  import { Toast } from 'mint-ui';

  export default {
    name: 'g_send',
    data () {
      return {
        loadingData: false,
        fileUrl: this.config.baseserverURI + this.config.getImgUrlAPI,

        headerImage:'',
        picValue:'',
        src: null,
        fileNamess: null,
        isAgree: false
      }
    },
    components: {
      loading
    },
    methods: {
      upload (e) {
        let vm = this
        const files2 = Array.prototype.slice.call(e.target.files);
        if(files2[0].size/(1024*1024) > 5) {
          Toast({
            message: '图片不能大于5M',
            position: 'bottom',
            duration: 1500
          });
          return
        }
        vm.loadingData = true
        let files = e.target.files || e.dataTransfer.files;
        console.log(files2[0].size)
        console.log(files2[0].size/(1024*1024))
        vm.fileNamess = files2[0].name
        if (!files.length) return;
        vm.picValue = files[0];
        Toast({
          message: '上传中',
          position: 'bottom',
          duration: 1500
        });
        vm.imgPreview(vm.picValue);
      },
      imgPreview (file) {
        let self = this;
        let Orientation;
        //去获取拍照时的信息，解决拍出来的照片旋转问题
        Exif.getData(file, function(){
          Orientation = Exif.getTag(this, 'Orientation');
        });
        // 看支持不支持FileReader
        if (!file || !window.FileReader) return;

        if (/^image/.test(file.type)) {
          // 创建一个reader
          let reader = new FileReader();
          // 将图片2将转成 base64 格式
          reader.readAsDataURL(file);
          // 读取成功后的回调
          reader.onloadend = function () {
            let result = this.result;
            let img = new Image();
            img.src = result;
            //判断图片是否大于100K,是就直接上传，反之压缩图片
            if (this.result.length <= (100 * 1024)) {
              self.headerImage = this.result;
              self.postImg();
            }else {
              img.onload = function () {
                let data = self.compress(img,Orientation);
                self.headerImage = data;
                self.postImg();
              }
            }
          }
        }
      },
      dataURItoBlob(dataURI) {

        var byteString = atob(dataURI.split(',')[1]);
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], {type: mimeString});
      },
      postImg () {
        //这里写接口
        let vm = this
        var fd = new FormData();
        var blob = vm.dataURItoBlob(vm.headerImage);
        fd.append('file', blob, vm.fileNamess);

        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'  //之前说的以表单传数据的格式来传递fromdata
          }
        };
        vm.$api.post(vm.config.baseserverURI + vm.config.getImgUrlAPI, fd, config).then( (res) => {
          vm.loadingData = false

          //做处理\
          console.log(res.data, 1111)
          if(res.data.errcode === '0000') {
            // vm.textss = '上传成功'
            Toast('上传成功')
            // vm.images.push(res.data.data[0])
            vm.$emit('primary-imgUrl', res.data.data[0])
          }else {
            // Toast(res.data.errmsg)
            // vm.textss = '上传失败'
            Toast(res.data.errmsg)
          }
        })
      },
      rotateImg (img, direction,canvas) {
        //最小与最大旋转方向，图片旋转4次后回到原方向
        const min_step = 0;
        const max_step = 3;
        if (img == null)return;
        //img的高度和宽度不能在img元素隐藏后获取，否则会出错
        let height = img.height;
        let width = img.width;
        let step = 2;
        if (step == null) {
          step = min_step;
        }
        if (direction == 'right') {
          step++;
          //旋转到原位置，即超过最大值
          step > max_step && (step = min_step);
        } else {
          step--;
          step < min_step && (step = max_step);
        }
        //旋转角度以弧度值为参数
        let degree = step * 90 * Math.PI / 180;
        let ctx = canvas.getContext('2d');
        switch (step) {
          case 0:
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0);
            break;
          case 1:
            canvas.width = height;
            canvas.height = width;
            ctx.rotate(degree);
            ctx.drawImage(img, 0, -height);
            break;
          case 2:
            canvas.width = width;
            canvas.height = height;
            ctx.rotate(degree);
            ctx.drawImage(img, -width, -height);
            break;
          case 3:
            canvas.width = height;
            canvas.height = width;
            ctx.rotate(degree);
            ctx.drawImage(img, -width, 0);
            break;
        }
      },
      compress(img,Orientation) {
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext('2d');
        //瓦片canvas
        let tCanvas = document.createElement("canvas");
        let tctx = tCanvas.getContext("2d");
        let initSize = img.src.length;
        let width = img.width;
        let height = img.height;
        //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
        let ratio;
        if ((ratio = width * height / 3000000) > 1) {
          console.log("大于400万像素")
          ratio = Math.sqrt(ratio);
          width /= ratio;
          height /= ratio;
        } else {
          ratio = 1;
        }
        canvas.width = width;
        canvas.height = height;
        //        铺底色
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        //如果图片像素大于100万则使用瓦片绘制
        let count;
        if ((count = width * height / 1000000) > 1) {
          console.log("超过100W像素");
          count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
          //            计算每块瓦片的宽和高
          let nw = ~~(width / count);
          let nh = ~~(height / count);
          tCanvas.width = nw;
          tCanvas.height = nh;
          for (let i = 0; i < count; i++) {
            for (let j = 0; j < count; j++) {
              tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
              ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
            }
          }
        } else {
          ctx.drawImage(img, 0, 0, width, height);
        }
        //修复ios上传图片的时候 被旋转的问题
        if(Orientation != "" && Orientation != 1){
          switch(Orientation){
            case 6://需要顺时针（向左）90度旋转
              this.rotateImg(img,'left',canvas);
              break;
            case 8://需要逆时针（向右）90度旋转
              this.rotateImg(img,'right',canvas);
              break;
            case 3://需要180度旋转
              this.rotateImg(img,'right',canvas);//转两次
              this.rotateImg(img,'right',canvas);
              break;
          }
        }
        //进行最小压缩
        let ndata = canvas.toDataURL('image/jpeg', 0.1);
        console.log('压缩前：' + initSize);
        console.log('压缩后：' + ndata.length);
        console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");
        tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
        return ndata;
      },
    }
  }
</script>

<style scoped lang="less">
  #g_send {
    position: relative;
    top: -1.9rem;
    #upload{
      width: 100%;
      height: 1.9rem;
      opacity: 0;
    }
  }
</style>
