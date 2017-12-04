# mobile-template

> 移动端项目基础搭建模板

## 功能模块
- 引入mint-ui
- 引入mui-ui
- 运用filter，vuex
- 添加了微信配置文件
- 添加了http响应拦截器
- 封装axios，请求库挂载在Vue的原型，调用只需`this.$api.get/post(url)`
- normalize.css处理各浏览器默认样式一致性

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
