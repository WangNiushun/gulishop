import { reqGoodsDetailInfo } from '@/api'
const state = {
  goodsDetailInfo:{},
}
const mutations = {
  RECEIVEGOODSDETAILINFO(state,goodsDetailInfo){
    state.goodsDetailInfo = goodsDetailInfo
  }
}

const actions = {
  async getGoodsDetailInfo({ commit },skuId) {
    const result = await reqGoodsDetailInfo(skuId)   // result拿到的就是成功后的数据
    if (result.code === 200) {
      // 根据数据结构，这里还得使用 response.data，拿到我们需要的数据
      // 成功，我们就提交
      commit('RECEIVEGOODSDETAILINFO', result.data)
    }
  }
}
const getters = {
  categoryView(state){
    return state.goodsDetailInfo.categoryView || {}
  },
  skuInfo(state){
    return state.goodsDetailInfo.skuInfo || {}
  },
  spuSaleAttrList(state){
    return state.goodsDetailInfo.spuSaleAttrList || []
  },

  // 为了防止 a.b.c 结构的伪报错, 直接从最开始的保证它能获取到,哪怕是空对象或者空数组
  //  这里我们能够保证 (state.goodsDetailInfo.skuInfo || {})能够获取到,不会报错,最次也是个空对象
  // 但是不能保证 imgList 能够获取到, imgList可能是undefined, 所以使用 imgList.语法  或者 imgList[]语法时,也要判断
  imgList(state){
    return (state.goodsDetailInfo.skuInfo || {}).skuImageList
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
