// 这个文件是项目的接口请求函数文件
// 每个接口发请求，我们都把它封装成成一个函数，到时需要请求去拿函数数据的时候，就去调用对应的接口函数就完了

import Ajax from '@/ajax/Ajax'

// 请求获取三类分级列表接口
//  get         /api/product/getBaseCategoryList   参数： 无

// const reqCategoryList = () => Ajax.get('/api/product/getBaseCategoryList')  

// 使用部分暴露方式
export const reqCategoryList = () => Ajax({
  url:'/product/getBaseCategoryList',
  method:'GET'
})

// 记得第一次返回的错误,是404,因为跨域,所以要解决跨域问题,配置代理服务器