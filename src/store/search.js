import { reqGoodsList } from '@/api'




const state = {
  // 请求回来数据的存放地
  goodsListInfo: {},   // 这里定义是数组还是对象,要根据请求回来的真实数据决定 

}
const mutations = {
  // 直接修改数据

  RECEIVEGOODSLISTINFO(state, goodsListInfo) {
    state.goodsListInfo = goodsListInfo
  },
}
const actions = {
    // searchParams是用来接受组件dispatch传递过来得参数对象
    // 这个参数如果是一个数据, 可以直接接受 (什么数据类型都行 ) 
    // 如果这个参数需要接受多个数据, 那么必须封装成对象传递过来
  async getGoodsListInfo({ commit },searchParams) {
    const result = await reqGoodsList(searchParams)   // result拿到的就是成功后的数据
    if (result.code === 200) {
      // 根据数据结构，这里还得使用 response.data，拿到我们需要的数据
      // 成功，我们就提交
      commit('RECEIVEGOODSLISTINFO', result.data)
    }
  },
}

const getters = {
  // 通过这里计算属性, 就可以listContaniner轮播组件中使用 ...mapGetters(['bannerList']) 简便映射获取到数据
  goodsList(state){
    // 为了不想让报错,防止拿到的数据是undefined,     可以 在"  或 "后面再写个 空数组, 其实只个值肯定是能拿到的,但是有一丢丢时间差,可能会报错
    return state.goodsListInfo.goodsList || []
  },
  attrsList(state){
    return state.goodsListInfo.attrsList || []
  },

  trademarkList(state){
    return state.goodsListInfo.trademarkList || []
  }

}

export default {
  state,
  mutations,
  actions,
  getters
}
