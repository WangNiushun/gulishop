<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <!-- <Footer v-if="$route.path ==='/home' || $route.path==='/search'"></Footer>   -->
    <Footer v-if="!$route.meta.isHide"></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header"; //
import Footer from "@/components/Footer";
import { reqCategoryList } from "@/api";
export default {
  name: "App",
  components: {
    Header,
    Footer
  },

   created() {
    // 挂载成功后，开始执行发送请求函数获取数据，但是一般不会在这里直接写 dispatch,我们一般在methods 中
  
    this.getCategoryList();
  },
  methods: {
    getCategoryList() {
      this.$store.dispatch("getCategoryList");
    }
  }
  // 测试接口函数能否能够使用
  // mounted(){
  //   reqCategoryList()
  // }
};
</script>

<style lang="less" scoped>
</style>