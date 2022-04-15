<template>
  <div class="home">
    <Header v-if="!$route.meta.isHidden"></Header>
    <router-view class="content"></router-view>
    <Footer v-if='!$route.meta.isHidden'></Footer>
    <toTop></toTop>
  </div>
</template>

<script>
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import toTop from "@/components/toTop"
export default {
  name : "App",
  components : {
    Header,
    Footer,
    toTop
  },
  mounted(){
    this.$store.dispatch('getCategoryList');
  }
  
}
</script>

<style lang="less">
  html,body{
    height: 100%;
  }
  .home{
    min-height: 100%;
    background-image: url("../public/images/bg-img.png");
    background-position: 0 0;
    background-repeat: no-repeat;
    overflow-x: hidden;
    background-size: cover;
    .content{
      min-height: 344px;
    }
  }
</style>