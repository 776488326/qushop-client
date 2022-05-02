<template>
  <div class="paysuccess">
      <el-result icon="success" title="支付成功" subTitle="去看看别的吧！" class="tip">
        <template slot="extra">
          <el-button type="info" size="medium" plain> <router-link :to="{path:'/order',query:{userId:userInfo&&userInfo._id}}">查看订单</router-link> </el-button>
          <el-button type="info" size="medium" plain> <router-link to="/home">回到首页</router-link> </el-button>
        </template>
      </el-result>
  </div>
</template>

<script>
import { mapState } from 'vuex'
  export default {
    name: 'PaySuccess',
    computed:{
      ...mapState("user","userInfo")
    }
  }
</script>

<style lang="less" scoped>
  .paysuccess{
    width: 1200px;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 50vh;
    a{
      text-decoration: none;
    }
  }
</style>