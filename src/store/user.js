
import { getUserTempId } from '@/untils/userabout'
import { reqRegister,reqLogin,reqLogout } from '@/api'
const state = {
  // 将临时id存储在 state 中
  userTempId: getUserTempId(),


  // 存储登录时返回的数据,后台返回的数据是对象，所以这里我们定义为对象
  // 每次一刷新，先去localstorage中看有没有，有就直接使用
  userInfo: JSON.parse(localStorage.getItem('USERINFO_KEY')) || {}
}

const mutations = {
  // 修改(保存) 后台返回的用户信息
  RECEIVEUSERINFO(state,userInfo){
    state.userInfo = userInfo
  },

  // 退出登录，删除state中的用户信息
  RESETUSERINFO(state){
    state.userInfo = {}
  }
}

const actions = {

  // 注册
  async userRegister({ commit }, userInfo) {
    const result = await reqRegister(userInfo)
    if (result.code === 200) {
      return "注册成功"
    } else {
      return Promise.reject(new Error("注册失败"))
    }
  },

  // 登录
  async userLogin({commit},userInfo){
    let result = await reqLogin(userInfo)
    if(result.code === 200){
      // 获取到用户的数据后，在 localstorage中保存一份, 因为返回的数据是一个对象，所以要转化为一个 json串，传递
      // 目的：为了自动登录 ( 下次再来，还可以找到登录状态的用户信息)
      localStorage.setItem('USERINFO_KEY',JSON.stringify(result.data))
      commit('RECEIVEUSERINFO',result.data)
    } else {
      return Promise.reject(new Error('登录失败'))
    }
    
  },

  // 退出登录
  async userLogout({commit}){
    const result = await reqLogout()
    if(result.code === 200){
      localStorage.removeItem('USERINFO_KEY')
      commit('RESETUSERINFO')
    }else{
      return Promise.reject(result.message)
    }
  }
}
const getters = {

}

export default {
  state,
  mutations,
  actions,
  getters
}
