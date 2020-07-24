<template>
  <!-- 头部 -->
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <!-- 判断用户是否时登录状态，如果时，显示这个p -->
          <p v-if="userInfo.name">
            <!-- <a href="###">登录</a> -->
            <a href="javascript:;">{{userInfo.name}}</a>
            <!-- <a href="###" class="register">免费注册</a> -->
            <a href="javascript:;" class="register" @click="logout">退出登录</a>
          </p>
          <!-- 如果用户不是登录状态，显示这个p -->
          <p v-else>
            <span>请</span>
            <!-- <a href="###">登录</a> -->
            <router-link to="/login">登录</router-link>
            <!-- <a href="###" class="register">免费注册</a> -->
            <router-link to="/register" class="register">免费注册</router-link>
          </p>
        </div>
        <div class="typeList">
          <a href="###">我的订单</a>
          <!-- <a href="###">我的购物车</a> -->
          <router-link to="/shopcart">我的购物车</router-link>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <!-- 声明式导航 -->
        <router-link to="/home" class="logo" title="尚品汇">
          <img src="./images/logo.png" alt />
        </router-link>
        <!-- <a class="logo" title="尚品汇" href="###" target="_blank">
          <img src="./images/logo.png" alt />
        </a>-->
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyword" />
          <button class="sui-btn btn-xlarge btn-danger" type="button" @click="toSearch">搜索</button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: "Header",
  data() {
    return {
      keyword: ""
    };
  },
  mounted(){
    this.$bus.$on('clearKeyword',this.clearKeyword)
  },
  methods: {
    // 点击搜索, 收集搜索参数
    toSearch() {
      // this.$router.push('search/')
      // this.$router.push(`search/${this.keyword}?keyword=${this.keyword.toUpperCase()}`)  // 传参,字符串方式
      // 它返回的是一个promise对象

      // this.$router.push({
      //   // path: "/search",
      //   name:'search',
      //   params:{
      //     keyword: this.keyword || undefined    // params参数传空串会出现问题，所以传递时，我们都要加 undefined，传入undefined就没事
      //   },
      //   query: {
      //     keyword: this.keyword.toUpperCase()
      //   },
      // }).catch(()=>{}); // 用来解决多次点击push的报错问题 一劳永逸的解决办法在router下的index 中

      // 以上都是测试

      let location = {
        name: "search",
        params: {
          //如果传递params参数是一个空串，那么路径会有问题，传过去如果是undefined就没事
          keyword: this.keyword || undefined
        }
      };

      //点击搜索按钮的时候，我们不能只关注params参数，应该去看看原来有没有query参数
      //如果有就应该把query参数也带上
      let { query } = this.$route;
      if (query) {
        location.query = query;
      }

      // 这里跳转的时候要判断,是从首页到search页还是在search内部跳转
      if(this.$route.path !== '/home'){
         this.$router.replace(location)
      }else{
         this.$router.push(location)
      }
     
    },

    // 全局事件总线的回调函数,search中已触发,这边就执行
    clearKeyword(){
      this.keyword = ''
    },


    // 退出登录
    async logout(){
      try {
         await this.$store.dispatch('userLogout')
         alert('退出成功')
         this.$router.push('/home')
      } catch (error) {
        // 这个函数返回的promise一定是成功的
        alert(error)
      }
     
    }
  },

  computed:{
    // 从用户的state 中获取用户的信息
    ...mapState({
      userInfo:state => state.user.userInfo
    })
  }
};
</script>

<style lang="less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>