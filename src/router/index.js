import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from '@/router/routes'
Vue.use(VueRouter)

// // 先把原来的方法存起来
// const originPush=VueRouter.prototype.push
// const originReplace=VueRouter.prototype.replace

// // location 是它返回的对象
// VueRouter.prototype.push = function(location,onResolved,onRejected){
//   if(onResolved === undefined && onRejected === undefined){
//     //  originPush.call 目的是让VueRouter实例化对象去调用
//     return originPush.call(this,location).catch(()=>{})
//   }else{
//     return originPush.call(this,location,onResolved,onRejected)
//   }
// }
export default  new VueRouter({
 routes
})
