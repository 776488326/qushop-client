<template>
  <div class="detail">
    <!-- 主要内容区域 -->
    <section class="con">
      <!-- 主要内容区域 -->
      <div class="mainCon">
        <!-- 左侧放大镜区域 -->
        <div class="previewWrap">
          <!--放大镜效果-->
          <Zoom :imgList="imgList" />
          <!-- 小图列表 -->
          <ImageList :imgList="imgList" />
        </div>
        <!-- 右侧选择区域布局 -->
        <div class="InfoWrap">
          <div class="goodsDetail">
            <h3 class="InfoName">{{ skuInfo.skuName }}</h3>
            <p class="news">{{ skuInfo.skuDesc }}</p>
            <div class="priceArea2">
              <div class="title">
                <i><pre>促    销</pre></i>
              </div>
              <div class="fixWidth">
                <i class="red-bg">加价购</i>
                <em class="t-gray"
                  >满999.00另加20.00元，或满1999.00另加30.00元，或满2999.00另加40.00元，即可在购物车换购热销商品</em
                >
              </div>
            </div>
            <div class="priceArea1">
              <div class="box">
                <div class="title"><pre>价    格</pre></div>
                <div class="price">
                  <i>¥</i>
                  <em>{{ skuInfo.price }}</em>
                </div>
              </div>
              <div class="remark">
                <i>累计评价</i>
                <em>65545</em>
              </div>
            </div>
          </div>

          <div class="choose">
            <div class="chooseArea">
              <el-link v-for="(item,index) in skuInfo.skuSaleAttrValueList" :key="index" type="primary" :underline="false">{{item.saleAttrValueId}}</el-link>
            </div>
            <div class="count">
              <el-link type="success" :underline="false">已售：{{skuInfo.saled}}件</el-link>
              <el-link type="danger" :underline="false" style="margin-left:30px;">仅剩：{{skuInfo.stock}}件</el-link>
            </div>
            <div class="cartWrap">
              <el-input-number v-model="skuNum" controls-position="right" :min="1" :max="skuInfo.stock"></el-input-number>
              <el-button type="info" plain icon="el-icon-goods" class="add" @click="addShopCategory">加入购物车</el-button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 内容详情页 -->
    <section class="product-detail">
      <img src="./images/1.png" alt="">
      <img src="./images/2.png" alt="">
      <img src="./images/3.1.png" alt="">
      <img src="./images/3.2.png" alt="">
      <img src="./images/4.1.png" alt="">
      <img src="./images/4.2.png" alt="">
      <img src="./images/5.jpg.png" alt="">
      <img src="./images/5.png" alt="">
      <img src="./images/6.1.png" alt="">
      <img src="./images/6.2.png" alt="">
      <img src="./images/6.3.png" alt="">
      <img src="./images/7.png" alt="">
      <img src="./images/8.png" alt="">
      <img src="./images/9.png" alt="">
      <img src="./images/10.jpg.png" alt="">
      <img src="./images/11.png" alt="">
      <img src="./images/12.1.png" alt="">
      <img src="./images/13.png" alt="">
    </section>
  </div>
</template>

<script>
import ImageList from "./ImageList/ImageList";
import Zoom from "./Zoom/Zoom";
import { mapActions, mapState } from "vuex";
export default {
  name: "Detail",
  components: {
    ImageList,
    Zoom,
  },
  data() {
    return {
      skuNum: 1,
    };
  },
  props: ["skuId"],
  mounted() {
    this.getDetailInfo(this.skuId);
  },
  methods: {
    ...mapActions("detail", ["getDetailInfo"]),
    async addShopCategory(){
      const shopInfo= {
        skuId:this.skuInfo._id,
        skuName:this.skuInfo.skuName,
        attrList:this.skuInfo.skuSaleAttrValueList,
        count:this.skuNum,
        price:this.skuInfo.price,
        isChecked:false,
        skuImg:this.skuInfo.skuDefaultImg,
      };
      const cartId = this.userInfo.cartList;
      const res = await this.$API.reqUpdateShopNum(cartId,shopInfo);
      if(res.code == 200){
        this.$message.success("已添加到购物车");
      }else{
        this.$message.console.error(res.data);
      }
    }
  },
  computed: {
    ...mapState("detail", ["skuInfo"]),
    ...mapState("user", ["userInfo"]),
    imgList() {
      return this.skuInfo.skuImageList || [];
    },
  },
};
</script>

<style lang="less" scoped>
.detail {
  .con {
    width: 1200px;
    margin: 50px auto 0;

    .mainCon {
      box-sizing: border-box;
      width: 100%;
      // background-color: rgba(255,255,255,.3);
      border-radius: 10px;
      padding: 5px;
      display: flex;
      justify-content: space-around;
      align-items: stretch;
      .previewWrap {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
      }
      .InfoWrap {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .goodsDetail {
          flex: 2;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          .InfoName {
            font-size: 14px;
            line-height: 21px;
          }

          .news {
            color: #e12228;
            margin-top: 15px;
          }

          .priceArea1 {
            display:  flex;
            justify-content: space-between;
            align-items: center;
            .box{
              display: flex;
              justify-content: space-between;
              align-items: center;
              .price {
                margin-left: 30px;
                font-size: 20px;
                color: #f70;
                em {
                  font-size: 24px;
                  font-weight: 700;
                }
              }
            }
          }

          .priceArea2 {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .title {
              margin-right: 30px;
            }

            .fixWidth {
              justify-content: space-between;
              .red-bg {
                background: rgba(255, 100, 10%, 0.5);
                color: #fff;
                padding: 3px;
                border-radius: 5px;
                margin-right: 10px;
              }

              .t-gray {
                font-size: 14px;
                line-height: 1.5;
                color: #999;
              }
            }
          }
        }

        .choose {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          .chooseArea {
            display: flex;
            justify-content: space-between;
          }
            a{
              text-decoration: none;
            }

          .cartWrap {
            display: flex;
            .add{
              margin-left: 50px;
            }
          }
        }
      }
    }
  }

  .product-detail {
    width: 100%;
    margin: 100px auto 0;
    display: flex;
    flex-direction: column;
    img{
      width: 100%;
    }
  }
}
</style>