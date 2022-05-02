<template>
  <div class="orderInfo">
    <div class="addressInfo">
      <h2>选择收货地址</h2>
      <div class="cards">
        <el-card class="box-card" :class="{active:isSel==index}" @click.native="selAddress(index)"  v-for="(item,index) in userInfo.addressList" :key="index" shadow="hover">
          <div slot="header" class="clearfix">
            <span>收货人（{{item.name}}）</span>
          </div>
          <div class="text">
            <span>地址：{{item.address}}</span>
            <span>手机号：{{item.phone}}</span>
          </div>
        </el-card>
      </div>
    </div>
    <div class="shopInfo">
      <h2>确认订单信息</h2>
      <el-table
        ref="cartTable"
        :data="selectInfo.shopList"
        tooltip-effect="light"
        :header-cell-style="{ background: 'rgba(0,0,0,0.2)' }"
        :row-style="{ background: 'none' }"
        style="width: 100%"
        @selection-change="selChange"
      >
        <el-table-column prop="skuName" label="商品"> </el-table-column>
        <el-table-column prop="skuImg" label="图片">
          <template slot-scope="scope">
            <img :src="scope.row.skuImg" alt="" width="100px" />
          </template>
        </el-table-column>
        <el-table-column prop="count" label="数量"> </el-table-column>
        <el-table-column label="总价">
          <template slot-scope="scope">
            <span style="color: #f70">{{
              scope.row.price * scope.row.count
            }}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="submit">
        <el-card class="submitBox">
          <span>总计：<i>{{selectInfo.count}}</i>件</span>
          <span>实付款¥：<i>{{selectInfo.total}}</i></span>
          <span>收货人：<i>{{userInfo.addressList[isSel].name}} {{userInfo.addressList[isSel].phone}}</i></span>
          <span>收货地址：<i>{{userInfo.addressList[isSel].address}}</i></span>
        </el-card>
        <el-button type="danger" @click="pay">立即支付</el-button>
      </div>
    </div>
    <el-dialog
      title="扫码支付"
      :visible.sync="isDisplay"
      width="30%"
      center
      open="open">
      <img :src="url" style="width:100%">
      <span slot="footer" class="dialog-footer">
        <el-button @click="isDisplay = false">取消支付</el-button>
        <el-button type="primary" @click="success">已完成支付</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import QRCode from 'qrcode';
const generateQR = async text => {
  try {
    return await QRCode.toDataURL(text);
  } catch (err) {
    console.error(err)
  }
};
export default {
  name: "Pay",
  props: ["selectInfo"],
  data() {
    return {
      isSel:0,
      isDisplay:false,
      url:"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-764647c8-fd81-4a31-845f-c0bf285f2096/a617544b-d1b2-4ae6-8ae2-002c6cda06a3.png"
    }
  },
  computed:{
    ...mapState("user",["userInfo"])
  },
  methods:{
    ...mapActions("order",["createOrder"]),
    selAddress(index){
      this.isSel = index;
      console.log(index);
    },
    async pay(){
      this.url = await generateQR("https://776488326.github.io/");
      this.isDisplay = true;
    },
    async success(){
      let tradeInfo = {"orderInfo":this.selectInfo,"addressInfo":this.userInfo.addressList[this.isSel],"userId":this.userInfo._id};
      let res = await this.createOrder(tradeInfo);
      if(res.code == 200){
        this.isDisplay = false;
        this.$router.replace("/paysuccess");
      }else{
        this.$message.error("订单创建失败！");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.orderInfo {
  margin-top: 50px;
  width: 1200px;
  margin: auto;
  display: flex;
  flex-direction: column;
  .shopInfo {
    width: 100%;
    display: flex;
    flex-direction: column;
    h2{
      margin-bottom: 30px;
    }
    .submit{
      margin-top: 50px;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      .submitBox{
        width: 500px;
        display: flex;
        flex-direction: column;
        border: solid #f70;
        span{
          margin: 10px;
          display: block;
        }
        i{
          font-size: 16px;
          color: #f70;
        }
      }
      button{
        margin: 50px 0px;
        

      }
    }
  }
  .addressInfo {
    width: 100%;
    display: flex;
    flex-direction: column;
    .cards{
      display: flex;
      margin: 30px;
      justify-content: space-evenly;
      .box-card{
        min-width: 300px;
      }
      .text{
        display: flex;
        flex-direction: column;
        span{
          margin: 10px 0px;
        }
      }
      &>:hover{
        cursor: pointer;
      }
    }
    .active{
      border-color: #f70;
    }
  }
  /deep/.el-table {
    background: none;
  }
  /deep/.el-card{
    background:none;
    border: 2px dashed;
  }
  .dialog{

    img{
      text-align: center;
    }
  }
}
</style>