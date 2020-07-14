<template>
  <div class="type-nav">
    <div class="container">
      <!-- 注意这里要再外部添加一个div,给它添加moveOut事件 -->
      <div @mouseleave="moveOut">
        <h2 class="all">全部商品分类</h2>
        <div class="sort">
          <!-- 使用事件委派提高处理事件的效率 -->
          <div class="all-sort-list2" @click="toSearch">
            <div
              class="item"
              v-for="(c1,index) in categoryList"
              :key="c1.categoryId"
              @mousemove="moveIn(index)"
              :class="{item_on:currentIndex === index}"
            >
              <h3>
                <!-- <router-link :to="{name:search,query:{categoryName:c1.categoryName,categoryId:c1.categoryId}}">{{c1.categoryName}}</router-link> -->
                <!-- 自定义属性必须以 data-  开头 -->
                <a href="javascript:;" :data-category1Id="c1.categoryId">{{c1.categoryName}}</a>
                <!-- <a href @click="toSearch">{{c1.categoryName}}</a> -->
              </h3>
              <div class="item-list clearfix">
                <div class="subitem">
                  <dl class="fore" v-for="(c2) in c1.categoryChild" :key="c2.categoryId">
                    <dt>
                      <!-- <router-link :to="{name:search,query:{categoryName:c2.categoryName,categoryId:c2.categoryChild}}">{{c2.categoryName}}</router-link> -->
                      <a href>{{c2.categoryName}}</a>
                    </dt>
                    <dd v-for="(c3) in c2.categoryChild" :key="c3.categoryId">
                      <em>
                        <!-- <router-link :to="{name:}"></router-link> -->
                        <a href>{{c3.categoryName}}</a>
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// 引入lodash,体积较大
import _ from 'lodash'
// 可以只引用我们用到的节流函数
// import throttle from "lodash/throttle";

export default {
  name: "TypeNav",

  data() {
    return {
      // 设计一个数据,控制导航的calss是否有效
      currentIndex: -1
    };
  },
  // 挂载成功后，开始执行发送请求函数，但是一般不会在这里直接写 dispatch
  mounted() {
    this.getCategoryList();
  },
  methods: {
    getCategoryList() {
      this.$store.dispatch("getCategoryList");
    },

    //鼠标移入一级分类控制23级显示
    // moveIn(index){
    //    // console.log(index) // 快速移入时,计算机跟不上,这里引入防抖,节流知识
    //   this.currentIndex = index
    // },

    // 这里必须写完整形式,为了将回调函数放在 节流函数_.throttle 中
    moveIn: _.throttle(  // 当引入的是完整 lodash时,这样使用
    // moveIn: throttle(       // 解构引入节流函数throttle, 可以直接使用 
      function(index) {
        console.log(index);
        this.currentIndex = index;
      },
      50,
      { trailing: false }
    ),
    //{ 'trailing': true }  拖延触发，节流操作函数触发如果是true，那么是在规定时间结束之后触发
    //{ 'trailing': false } 不拖延触发，节流操作函数触发如果是false，那么是在规定时间开始就触发

    //鼠标移出隐藏23级
    moveOut() {
      this.currentIndex = -1;
    },

    // 点击分类跳转到search
    toSearch(event) {
      let ele = event.target.dataset; // 拿到目标元素身上所有的自定义属性,组成一个对象
    }
  },

  computed: {
    // 从vuex 中拿数据
    // ...mapState(['categoryList']) 这种写法是错误的,它映射的是总的store对象的srate内部的数据
    // 如果使用了 vuex 模块化开发，那么数组的形式就无法使用了

    // 最原始的写法： 正确
    // categoryList(){
    //   return this.$store.state.home.categoryList
    // }

    // 这里使用对象的方式是可以的， 注意： state是总的
    ...mapState({
      categoryList: state => state.home.categoryList
    })
  }
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 10px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 50px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &.item_on {
            background-color: #aaa;
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>