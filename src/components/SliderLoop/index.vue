<template>
  <div class="swiper-container" id="mySwiper" ref="banner">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(banner) in bannerList" :key="banner.id">
        <img :src="banner.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
// 要想使用swiper, 引入 js 和 css
import Swiper from "swiper";
import "swiper/css/swiper.min.css";

export default {
  name: "sliderLoop",
  props:['bannerList'],
  watch: {
    bannerList: {
      // 监视的属性发生变化后,需要执行的函数就写在handler方法中
      handler() {
        // 是在最近的更新dom之后会立即调用传入nextTick的回调函数
        this.$nextTick(() => {
          new Swiper(this.$refs.banner, {
            // direction: "vertical", // 垂直切换选项
            loop: true, // 循环模式选项

            autoplay: true, //等同于以下设置
            // autoplay: {
            //   delay: 3000,
            //   stopOnLastSlide: false,
            //   disableOnInteraction: true
            // },

            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination"
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev"
            }
          });
        });
      },
      immediate: true // 立即执行, 在最近的dom更新之前就会执行, 它会跳过nexnetTick,直接执行nexnetTick里面的代码
    }
  }
};
</script>

<style lang="less" scoped>
</style>
