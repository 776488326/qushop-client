<template>
  <div class="home">
    <Header v-if="!$route.meta.isHidden"></Header>
    <router-view></router-view>
    <Footer v-if='!$route.meta.isHidden'></Footer>
  </div>
</template>

<script>
import Footer from "@/components/Footer"
import Header from "@/components/Header"
export default {
  name : "App",
  components : {
    Header,
    Footer,
  },
  mounted(){
    //this.$store.dispatch('getCategoryList');
  }
  
}
</script>

<style lang="less">
  body{
    margin: 0;
    padding: 0;
  }
  .home{
    background-image: url("../public/images/bg-img.png");
    background-position: 0 0;
    background-repeat: no-repeat;
    background-size: cover;
  }
</style>