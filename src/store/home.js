import { reqCategoryList,reqBannerList,reqFloorList } from '@/api'




const state = {
  // 请求回来数据的存放地
  categoryList: [],   // 这里定义是数组还是对象,要根据请求回来的真是数据决定 
  bannerList:[],
  floorList:[]
}
const mutations = {
  // 直接修改数据
  RECEIVECATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList
  },


  RECEIVEBANNERLIST(state, bannerList) {
    state.bannerList = bannerList
  },


  RECEIVEFLOORLIST(state, floorList) {
    state.floorList = floorList
  },




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
  },

  async getBannerList({ commit }) {
    const result = await reqBannerList()   // result拿到的就是成功后的数据
    if (result.code === 200) {
      // 根据数据结构，这里还得使用 response.data，拿到我们需要的数据
      // 成功，我们就提交
      commit('RECEIVEBANNERLIST', result.data)
    }
  },


  async getFloorList({ commit }) {
    const result = await reqFloorList()   // result拿到的就是成功后的数据
    if (result.code === 200) {
      // 根据数据结构，这里还得使用 response.data，拿到我们需要的数据
      // 成功，我们就提交
      commit('RECEIVEFLOORLIST', result.data)
    }
  },


}

const getters = {
  // 通过这里计算属性, 就可以listContaniner轮播组件中使用 ...mapGetters(['bannerList']) 简便映射获取到数据
  // bannerList(state){
  //   return state.bannerList
  // }
}

export default {
  state,
  mutations,
  actions,
  getters
}
