<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(shopCart) in shopCartList" :key="shopCart.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="shopCart.isChecked"
              @click="updateIsChecked(shopCart)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="shopCart.imgUrl" />
            <div class="item-msg">{{shopCart.skuName}}</div>
          </li>

          <li class="cart-list-con4">
            <span class="price">{{shopCart.cartPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="updateCartNum(shopCart,-1)">-</a>
            <input
              autocomplete="off"
              type="text"
              :value="shopCart.skuNum"
              minnum="1"
              class="itxt"
              @change="updateCartNum(shopCart,$event.target.value*1)"
            />
            <a href="javascript:void(0)" class="plus" @click="updateCartNum(shopCart,1)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{shopCart.skuNum * shopCart.cartPrice}}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteCart(shopCart)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <!-- 对于多选框,没有value时,v-model的值就是checked的值 -->
        <input class="chooseAll" type="checkbox" v-model="isAllChecked" />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="javascript:;" @click="deleteChecked">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择
          <span>{{checkedNum}}</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{allMoney}}</i>
        </div>
        <div class="sumbtn">
          <!-- <a class="sum-btn" href="###" target="_blank">结算</a> -->
          <router-link to="/trade" class="sum-btn">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ShopCart",
  mounted() {
    // 调用dispatch,发送ajax请求,获取数据
    this.getShopCartList();
  },
  methods: {
    // 获取购物车列表数据
    getShopCartList() {
      this.$store.dispatch("getShopCartList");
    },

    //  修改购物车商品的数量
    async updateCartNum(shopCart, changeNum) {
      // 参数: shopCart:点击的是哪一个商品  ;  changeNum, 改变的数量,是要发送的请求参数
      // 这里用户要改变的数量 与 原有的数量的值不能<1,如果小于1,
      // 我们就要修改 用户要改变的数量, 使 改变的数量 + 原有的数量 = 1, 最少让它买一个
      if (shopCart.skuNum + changeNum < 1) {
        changeNum = 1 - shopCart.skuNum;
      }
      try {
        await this.$store.dispatch("addorUpdateShopCart", {
          skuId: shopCart.skuId,
          skuNum: changeNum,
        });
        // 修改数量的请求成功之后, 再次发送请求,获取购物车的列表信息,此时页面展示的就是最新的
        this.getShopCartList();
      } catch (error) {
        alert(error.message);
      }
    },

    // 修改单个商品的选中状态
    async updateIsChecked(shopCart) {
      try {
        await this.$store.dispatch("updateIsChecked", {
          skuId: shopCart.skuId,
          isChecked: shopCart.isChecked === 1 ? 0 : 1,
        });
        this.getShopCartList();
      } catch (error) {
        alert(error.message);
      }
    },

    // 删除购物车中的某个商品
    async deleteCart(shopCart) {
      try {
        await this.$store.dispatch("deleteShopCart", shopCart.skuId);
        this.getShopCartList();
      } catch (error) {
        alert(error);
      }
    },

    // 删除已选中的商品
    async deleteChecked() {
      try {
        let result = await this.$store.dispatch("deleteCheckedShopCart");
        this.getShopCartList();
      } catch (error) {
        alert(error.message);
      }
    },
  },

  computed: {
    // 从store 中获取数据
    ...mapState({
      shopCartList: (state) => state.shopcart.shopCartList,
    }),

    // 计算已选择商品的数量
    checkedNum() {
      // 使用数组的统计方法 reduce: 两个参数 1. 回调函数     2.统计的初始值
      // 第一次的统计的时候, 初始值就是 统计的值
      return this.shopCartList.reduce((pre, item, index) => {
        if (item.isChecked) {
          // 如果这一项是选中的,就把它的数量 累加到 pre身上
          pre += item.skuNum;
        }
        return pre;
      }, 0);
    },

    // 计算总价
    allMoney() {
      return this.shopCartList.reduce((pre, item, index) => {
        if (item.isChecked) {
          pre += item.skuNum * item.cartPrice;
        }
        return pre;
      }, 0);
    },

    // 全选框的状态计算,有获取,有设置,所以应该写对象形式
    isAllChecked: {
      //  arr.every   用于检测数组中的元素是否满足指定条件。
      // 1、依次执行数组元素，如果一个元素不满足条件就返回false，不会继续执行后面的元素判断；所有数组元素都满足条件则返回true。
      // 2、不会改变原数组
      get() {
        // 普通函数形式
        return (
          this.shopCartList.every(function (item, index) {
            return item.isChecked === 1;
          }) && this.shopCartList.length > 0
        );
        // 箭头函授高端大气上档次
        // return this.shopCartList.every((item, index) => item.isChecked === 1)
      },
      async set(val) {
        try {
          let result = await this.$store.dispatch(
            "updateAllChecked",
            val ? 1 : 0
          );
          this.getShopCartList();
        } catch (error) {
          alert(error.message);
        }
      },
    },
  },
};
</script>
<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }
        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>