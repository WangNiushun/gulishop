<template>
  <div class="spec-preview">
    <img :src="defaultImg.imgUrl" />
    <div class="event" @mousemove="move"></div>
    <div class="big">
      <img :src="defaultImg.imgUrl" ref="bigImg"/>
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  props: ["imgList"],
  data() {
    return {
      defaultIndex: 0
    };
  },
  mounted() {
    // 给兄弟组件 imageList 使用全局事件总线绑定自定义事件
    this.$bus.$on("changeDefaultIndex", this.changeDefaultIndex);
  },
  methods: {
    // 自定义事件的回调函数
    changeDefaultIndex(index) {
      this.defaultIndex = index;
    },

    // 移动事件的回调函数
    move(event) {
      let target = event.target; // 事件源元素
      let mouseX = event.offsetX;
      let mouseY = event.offsetY;

      let mask = this.$refs.mask; // 获取到蒙版元素
      // 根据鼠标的位置求出蒙版mask 的位置
      let maskX = mouseX - mask.offsetWidth / 2;
      let maskY = mouseY - mask.offsetHeight / 2;

      // 判断左右临界值
      if (maskX < 0) {
        maskX = 0
      }else if(maskX > target.clientWidth - mask.offsetWidth){
        // 一般这样的临界值判断:我们把前面用clientWidth,不带边框 ; 后面的要使用offsetWidth, 带边框
        maskX = target.clientWidth - mask.offsetWidth
      }
  
      // 判断上下临界值
      if(maskY < 0 ){
        maskY = 0
      }else if(maskY > target.clientHeight - mask.offsetHeight){
        maskY = target.clientHeight - mask.offsetHeight
      }

      // 将计算好的设置给mask
      mask.style.left = maskX + 'px'
      mask.style.top = maskY + 'px'

      // 大图的移动位置 = mask移动的2倍,只不过是相反方向
      let bigImg = this.$refs.bigImg
      bigImg.style.left = -2 * maskX + 'px'
      bigImg.style.top = -2 * maskY + 'px'
    }
  },
  computed: {
    defaultImg() {
      // 判断传递的数据, 绝对不能是undefined, 因为上面要使用 . 语法, undefined. 会报错, 虽然不影响页面,但是让我心烦
      if (this.imgList) {
        return this.imgList[this.defaultIndex];
      } else {
        return [];
      }
    }
  }
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>