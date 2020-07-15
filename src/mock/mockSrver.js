// 正儿八经的模拟接口

import Mock from 'mockjs'

// json 数据被引入后,会变成真正的数组,不再是json 字符串了
import banner from './banner.json'
import floor from './floor.json'

// 类似于注册路由  //  大写Mock 是一个对象,  小写mock 是它的方法
// 第一个参数: 是我们以后要请求的模拟接口
// 第二个参数: 是访问这个接口后, 返回的数据

//  '/mock/banner'     /mock不能省, 因为这个并不是发送ajax请求
//   这个不是发送请求, 是模拟后台接口
Mock.mock('/mock/banner',{code:200,data:banner})
Mock.mock('/mock/floor',{code:200,data:floor})




// 最后切记在入口文件夹(main.js)引入一下, 代表这个文件一开始就会执行