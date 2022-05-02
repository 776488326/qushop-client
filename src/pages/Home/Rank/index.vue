<template>
  <!-- 商品排行 -->
  <div class="rank">
    <div class="tab">
      <div class="left">热门推荐</div>
      <div class="right" @click="refresh">
        <i class="el-icon-refresh-right"></i>
      </div>
    </div>
    <div class="container">
      <div class="img-item" v-for="(item, index) in hotTopList" :key="index" @click="toDetail(item._id)">
        <p class="tab-pic">
          <a href="#">
            <img :src="item.skuImageList[0].imgUrl" />
          </a>
        </p>
        <div class="tab-info">
          <div class="info-title">
            <a href="#">{{ item.skuName }}</a>
            <p>{{ item.skuDesc }}</p>
          </div>
          <p class="info-price">¥{{ item.price }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: "Rank",
  data(){
    return{
      hotTopList: [],
      total: 0,
      count: 0,
    }
  },
  async created(){
    const res = await this.getHotTop(0);
    if(res.code == 200){
      this.hotTopList = res.data;
      this.total = res.msg;
      this.count = Math.ceil(this.total/4)-1;
    }else{
      this.$message.error(res.msg);
    }
  },
  methods:{
    ...mapActions("site",["getHotTop"]),
    async refresh(){
      if(this.count == 0){
        this.count = Math.ceil(this.total/4);
      }
      const res = await this.getHotTop(this.total-this.count*4);
      this.count--;
      if(res.code == 200){
        this.hotTopList = res.data;
      }else{
        this.$message.error(res.msg);
      }
    },
    toDetail(id){
      this.$router.push(`/detail/${id}`);
    }
  }
};
</script>

<style lang="less" scoped>
.rank {
  margin-top: 50px;
  .tab {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .left {
      text-align: center;
      vertical-align: middle;
      padding: 15px;
    }
    .right {
      text-align: center;
      vertical-align: middle;
      padding: 15px;
    }
  }

  .container {
    box-sizing: border-box;
    display: flex;
    flex-wrap: nowrap;
    align-items: stretch;
    padding: 0px 5px;
    .img-item {
      flex: 1;
      background: #fff;
      margin: 10px 5px;
      .tab-pic {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        box-sizing: border-box;
        padding: 25px;
        a {
          display: inline-block;
          width: 200px;
          height: 200px;
          text-align: center;
          img {
            height: 100%;
          }
        }
      }

      .tab-info {
        .info-title {
          text-align: center;
          margin: 20px;
          a {
            text-decoration: none;
            font-weight: bold;

            color: #000;
          }
          p {
            color: #aaa;
            margin: 10px 0;
          }
        }

        .info-price {
          text-align: center;
          color: #df3033;
          font-size: 16px;
          line-height: 30px;
          margin: 30px 0;
          font-weight: 700;
        }
      }
      
    }
    &>:hover{
        transform: scale(1.01);
        box-shadow: 0 15px 30px rgba(0, 0, 0, .1);
        transition: all .2s ease;
      }
  }
}
</style>