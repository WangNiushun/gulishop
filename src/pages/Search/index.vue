<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread 面包屑-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <!-- 面包屑 -->
          <ul class="fl sui-tag">
            <!-- 显示点击分类过来,显示searchParams参数中的categoryName,商品名称 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{searchParams.categoryName}}
              <i @click="removeCategoryName">×</i>
            </li>
            <!-- 点击搜索过来,显示searchParams参数中的关键字keyword -->
            <li class="with-x" v-if="searchParams.keyword">
              {{searchParams.keyword}}
              <i @click="removeKeyword">×</i>
            </li>
            <!-- 点击品牌过来,显示searchParams参数中的trademark -->
            <li class="with-x" v-if="searchParams.trademark">
              <!-- split,字符串的方法以 : 分割, 这里我们只需要的品牌的名字 -->
              {{searchParams.trademark.split(':')[1]}}
              <i @click="removeTrademark">×</i>
            </li>

            <!-- 点击属性过来,修改searchParams参数中的props参数,因为是数组可以存在多个,这里我们要遍历 -->
            <li class="with-x" v-for="(prop, index) in searchParams.props" :key="index">
              {{prop.split(':')[1]}}
              <i @click="removeProp(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector 选择属性平台组件-->
        <SearchSelector @searchForTrademark="searchForTrademark" @searchForAttr="searchForAttr" />

        <!--details-->
        <div class="details clearfix">
          <!-- 排序区域 -->
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active:searchParams.order.split(':')[0] === '1'}">
                  <a href="#">
                    综合
                    <i
                      class="iconfont"
                      :class="{['icon-up']:searchParams.order.split(':')[1] === 'asc',['icon-up1']:searchParams.order.split(':')[1]==='desc'}"
                      v-if="searchParams.order.split(':')[0] === '1'"
                    ></i>
                  </a>
                </li>
                <li>
                  <a href="#">销量</a>
                </li>
                <li>
                  <a href="#">新品</a>
                </li>
                <li>
                  <a href="#">评价</a>
                </li>
                <li :class="{active:searchParams.order.split(':')[0] === '2'}">
                  <a href="#">
                    价格
                    <i
                      class="iconfont"
                      :class="{['icon-up']:searchParams.order.split(':')[1] === 'asc',['icon-up1']:searchParams.order.split(':')[1] === 'desc'}"
                      v-if="searchParams.order.split(':')[0] === '1' "
                    ></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 中间商品区域 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="(goods) in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 详情页路由组件 -->
                    <router-link :to="`/detail/${goods.id}`">
                      <img :src="goods.defaultImg" />
                    </router-link>
                    <!-- <a href="item.html" target="_blank">
                      <img :src="goods.defaultImg" />
                    </a>-->
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{goods.price}}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <router-link :to="`/detail/${goods.id}`">{{goods.title}}</router-link>
                    <!-- <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                    >{{goods.title}}</a>-->
                  </div>
                  <div class="commit">
                    <i class="command">
                      已有
                      <span>2000</span>人评价
                    </i>
                  </div>
                  <div class="operate">
                    <a
                      href="javascript:;"
                      class="sui-btn btn-bordered btn-danger"
                      
                    >加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <div class="fr page">
            <div class="sui-pagination clearfix">
              <ul>
                <li class="prev disabled">
                  <a href="#">«上一页</a>
                </li>
                <li class="active">
                  <a href="#">1</a>
                </li>
                <li>
                  <a href="#">2</a>
                </li>
                <li>
                  <a href="#">3</a>
                </li>
                <li>
                  <a href="#">4</a>
                </li>
                <li>
                  <a href="#">5</a>
                </li>
                <li class="dotted">
                  <span>...</span>
                </li>
                <li class="next">
                  <a href="#">下一页»</a>
                </li>
              </ul>
              <div>
                <span>共10页&nbsp;</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "./SearchSelector/SearchSelector";
import { mapGetters } from "vuex";
export default {
  name: "Search",
  data() {
    return {
      // 初始化搜索参数, ( 收集参数 )
      // 为搜索请求,提供搜索参数
      searchParams: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        keyword: "",
        order: "1:desc",
        pageNo: 1,
        pageSize: 10,
        props: [],
        trademark: "",
      },
    };
  },
  beforeMount() {
    // 一般我们在挂载之前 去同步更新 data中的数据
    // 这里处理参数的过程,在methods中封装成了一个函数
    this.handlerSearchParams();
  },
  mounted() {
    // mounted 中去发送异步请求
    this.getGoodsListInfo();
  },

  methods: {
    // 分发dispatch,调用vuex内部action中的函数,发送ajax请求
    getGoodsListInfo(searchParams) {
      this.$store.dispatch("getGoodsListInfo", this.searchParams);
    },

    // 处理参数的函数
    handlerSearchParams() {
      // 1.从路由中获取对应的params 和query 参数
      let { keyword } = this.$route.params;
      let {
        categoryName,
        category1Id,
        category2Id,
        category3Id,
      } = this.$route.query;

      // 2.获取的参数不一定存在,所以我们要对参数进行处理,需要判定, 但是我们这次不判定,直接全部放在一个新的对象中
      let searchParams = {
        // data中 searchParams 数据的拆包, ...拆包对象是浅拷贝
        ...this.searchParams,
        // 在对象中,添加相同的属性,后面的会把前面的覆盖,我们就能保证我们拿到的是最新的 数据
        keyword,
        categoryName,
        category1Id,
        category2Id,
        category3Id,
      };

      // 3.过滤这个对象中没有数据的属性项
      // Object.keys(对象) ，   遍历对象内部所有的属性并获取所有的属性形成一个新的数组
      Object.keys(searchParams).forEach((item) => {
        // searchParams,是对象，  item代表它内部的每一项属性，这里使用中括号语法
        // 如果这个属性为空，为了发送请求的时候，不占用带宽，就删除它
        // 所以我们要在前面加一个 ! 非,  属性为真,不处理, 属性为假(就是没有),就进入删除这个属性
        if (!searchParams[item]) {
          delete searchParams[item];
        }
      });

      this.searchParams = searchParams; // 用收集好的searchParams替换掉原来的初始化搜索参数
    },

    // 点击x , 删除面包屑的类名 categoryNamed
    removeCategoryName() {
      // 将参数内部的categoryName,清空 ;   // 然后再次发送请求
      this.searchParams.categoryName = "";
      // this.getGoodsListInfo()
      // BUG: 点击x后, 删除面包屑中的类别名称, 但是路径中的类别名称还在
      // 解决: 不能在这里直接发送请求, 因为这样路由是不变化的
      // 我们应该让路由去变化, 然后wath会监视到,然后发请求
      this.$router.replace({ name: "search", params: this.$route.params });
    },

    // 点击x,  删除面包屑的关键字  keyword
    removeKeyword() {
      this.searchParams.keyword = "";
      this.$bus.$emit("clearKeyword");
      // this.getGoodsListInfo()
      // 同理
      this.$router.replace({ name: "search", query: this.$route.query });
    },

    // 自定义事件的回调函数: 子向父传递数据
    // 处理子中 点击品牌, 传过来的参数,修改父中 searchParams中对应的参数,然后发送请求
    searchForTrademark(trademark) {
      // 注意参数格式的要求: 模板字符串拼接   品牌: "ID:品牌名称"
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      this.getGoodsListInfo();
    },

    // 点击x, 删除面包屑的品牌  trademark
    removeTrademark() {
      this.searchParams.trademark = "";
      this.getGoodsListInfo();
    },

    // 自定义事件的回调函数:根据属性显示
    // 处理子中 点击属性, 传过来的参数,修改父中 searchParams中对应的参数,然后发送请求
    searchForAttr(attr, attrValue) {
      // 注意参数格式的要求: 模板字符串拼接
      // 商品属性的数组: ["属性ID:属性值:属性名"]
      // 示例: ["2:6.0～6.24英寸:屏幕尺寸"]
      this.searchParams.props.push(
        `${attr.attrId}:${attrValue}:${attr.attrName}`
      );
      this.getGoodsListInfo();
    },

    // 点击x, 删除面包屑的属性 这个要传入下标
    removeProp(index) {
      this.searchParams.props.splice(index, 1);
      this.getGoodsListInfo();
    },

    // 点击加入购物车,发送请求,如果返回成功,跳转到添加购物车成功的页面

  },

  computed: {
    ...mapGetters(["goodsList"]),
  },

  watch: {
    $route() {
      // 还是要去准备参数再次发送请求, 而这里的准备参数和beforMount内部是一模一样的
      // 所以我们要把处理参数的过程封装为一个公共的函数,优化的代码,这个函数在 methods中定义
      this.handlerSearchParams();
      // 需要再次发送请求,获取新的参数搜索的数据
      this.getGoodsListInfo();
    },
  },
  components: {
    SearchSelector,
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  // background: #e1251b;
                  background: green;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>