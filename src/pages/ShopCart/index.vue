<template>
  <div class="shopcart">
    <div class="display" v-if="shopcartList.length">
      <div class="table">
        <el-table
          ref="cartTable"
          :data="shopcartList"
          tooltip-effect="light"
          :header-cell-style="{ background: 'rgba(0,0,0,0.2)' }"
          :row-style="{ background: 'none' }"
          style="width: 100%"
          @selection-change="selChange"
        >
          <el-table-column type="selection" width="100"> </el-table-column>
          <el-table-column prop="skuName" label="商品"> </el-table-column>
          <el-table-column prop="skuImg" label="图片">
            <template slot-scope="scope">
              <img :src="scope.row.skuImg" alt="" width="100px" />
            </template>
          </el-table-column>
          <el-table-column prop="attrList" label="属性" width="300px">
            <template slot-scope="scope">
              <el-tag
                type="info"
                v-for="(item, index) in scope.row.attrList"
                :key="index"
                >{{ item.saleAttrValueId }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="price" label="单价"> </el-table-column>
          <el-table-column prop="count" label="数量"> </el-table-column>
          <el-table-column label="总价">
            <template slot-scope="scope">
              <span style="color: #f70">{{
                scope.row.price * scope.row.count
              }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="handle">
        <div class="left">
          <el-checkbox v-model="isall">全选</el-checkbox>
          <el-link type="danger" :underline="false" @click="delSel"
            >删除选中</el-link
          >
        </div>
        <div class="right">
          <span class="count"
            >已选中商品<i>{{ selectInfo.count }}</i
            >件</span
          >
          <span
            >合计(不含运费)：¥<i>{{ selectInfo.total }}</i></span
          >
          <el-button type="info" plain @click="submit">提交订单</el-button>
        </div>
      </div>
    </div>
    <el-empty v-else description="还没有商品呦，先去添加商品吧！"></el-empty>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  name: "ShopCart",
  data() {
    return {
      isall: false,
      selectInfo: {
        count: 0,
        total: 0,
        shopList: [],
      },
    };
  },
  beforeMount() {
    this.getShopCartList(this.cartId);
  },
  computed: {
    ...mapState("user", ["userInfo"]),
    ...mapGetters("shopcart", ["shopcartList"]),
    cartId() {
      return this.userInfo.cartList;
    },
  },
  methods: {
    ...mapActions("shopcart", ["getShopCartList", "deleteShopCart"]),
    selChange(select) {
      const res = select.reduce(
        (prev, cur) => {
          prev.count += cur.count;
          prev.total += cur.count * cur.price;
          prev.shopList.push(cur);
          return prev;
        },
        { count: 0, total: 0, shopList: [] }
      );
      this.selectInfo.count = res.count;
      this.selectInfo.total = res.total;
      this.selectInfo.shopList = res.shopList;
    },
    async delSel() {
      let skuIds = this.selectInfo.shopList.reduce((prev, cur) => {
        prev.push(cur._id);
        return prev;
      }, []);
      if(skuIds.length&&this.cartId){
        const res = await this.deleteShopCart({
          cartId: this.cartId,
          skuIds: skuIds,
        });
        if (res != "ok") {
          this.$message.error(res);
        }
        this.getShopCartList(this.cartId);
      }else{
        this.$message({"type":"warn","message":"您还未选中商品，请选中后再试！"});
      }
    },
    submit(){
      if(this.selectInfo.count==0){
        this.$message({"type":"warn","message":"您还未选中商品，请选中后再试！"});
      }else{
        this.$router.push({
          path:"/pay",
          query:{
            selectInfo:this.selectInfo
          }
        });
      }
    }
  },
  watch: {
    isall(val) {
      if (val == true) {
        this.$refs.cartTable.toggleAllSelection();
      } else {
        this.$refs.cartTable.clearSelection();
      }
    },
  },
};
</script>

<style lang="less" scoped>
.shopcart {
  width: 1200px;
  margin: auto;
  min-height: 50vh;
  display: flex;
  flex-direction: column;

  /deep/.el-table {
    background: none;
  }
  .handle {
    margin-top: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      flex: 1;
      display: flex;
      a {
        margin-left: 60px;
        text-decoration: none;
      }
    }
    .right {
      flex: 2;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      span {
        i {
          vertical-align: middle;
          font-size: 18px;
          margin: 0px 5px;
          color: #f70;
        }
      }
      .count {
        margin-right: 25px;
        i {
          vertical-align: middle;
          font-size: 18px;
          margin: 0px 5px;
          color: #f70;
        }
      }
    }
  }
}
</style>