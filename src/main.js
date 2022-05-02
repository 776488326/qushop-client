import Vue from "vue"
import App from "./App"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import App from "@/App" @标识src 创建jsconfig.json配置开启 @的提示
Vue.config.productionTip = false

import router from "@/router"
import store from '@/store'
import * as API from '@/api'

Vue.use(ElementUI);

// 全局注册type-nav
import Swiper from "@/components/swiper"
Vue.component("Swiper",Swiper);
new Vue({
  el : "#app",
  beforeCreate(){
    Vue.prototype.$bus = this; //安装总线
    Vue.prototype.$API = API; //安装请求接口
  },
  render : h=>h(App),
  router,  //所有组件内部都可以拿到this.$router和this.$route
  store,   //所有组件内部都可以拿到this.$store
})
