
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'

export default [
  {
    path: '/trade',
    component:Trade,
  },
  {
    path: '/shopcart',
    component:ShopCart,
  },
  {
    path:'/addcartsuccess',
    component:AddCartSuccess
  },
  {
    path:'/detail/:goodsId',
    component: Detail  
  },
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
    path: '/search/:keyword?',   // ? 的含意是 params 参数可传可不传,?必须写,否则会由bug
    component: Search,
    name:'search',
     // 路由传递props数据,测试使用
    // props: route =>({
    //   keyword:route.params.keyword,
    //   keyword1:route.query.keyword,
    // })
  },

  // 重定向路由
  {
    path: '/',
    redirect: '/home'
  }
]