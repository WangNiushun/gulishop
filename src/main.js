import Vue from 'vue'

import App from '@/App.vue'
import router from '@/router'
import TypeNav from "@/components/TypeNav"  // 这个组件复用,所以在app中引入并注册
import store from "@/store"
import '@/mock/mockServer'  // 直接引入就好,在下面不用,所以不用 from
import SliderLoop from '@/components/SliderLoop'  // 引入复用的轮播组件



// 为了测试接口请求函数, 引入部分暴露所有方法的集合,就要必须这么引入
// import * as API from '@/api'
// API.reqGoodsList({})
// API.reqBannerList()
// API.reqFloorList()

Vue.config.productionTip = false


// 全局注册导航，因为多个组件用到
Vue.component('TypeNav',TypeNav)
Vue.component('SliderLoop',SliderLoop)

new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this    // 全局事件总线的安装, 本质是一个对象,
  },
  render: h => h(App),
  router,    // 全局注册路由器对象,每个组件中都可以使用 $router
  store,     // 注册声明使用vuex
}).$mount('#app')
