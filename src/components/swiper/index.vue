<template>
  <el-carousel height="540px" class="swiper" arrow="never">
    <el-carousel-item v-for="(item,index) in swiperList" :key="index">
      <img :src="item" alt="swiper" :class="view">
    </el-carousel-item>
  </el-carousel>
</template>

<script>

export default {
    name:"Swiper",
    data(){
        return{
          
        }
    },
    props:["swiperList","view"],
}
</script>

<style lang="less" scoped>
  .swiper{
    text-align: center;
    .big{
      width: 1200px;
      height:567px;
    }
    .middle{
      width: 580px;
      height: 400px;
    }
  }
</style>