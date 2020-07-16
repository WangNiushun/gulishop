<template>
  <!--楼层-->
  <div class="floor">
    <div class="py-container">
      <div class="title clearfix">
        <h3 class="fl">{{floor.name}}</h3>
        <div class="fr">
          <ul class="nav-tabs clearfix">
            <li v-for="(nav) in floor.navList" :key="nav.text">
              <a href="#tab1" data-toggle="tab">{{nav.text}}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="tab-content">
        <div class="tab-pane">
          <div class="floor-1">
            <div class="blockgary">
              <ul class="jd-list">
                <li v-for="(keyword, index) in floor.keywords" :key="index">{{keyword}}</li>
              </ul>
              <img :src="floor.imgUrl" />
            </div>
            <!-- floor轮播 -->
            <div class="floorBanner">
              <SliderLoop :bannerList="floor.carouselList"></SliderLoop>
            </div>
            <div class="split">
              <span class="floor-x-line"></span>
              <div class="floor-conver-pit">
                <img :src="floor.recommendList[0]" />
              </div>
              <div class="floor-conver-pit">
                <img :src="floor.recommendList[1]" />
              </div>
            </div>
            <div class="split center">
              <img :src="floor.bigImg" />
            </div>
            <div class="split">
              <span class="floor-x-line"></span>
              <div class="floor-conver-pit">
                <img :src="floor.recommendList[2]" />
              </div>
              <div class="floor-conver-pit">
                <img :src="floor.recommendList[3]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Swiper from "swiper"
// import "swiper/css/swiper.min.css"


export default {
  name: "Floor",
  props: ["floor"], // 这里有三种写法


  mounted() {
    // 为了复用,这个我们也写在 watch 中
    // new Swiper(this.$refs.floor1Swiper, {
    //   // direction: "vertical", // 垂直切换选项
    //   loop: true, // 循环模式选项
    //    autoplay: true,
    //   // 如果需要分页器
    //   pagination: {
    //     el: ".swiper-pagination"
    //   },
    //   // 如果需要前进后退按钮
    //   navigation: {
    //     nextEl: ".swiper-button-next",
    //     prevEl: ".swiper-button-prev"
    //   },
    // });
  },

  // watch: {
  //   floor: {
  //     // 监视的属性发生变化后,需要执行的函数就写在handler方法中
  //     handler() {
  //       // 是在最近的更新dom之后会立即调用传入nextTick的回调函数
  //       this.$nextTick(() => {
  //         // console.log(this)  // 这个this 是组件对象
  //         new Swiper(this.$refs.floor1Swiper, {
  //           // direction: "vertical", // 垂直切换选项
  //           loop: true, // 循环模式选项

  //           autoplay: true, //等同于以下设置
  //           // autoplay: {
  //           //   delay: 3000,
  //           //   stopOnLastSlide: false,
  //           //   disableOnInteraction: true
  //           // },


  //           // 如果需要分页器
  //           pagination: {
  //             el: ".swiper-pagination"
  //           },

  //           // 如果需要前进后退按钮
  //           navigation: {
  //             nextEl: ".swiper-button-next",
  //             prevEl: ".swiper-button-prev"
  //           }
  //         });
  //       })
  //     },
  //     immediate:true,  // 立即执行, 在最近的dom更新之前就会执行, 它会跳过nexnetTick,直接执行nexnetTick里面的代码


  //   }
  // }
};
</script>

<style lang="less" scoped>
.floor {
  margin-top: 15px;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .title {
      .fl {
        float: left;
        color: #c81623;
        font-size: 20px;
        line-height: 30px;
        margin: 9px 0;
        font-weight: 700;
      }

      .fr {
        float: right;

        .nav-tabs {
          margin: 10px 0 0;
          display: inline-block;

          li {
            float: left;
            line-height: 18px;

            a {
              padding-top: 1px;
              font-weight: 400;
              background-color: #fff;

              &::after {
                content: "|";
                padding: 0 10px;
              }
            }

            &:nth-child(7) {
              a {
                &::after {
                  content: "";
                }
              }
            }

            &.active {
              a {
                color: #e1251b;
              }
            }
          }
        }
      }
    }

    .tab-content {
      border-top: 2px solid #c81623;
      border-bottom: 1px solid #e4e4e4;

      .tab-pane {
        .floor-1 {
          height: 360px;
          display: flex;

          .blockgary {
            width: 210px;
            height: 100%;
            background: #f7f7f7;

            .jd-list {
              padding: 15px 0;
              overflow: hidden;

              li {
                list-style-type: none;
                float: left;
                width: 40%;
                margin: 0 10px;
                border-bottom: 1px solid #e4e4e4;
                text-align: center;
                line-height: 26px;
              }
            }

            img {
              width: 100%;
            }
          }

          .floorBanner {
            width: 330px;
            height: 100%;
          }

          .split {
            width: 220px;
            height: 100%;
            position: relative;

            .floor-x-line {
              position: absolute;
              background: #e4e4e4;
              width: 220px;
              height: 1px;
              top: 180px;
            }

            .floor-conver-pit {
              width: 100%;
              height: 50%;

              img {
                width: 100%;
                height: 100%;
                transition: all 400ms;

                &:hover {
                  opacity: 0.8;
                }
              }
            }
          }

          .center {
            border: 1px solid #e4e4e4;
          }
        }
      }
    }
  }
}
</style>
