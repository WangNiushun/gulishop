// 正儿八经的模拟接口
//  向外暴露, 注册接口
import Mock from 'mockjs'
import banner from './banner.json' // json 数据被引入后,会变成真正的数组,不再是json 字符串了
import floor from './floor.json'   // json 数据被引入后,会变成真正的数组,不再是json 字符串了

// 类似于注册路由  //  大写Mock 是一个对象,  小写mock 是它的方法

// 第一个参数: 是我们以后要请求的模拟接口路径
// 第二个参数: 是访问这个接口后, 返回的数据


Mock.mock('/mock/banner',{code:200,data:banner})
Mock.mock('/mock/floor',{code:200,data:floor})

//  '/mock/banner'     /mock不能省, 因为这个并不是发送ajax请求
//   这个不是发送请求, 是模拟后台接口
//   发送请求可以省， 是因为我们在 axios 中配置了 baseUrl

// 最后切记在入口文件夹(main.js)引入一下, 代表这个文件一开始就会执行