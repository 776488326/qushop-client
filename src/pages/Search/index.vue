<template>
  <div class="container">
    <div class="option">
      <div class="brand">
        <el-link
          type="primary"
          :underline="false"
          icon="el-icon-s-shop"
          class="title"
          >品牌</el-link
        >
        <p class="box">
          <el-button
            class="item"
            type="info"
            v-for="(item, index) in brandList"
            :key="index"
            @click="changeTmark(item._id)"
            plain
            >{{ item.tmName }}</el-button
          >
        </p>
      </div>
      <div class="category">
        <div
          class="item"
          v-for="(item, index) in secondCategoryList"
          :key="index"
        >
          <el-link
            type="success"
            class="title"
            icon="el-icon-s-data"
            :underline="false"
            >{{ item.name }}</el-link
          >
          <p class="box">
            <el-button
              class="bt"
              type="info"
              v-for="(cur, index) in item.category3"
              :key="index"
              plain
              @click="changeCategory(cur._id)"
              >{{ cur.name }}</el-button
            >
          </p>
        </div>
      </div>
    </div>
    <div class="search">
      <div class="tab">
        <el-link icon="el-icon-sort-down" type="danger" :underline="false" class="sort" @click="changeSort(-1)">降序</el-link>
        <el-link icon="el-icon-sort-up" type="danger" :underline="false" class="sort" @click="changeSort(1)">升序</el-link>
      </div>
      <div class="searchContent" v-if="searchResult.length">
        <div
          class="img-item"
          v-for="(item, index) in searchResult"
          :key="index"
          @click="toDetail(item._id)"
        >
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
      <el-empty v-else description="暂无搜索结果" image="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-764647c8-fd81-4a31-845f-c0bf285f2096/83064ad6-676d-409f-ab51-2f9a37b91b68.png" image-size="300px"></el-empty>
    </div>
    <div class="pageBox">
      <el-pagination
      layout="prev, pager, next"
      :total="count"
      :page-size='8'
      background
      :hide-on-single-page="true"
      @current-change="changePage"
      class="page">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "Search",
  data() {
    return {
      secondCategoryList: [],
      searchWord: "",
    };
  },
  props:['index','category1Id'],
  async mounted() {
    this.secondCategoryList = this.categoryList[this.index].category2;
    const category3IdList = this.secondCategoryList.reduce((prev,cur)=>{
      const ids = cur.category3.reduce((prev,cur)=>{
        prev.push(cur._id);
        return prev;
      },[])
      prev.push(...ids)
      return prev;
    },[])
    this.setSearchParams({category3IdList:category3IdList,tradeMarkId:''});
    const res = await this.getSearchResult();
    if(res.code != 200){
      this.$message.error(res.msg);
    }
  },
  methods: {
    ...mapActions("search",["getSearchResult",'setSearchParams']),
    changePage(page){
      this.setSearchParams({curPage:page});
      this.getSearchResult();
    },
    changeSort(sort){
      this.setSearchParams({sort:sort});
      this.getSearchResult();
    },
    changeTmark(id){
      this.setSearchParams({tradeMarkId:id});
      this.getSearchResult();
    },
    changeCategory(id){
      this.setSearchParams({category3IdList:[id]});
      this.getSearchResult();
    },
    toDetail(id){
      this.$router.push(`/detail/${id}`)
    }
  },
  computed: {
    ...mapState("search", ["searchWord","searchResult","count"]),
    ...mapState("site", ["categoryList", "brandList"]),
  },
  watch:{
    async $route(val){
      let { params:{category1Id,index} } = val;
      this.secondCategoryList = this.categoryList[this.index].category2;
      const category3IdList = this.secondCategoryList.reduce((prev,cur)=>{
        const ids = cur.category3.reduce((prev,cur)=>{
          prev.push(cur._id);
          return prev;
        },[])
        prev.push(...ids)
        return prev;
      },[])
      this.setSearchParams({category3IdList:category3IdList,tradeMarkId:''});
      const res = await this.getSearchResult();
      if(res.code != 200){
        this.$message.error(res.msg);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1200px;
  margin: auto;
  display: flex;
  flex-direction: column;
  .option {
    display: flex;
    flex-direction: column;
    width: 100%;
    border: 1px solid #f70;
    border-radius: 4px;
    .brand {
      display: flex;
      justify-content: space-around;
      .title {
        flex: 1;
        text-decoration: none;
      }
      .box {
        flex: 3;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        .item {
          height: 60px;
          width: 130px;
          margin: 20px 0px;
        }
      }
    }
    .category {
      display: flex;
      flex-direction: column;
      .item {
        display: flex;
        justify-content: space-around;
        .title {
          flex: 1;
          text-decoration: none;
        }
        .box {
          flex: 3;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
          .bt {
            height: 60px;
            width: 130px;
            margin: 20px 0px;
          }
        }
      }
    }
  }
  .search {
    margin-top: 50px;
    border: 1px solid #f70;
    border-radius: 4px;
    display: flex;
    width: 100%;
    flex-direction: column;
    .tab {
      width: 100%;
      padding: 15px;
      display: flex;
      .sort{
        text-decoration: none;
        font-weight: bold;
        margin: 0px 10px;
      }
    }

    .searchContent {
      box-sizing: border-box;
      display: flex;
      flex-wrap: wrap;
      align-items: stretch;
      padding: 0px 5px;
      .swiper {
        width: 50%;
        height: 400px;
        margin: 10px 0px;
        overflow: hidden;
      }
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
      & > :hover {
        transform: scale(1.01);
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
        transition: all 0.2s ease;
      }
    }
    
  }
  .pageBox{
    margin: 50px auto;
  }
}
/deep/.active{
  background-color: #f70 !important;
}
</style>