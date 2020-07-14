
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'

export default [
  {
    path: '/home',
    component: Home
  },
  {
    path: '/login',
    component: Login,
    // 用来判断底部是否隐藏
    meta:{
      isHide:true
    }
  },
  {
    path: '/register',
    component: Register,
     // 用来判断底部是否隐藏
    meta:{
      isHide:true
    }
  },
  {
    path: '/search/:keyword?',   // ? 的含意是 params 参数可传可不传
    component: Search,
    name:'search',
     // 路由传递props数据
    props: route =>({
      keyword:route.params.keyword,
      keyword1:route.query.keyword,
    })
   
  },

  // 重定向路由
  {
    path: '/',
    redirect: '/home'
  }
]