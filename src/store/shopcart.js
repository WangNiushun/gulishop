
import { reqAddorUpdateShopCart, reqShopCartList, reqUpdateIsChecked,reqDeleteCart } from '@/api'

const state = {
  shopCartList: []
}

const mutations = {
  RECEVIESHOPCARTLIST(state, shopCartList) {
    state.shopCartList = shopCartList
  }

}

const actions = {
  // 常规接收参数
  //  addorUpdateShopCart({commit},obj){
  //   reqAddorUpdateShopCart(obj.skuId,obj.skuNum){
  //     if(result.code === 200){
  //       return "添加购物车成功"
  //     }else{
  //       return "添加购物车失败"
  //     }
  //   }
  // }

  // 在 action 内部 要传多个数据时,必须是一个对象, 这里我们使用解构,方便
  // 添加或更新购物车
  async addorUpdateShopCart({ commit }, { skuId, skuNum }) {
    let result = await reqAddorUpdateShopCart(skuId, skuNum)
    if (result.code === 200) {
      return "添加或购物车成功"
    } else {
      // return "添加购物车失败"  返回的还是成功的promise
      // 下面返回的是失败的promise
      return Promise.reject(new Error("添加或修改购物车失败"))
    }
  },

  // 获取购物车列表的数据
  async getShopCartList({ commit }) {
    let result = await reqShopCartList()
    if (result.code === 200) {
      commit('RECEVIESHOPCARTLIST', result.data)
    }
  },

  // 切换单个商品选中状态
  async updateIsChecked({ commit }, { skuId, isChecked }) {
  
    let result = await reqUpdateIsChecked(skuId, isChecked)
    if (result.code === 200) {
      return "修改单个商品状态成功"
    } else {
      // return "添加购物车失败"  返回的还是成功的promise
      // 下面返回的是失败的promise
      return Promise.reject(new Error("修改单个商品状态失败"))
    }
  },

  // 点击切换全选框的选中状态
  updateAllChecked({commit,state,dispatch},isChecked){
    // 逻辑:// 遍历购物车的每一项,和全选框的ischecked对比,一样就直接return,不一样就调用 切换单个商品选中状态的函数 修改为和全选框 一样的
    // 定义数组储存每一项,去发送请求返回的promise对象
    let promises = []
    state.shopCartList.forEach(item => {
      if(item.isChecked === isChecked) return
      let promise = dispatch('updateIsChecked',{skuId:item.skuId,isChecked:isChecked})
      promises.push(promise)
    })
    return Promise.all(promises)
  },

  // 删除单个商品
  async deleteShopCart({commit},skuId){
   
    const result = await reqDeleteCart(skuId)
    if(result.code === 200){
      return '删除成功'
    }else{
      return Promise.reject(new Error('删除失败'))
    }
  },

  // 删除已经选中的商品
  deleteCheckedShopCart({commit,state,dispatch}){
    let promises = []
    state.shopCartList.forEach(item => {
      if(!item.isChecked) return
      let promise = dispatch('deleteShopCart',item.skuId)
      promises.push(promise)
    })
    return Promise.all(promises)
  }
}
const getters = {

}


export default {
  state,
  mutations,
  actions,
  getters,
}
