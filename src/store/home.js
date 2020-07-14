import { reqCategoryList } from '@/api'




const state = {
  // 请求回来数据的存放地
  categoryList: [],
}
const mutations = {
  // 直接修改数据
  RECEIVECATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList
  }
}
const actions = {
  // 异步请求
  // getCategoryList({commit}){
  //   reqCategoryList().then(response =>{
  //     // 根据数据结构，这里还得使用 response.data，拿到我们需要的数据
  //     // 成功，我们就提交
  //     commit('RECEIVECATEGORYLIST',response.data)
  //   })
  // }

  // 使用async await 的方式异步请求数据
  async getCategoryList({ commit }) {
    const result = await reqCategoryList()   // result拿到的就是成功后的数据
    if (result.code === 200) {
      // 根据数据结构，这里还得使用 response.data，拿到我们需要的数据
      // 成功，我们就提交
      commit('RECEIVECATEGORYLIST', result.data)
    }


  }

}

const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}
