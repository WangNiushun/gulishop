<template>
  <div class="type-nav">
    <div class="container">
      <!-- 注意这里要再外部添加一个div,给它添加moveOut事件 -->
      <div @mouseleave="moveOut" @mouseenter="isShow=true">
        <h2 class="all">全部商品分类</h2>
        <transition name="show">
          <div class="sort" v-show="isShow">
            <!-- 使用事件委派提高处理事件的效率 -->
            <div class="all-sort-list2" @click="toSearch">
              <div
                class="item"
                v-for="(c1,index) in categoryList"
                :key="c1.categoryId"
                @mouseenter="moveIn(index)"
                :class="{item_on:currentIndex === index}"
              >
                <h3>
                  <!-- 声明式导航:不适用于这里,因为实例化出来的组件对象太多了,会导致页面卡顿,因此我们使用编程时导航去跳转 -->
                  <!-- <router-link :to="{name:'search',query:{categoryName:c1.categoryName,category1Id:c1.categoryId}}">{{c1.categoryName}}</router-link> -->
                  <!-- 使用了编程时导航,但是效率还是不高,因为每个类别都添加了相同的点击事件,每个点击事件都有自己的回调函数 
                      为了更加提高效率,我们这里使用事件委派
                  -->
                  <!-- <a href="javascript:;" @click="$router.push({name:'search',query:{categoryName:c1.categoryName,category1Id:c1.categoryId}})">{{c1.categoryName}}</a> -->
                  <a
                    href="javascript:;"
                    :data-category1Id="c1.categoryId"
                    :data-categoryName="c1.categoryName"
                  >{{c1.categoryName}}</a>
                </h3>
                <div class="item-list clearfix">
                  <div class="subitem">
                    <dl class="fore" v-for="(c2) in c1.categoryChild" :key="c2.categoryId">
                      <dt>
                        <!-- <router-link :to="{name:'search',query:{categoryName:c2.categoryName,category2Id:c2.categoryId}}">{{c2.categoryName}}</router-link> -->
                        <!-- <a href="javascript:;" @click="$router.push({name:'search',query:{categoryName:c2.categoryName,category2Id:c2.categoryId}})">{{c2.categoryName}}</a> -->
                        <a
                          href="javascript:;"
                          :data-category2Id="c2.categoryId"
                          :data-categoryName="c2.categoryName"
                        >{{c2.categoryName}}</a>
                      </dt>
                      <dd v-for="(c3) in c2.categoryChild" :key="c3.categoryId">
                        <em>
                          <!-- <router-link :to="{name:'search',query:{categoryName:c3.categoryName,category3Id:c3.categoryId}}">{{c3.categoryName}}</router-link> -->
                          <!-- <a href="javascript:;" @click="$router.push({name:'search',query:{categoryName:c3.categoryName,category3Id:c3.categoryId}})">{{c3.categoryName}}</a> -->
                          <a
                            href="javascript:;"
                            :data-category3Id="c3.categoryId"
                            :data-categoryName="c3.categoryName"
                          >{{c3.categoryName}}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
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
// import _ from 'lodash'
// 可以只引用我们用到的节流函数
import throttle from "lodash/throttle";

export default {
  name: "TypeNav",

  data() {
    return {
      // 设计一个数据,控制导航的calss是否有效
      currentIndex: -1,
      // 设计数据，控制显示一级分类
      isShow: true
    };
  },
  mounted() {
    if (this.$route.path !== "/home") {
      this.isShow = false;
    }
  },

  methods: {
    // 鼠标移入一级分类控制23级显示
    // moveIn(index){
    //    // console.log(index) // 快速移入时,计算机跟不上,这里引入防抖,节流知识
    //   this.currentIndex = index
    // },

    // 鼠标移入一级分类控制23级显示
    // 这里moveIn必须写对象的方法形式,  为了将回调函数放在 节流函数_.throttle 中
    // moveIn: _.throttle(            // 当引入的是完整 lodash时,这样使用
    moveIn: throttle(
      // 解构引入节流函数throttle, 可以直接使用
      function(index) {
        // console.log(index);
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
      // 判断当前路径,移出一级分类是否显示
      if (this.$route.path !== "/home") {
        this.isShow = false;
      }
    },

    // 点击分类跳转到search 页面
    // 事件委派
    toSearch(event) {
      // 通过事件对象,拿到事件目标元素
      // let ele = event.target
      // let data = ele.dataset   //  拿到元素身上所有的自定义属性组成的一个对象
      let data = event.target.dataset; // 简写:  拿到元素身上所有的自定义属性组成的一个对象
      console.log(data);

      //  从data中解构赋值: 注意是小写,因为data 中的自定义属性名都是小写
      let { categoryname, category1id, category2id, category3id } = data;

      // 判断
      if (categoryname) {
        // 只要进入if, 点的一定是 a 标签
        // 创建一个对象
        let location = {
          name: "search"
        };
        let query = {};
        // 给query添加  类别的id和类别的名字,	通过query参数传递,
        query.categoryName = categoryname;
        // 判断是哪一个的id
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        // 给location对象的添加一个属性,属性名为query, 属性值是query变量
        location.query = query;
        // 把这个对象添加到路由器对象中
        // this.$router.push(location);

        //点击三级分类的时候，我们也不能光关注query参数，也要去看看之前有没有params参数
        //如果有，需要把之前的params参数也带上
        let { params } = this.$route;
        if (params) {
          location.params = params;
        }

        this.$router.push(location);
      }
    }
  },

  computed: {
    // 从vuex 中拿数据, 也就是根据vuex 的state中的数据计算而来的
    // ...mapState(['categoryList']) 这种写法是错误的,它映射的是总的store对象的srate内部的数据
    // 如果使用了 vuex 模块化开发，那么数组的形式就无法使用了

    // 最原始的写法： 正确
    // categoryList(){
    //   return this.$store.state.home.categoryList
    // }

    // 这里使用对象的方式是可以的，映射关系
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

    .show-enter{
      height: 0;
      opacity: 0;
    }
    .show-enter-to{
      height: 461px;
      opacity: 1;
    }
    .show-enter-active{
      transition: all 1s;
    }
    
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
      // height: 461px;
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