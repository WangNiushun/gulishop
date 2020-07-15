import Vue from 'vue'

import App from '@/App.vue'
import router from '@/router'
import TypeNav from "@/components/TypeNav"
import store from "@/store/index"
import '@/mock/mockSrver'  // 直接引入就好,在下面不用,所以不用 from
import '@/api'   // 为了测试mock接口
// import * as API from '@/api' // 为了测试接口请求函数, 引入部分暴漏的集合,就要这么引入



Vue.config.productionTip = false

// 全局注册导航，因为多个组件用到
Vue.component('TypeNav',TypeNav)

new Vue({
  render: h => h(App),
  router,    // 全局注册路由器对象,每个组件中都可以使用 $router
  store     // 注册声明使用vuex
}).$mount('#app')
