<template>
  <!--商标-->
  <div class="brand">
    <el-card class="box-card" v-for="(item,index) in brandList" :key="index" shadow="hover" @click.native="toSearch(item._id)">
        <p><img :src="item.logoUrl" :alt="item.tmName"></p>
        <p>{{item.tmName}}</p>
    </el-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: "Brand",
  props:["brandList"],
  methods:{
    toSearch(id){
      this.setSearchParams({tradeMarkId:id});
      this.$router.push('/search');
    },
    ...mapActions("search",["setSearchParams"])
  }
};
</script>

<style lang="less" scoped>
.brand {
  margin: 50px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  height: 300px;
  .box-card {
    width: 180px;
    height: 130px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p{
        flex: 1;
        img{
            width: 100px;
            height: 80px;
        }
        color: #f70;
    }
    
  }
  &>:hover{
        cursor: pointer;
        transform: scale(1.05);
        transition: all .3s ease;
    }
}
</style>