<template>
<!-- 缩略图的轮播 -->  
  <div class="swiper-container" ref="imgList">
    <div class="swiper-wrapper">
      <!-- 轮播图片, 遍历 -->
      <div class="swiper-slide" v-for="(img,index) in imgList" :key="img.id">
        <img :src="img.imgUrl" :class="{active:currentIndex === index}" @click="changeIndex(index)"> 
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template> 

<script>
  // 要想使用swiper, 引入 js 和 css
import Swiper from "swiper";
import "swiper/css/swiper.min.css";
  export default {
    name: "ImageList",
    props:['imgList'],
    data() {
      return {
        currentIndex : 0
      }
    },
    methods:{
      changeIndex(index){
        this.currentIndex = index
        // 向父组件中传递当前点击的小图的下标
        this.$bus.$emit('changeDefaultIndex',index)
      }
    },

    watch: {
    imgList: {
      // 监视的属性发生变化后,需要执行的函数就写在handler方法中
      handler() {
        // 是在最近的更新dom之后会立即调用传入nextTick的回调函数
        this.$nextTick(() => {
          new Swiper(this.$refs.imgList, {
            // direction: "vertical", // 垂直切换选项,一般不选则,默认就是水平
            // loop: true, // 循环模式选项

            // autoplay: true, //等同于以下设置
            // autoplay: {
            //   delay: 3000,
            //   stopOnLastSlide: false,
            //   disableOnInteraction: true
            // },

            // 如果需要分页器
            // pagination: {
            //   el: ".swiper-pagination"
            // },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev"
            },
            slidesPerGroup:5, // 点击一下啊,滑动一组由多少张
            slidesPerView:5   // 一屏显示多少张
          });
        });
      },
      immediate: true // 立即执行, 在最近的dom更新之前就会执行, 它会跳过nexnetTick,直接执行nexnetTick里面的代码
    }
  }
  }
</script>

<style lang="less" scoped>
  .swiper-container {
    height: 56px;
    width: 412px;
    box-sizing: border-box;
    padding: 0 12px;

    .swiper-slide {
      width: 56px;
      height: 56px;

      img {
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
        padding: 2px;
        width: 50px;
        height: 50px;
        display: block;

        &.active {
          border: 2px solid #f60;
          padding: 1px;
        }

        // &:hover {
        //   border: 2px solid #f60;
        //   padding: 1px;
        // }
      }
    }

    .swiper-button-next {
      left: auto;
      right: 0;
    }

    .swiper-button-prev {
      left: 0;
      right: auto;
    }

    .swiper-button-next,
    .swiper-button-prev {
      box-sizing: border-box;
      width: 12px;
      height: 56px;
      background: rgb(235, 235, 235);
      border: 1px solid rgb(204, 204, 204);
      top: 0;
      margin-top: 0;
      &::after {
        font-size: 12px;
      }
    }
  }
</style>