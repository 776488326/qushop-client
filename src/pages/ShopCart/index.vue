<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(item) in shopcartList" :key="item.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked='item.isChecked' @click="updateShopCartState(item)">
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl">
            <div class="item-msg">{{item.skuName}}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{item.skuPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="changeCartNum(item,-1,true)">-</a>
            <input autocomplete="off" type="text" :value="item.skuNum" minnum="1" class="itxt" @change="changeCartNum(item,$event.target.value*1,false)">
            <a href="javascript:void(0)" class="plus" @click="changeCartNum(item,1,true)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{item.skuPrice*item.skuNum}}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteOne(item)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" v-model="isCheckAll">
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="deleteAll">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{checkNum}}</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{checkPrice}}</i>
        </div>
        <div class="sumbtn">
          <router-link to="/trade" class="sum-btn">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
  export default {
    name: 'ShopCart',
    beforeMount(){
      this.$store.dispatch('getShopCartList')
    },
    computed :{
      ...mapGetters({
        shopcartList : 'shopcartList'
      }),
      // 简写为函数形式的变量只能读不能写

      // 统计已选择的总数
      checkNum(){
        return this.shopcartList.reduce((prev,item)=>{
          if(item.isChecked){
            prev+=item.skuNum
          }
          return prev
        },0)
      },
      // 统计已选择的总价
      checkPrice(){
        return this.shopcartList.reduce((prev,item)=>{
          if(item.isChecked)
          {
            prev+=item.skuNum*item.skuPrice
          }
          return prev
        },0)
      },

      // 计算全选数据
      isCheckAll:{
        get(){
          return this.shopcartList.every(item=>item.isChecked)
        },
        async set(val){
          try {
            await this.$store.dispatch('updateShopCartAllState',val?1:0);
            this.$store.dispatch('getShopCartList')
          } catch (error) {
            alert(error.message)          
          }
        }
      }
    },
    methods:{
      async changeCartNum(item,disNum,flag){
        if(flag)
        {
          if(item.skuNum+disNum<1)
          {
            disNum = 1-item.skuNum
          }
        }
        else
        {
          if(disNum<1)
          {
            disNum = 1-item.skuNum
          }
          else
          {
            disNum = disNum - item.skuNum
          }
        }
        try {
          console.log(disNum);
          await this.$store.dispatch('updateShopCartNum',{skuId:item.skuId,skuNum:disNum})
        } catch (error) {
          alert(error.message)
        }
        this.$store.dispatch('getShopCartList')
      },
      async updateShopCartState(item){
        try {
          await this.$store.dispatch('updateShopCartState',{skuId:item.skuId,isChecked:item.isChecked?'0':'1'})
        } catch (error) {
          alert(error.message)          
        }
        this.$store.dispatch('getShopCartList')
      },
      async deleteOne(cart){
        try {
          await this.$store.dispatch('deleteShopCart',cart.skuId)
          this.$store.dispatch('getShopCartList')
        } catch (error) {
          alert(error.message)
        }
      },
      async deleteAll(){
        try {
          await this.$store.dispatch('deleteAllShopCart')
          this.$store.dispatch('getShopCartList')
        } catch (error) {
          alert(error.message)
        }

      }
    }
  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #aaa;
        height: 50px;
        line-height: 30px;
        padding: 10px;
        box-sizing: border-box;
        border-radius: 20px 20px 0px 0px;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        .cart-list {
          display: flex;
          align-items: center;
          box-sizing: border-box;
          padding: 30px 10px;
          background: hsla(0,0,100%,.5);
          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 15%;
          }

          .cart-list-con2 {
            width: 35%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

          .cart-list-con4 {
            width: 10%;

          }

          .cart-list-con5 {
            width: 15%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 12%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 13%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 30px auto;
      a{
        text-decoration: none;
      }
      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        position: relative;
        left: -200px;
        a {
          float: left;
          padding: 0 10px;
          color: #666;
          &:hover{
            color: #333 !important;
          }
        }
      }

      .money-box {
        display: flex;
        align-items: center;
        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 35px;
            line-height: 35px;
            color: green;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: rgba(180, 180, 180, .8);
            border-radius: 16px;
            overflow: hidden;
            &:hover{
              color: green !important;
            }
          }
        }
      }
    }
  }
</style>