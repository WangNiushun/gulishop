// 对axios的二次封装

// 配置基础路径和超时限制
// 添加进度条信息    nprogress

import axios from 'axios'
// 引入第三方进度条 的包,记得下载
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const service = axios.create({
  baseURL: '/api',  // 配置基础路径
  timeout: 20000,    // 超时限制
});

// 请求拦截器
service.interceptors.request.use(config =>{
  // config  是发送请求的配置对象，必须处理完返回这个配置对象
  // 开启进度条
  NProgress.start()
  return config
})

// 响应拦截器
service.interceptors.response.use(
  response => {
    // 停止进度条
    NProgress.done()
    // 返回响应的
    return response.data
  },
  error =>{
    alert("请求出错"+error.message || '未知错误')
    // 以后不允许 用户继续处理： 中断promise链
    return new Promise(()=>{})  // 返回pending状态的promise，中断promise链,不会再往后传
    // 以后允许用户继续对错误进行处理
    // return Promise.reject(error)
  }
)

export default service