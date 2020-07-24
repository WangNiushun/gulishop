import { v4 } from 'uuid'


// 这个是工具函数, 它是专门用来生成或者得到用户的临时 id 的
function getUserTempId() {
  let userTempId = localStorage.getItem('USERTEMPID_KEY')
  // 如果获取不到, 证明用户之前没有生成临时 id
  if (!userTempId) {
    // 生成随机id
    userTempId = v4()  // =>  
    // 添加到localStorage中
    localStorage.setItem('USERTEMPID_KEY', userTempId)
  } else {
    // 如果localStorage中有,直接返回
    return userTempId
  }
}

// 然后把这个函数暴露出去, 分别暴漏的方式
export {
  getUserTempId
}