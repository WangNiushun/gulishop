// 这个文件是项目的接口请求函数文件
// 每个接口发请求，我们都把它封装成成一个函数，到时需要请求去拿函数数据的时候，就去调用对应的接口函数就完了

import Ajax from '@/ajax/Ajax'
import mockAjax from '@/ajax/mockAjax'



// (1) 请求获取三类分级列表接口
//  get   /api/product/getBaseCategoryList   参数： 无

// const reqCategoryList = () => Ajax.get('/api/product/getBaseCategoryList')  

// 使用部分暴露方式
export const reqCategoryList = () => Ajax({
  url:'/product/getBaseCategoryList',
  method:'GET'
})

// 记得第一次返回的错误,是404,因为跨域,所以要解决跨域问题,配置代理服务器





//  (2) 使用mock的模拟接口, 去请求banner 数据    get请求    /banner  
//   使用对象的方法发送请求,上面的是函数的方式
export const reqBannerList = () => mockAjax.get('/banner')
export const reqFloorList = () => mockAjax.get('/floor')


// // 测试接口, 如果打印 1 1 ,就说明接口请求成功了
// console.log(1)
// console.log(reqBannerList)   // 这个函数的返回值是一个 promise对象
// console.log(1)



//   (3)  请求 search的商品搜索列表数据
//     post     /api/list    data       
//     data 如果是空的对象代表没有搜索条件,会返回所有的商品信息

export const reqGoodsList = (searchParams) => Ajax.post('/list',searchParams)
