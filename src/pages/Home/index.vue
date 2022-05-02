<template>
  <div class="home">
    <Swiper v-bind:swiperList="siteInfo.swiperList" class="swiper" view="big"></Swiper>
    <rank class="rank"></rank>
    <BestSelect v-bind:bestAdvImg="siteInfo.bestAdvImg" class="best"></BestSelect>
    <brand class="brand" v-bind:brandList="brandList"></brand>
  </div>
</template>

<script>
import rank from '../Home/Rank'
import brand from '../Home/Brand'
import BestSelect from "../Home/BestSelect"
import { mapActions, mapState } from 'vuex'

export default {
    name : "",
    components : {rank,brand,BestSelect},
    data(){
      return{
      }
    },
    created(){
      this.getSiteInfo();
    },
    methods:{
      ...mapActions("site",["getSiteInfo"])
    },
    computed : {
      ...mapState("site",["siteInfo","brandList"])
    }
}
</script>

<style lang="less" scoped>
  .home{
    width: 1200px;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    margin: auto;
    .swiper{
      width: 100%;
      box-sizing: border-box;
      border: 1px solid #ff770088;
      padding: 2px;
      border-radius: 4px;
      overflow: hidden;
    }
    .rank{
      width: 100%;
      box-sizing: border-box;
      border: 1px solid #ff770088;
      border-radius: 4px;
    }
    .best{
      width: 100%;
      box-sizing: border-box;
      border: 1px solid #ff770088;
      border-radius: 4px;
    }
    .brand{
      width: 100%;
      box-sizing: border-box;
      border: 1px solid #ff770088;
      border-radius: 4px;
      padding: 10px;
    }
  }
</style>