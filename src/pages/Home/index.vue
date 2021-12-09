<template>
  <div class="home">
    <typenav></typenav>
    <listContainer></listContainer>
    <My></My>
    <recommend></recommend>
    <rank></rank>
    <like></like>
    <floor v-for="(floor) in floorList" :key="floor.id" :floor='floor'></floor>
    <brand></brand>
  </div>
</template>

<script>
import listContainer from "../Home/ListContainer"
import recommend from '../Home/Recommend'
import rank from '../Home/Rank'
import like from '../Home/Like'
import floor from '../Home/Floor'
import brand from '../Home/Brand'
import My from "../Home/My"

import { mapState } from 'vuex'


export default {
    name : "",
    components : {listContainer,recommend,rank,like,floor,brand,My},
    mounted(){
      this.$store.dispatch('getFloorList');
    },
    computed : {
      ...mapState({
        floorList : state => state.home.floorList
      })
    }
}
</script>

<style lang="less" scoped>
  
</style>