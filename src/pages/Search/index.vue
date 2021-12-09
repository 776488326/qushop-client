<template>
  <div>
    <typenav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-if="searchParams.categoryName">{{searchParams.categoryName}}<i @click="removeCategoryName">×</i></li>
            <li class="with-x" v-if="searchParams.keyword">{{searchParams.keyword}}<i @click="removeKeyword">×</i></li>
            <li class="with-x" v-if="searchParams.trademark">{{searchParams.trademark.split(':')[1]}}<i @click="removeTrademark">×</i></li>
            <li class="with-x" v-for="(prop,index) in searchParams.props" :key="prop">{{prop.split(':')[1]}}<i @click="removeProps(index)">×</i></li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @searchTrademark='searchTrademark' @searchProps='searchProps'/>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active:searchParams.order.split(':')[0] === '1'}">
                  <a href="javascript:;" @click="changeSort('1')">
                    综合 
                    <i v-if="searchParams.order.split(':')[0] === '1'" class="iconfont"
                      :class="{
                        iconup : searchParams.order.split(':')[1] === 'asc',
                        icondown : searchParams.order.split(':')[1] === 'desc'
                      }"
                    ></i>
                  </a>
                </li>
                <li :class="{active:searchParams.order.split(':')[0] === '2'}">
                  <a href="javascript:;" @click="changeSort('2')">
                    价格 
                    <i v-if="searchParams.order.split(':')[0] === '2'" class="iconfont"
                      :class="{
                        iconup : searchParams.order.split(':')[1] === 'asc',
                        icondown : searchParams.order.split(':')[1] === 'desc'
                      }"
                    ></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="(good) in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="'/detail/'+good.id">
                      <img :src="good.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥ </em>
                      <i>{{good.price}}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <router-link :to="'/detail/'+good.id">
                      {{good.title}}
                    </router-link>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
              
            </ul>
          </div>
          <Pagination
            :pageConfig='{
              total: searchInfo.total, 
              showPageNo: 5, 
              pageNo: searchParams.pageNo,  
              pageSize: searchParams.pageSize, 
            }' 
            @changeCurrentPage='changeCurrentPage'
          ></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SearchSelector from './SearchSelector/SearchSelector'
  import {mapGetters, mapState} from 'vuex'
  export default {
    name: 'Search',
    data(){
      return{
        searchParams : {
          category1Id : '',
          category2Id : '',
          category3Id : '',
          categoryName : '',
          keyword : "",
          props : [],
          trademark : '',
          // 默认的搜索条件
          order : '1:desc',
          pageNo : 1,
          pageSize : 8,
        }
      }
    },
    components: {
      SearchSelector,
    },
    beforeMount(){
      this.handlerSearchParams()
    },
    mounted(){
      this.getSearchInfo()
    },
    methods : {
      getSearchInfo(){
        // dispatch只能传递一个对象参数
        this.$store.dispatch('getSearchInfo',this.searchParams)
      },
      handlerSearchParams(){
        let {category1Id,category2Id,category3Id,categoryName} = this.$route.query;
        let {keyword} = this.$route.params;
        let searchParams = {
          ...this.searchParams,
          category1Id,
          category2Id,
          category3Id,
          categoryName,
          keyword,
        }
        Object.keys(searchParams).forEach((key)=>{
          if(searchParams[key] === ''){delete searchParams[key];}
        })
        this.searchParams = searchParams;
      },
      removeCategoryName(){
        this.searchParams.category1Id = undefined;
        this.searchParams.category2Id = undefined;
        this.searchParams.category3Id = undefined;
        this.searchParams.categoryName = undefined;
        // this.getSearchInfo() 直接调用该方法参数改变，但是路径不会改变
        // this.$router.push({name : 'search',params : this.$route.params})
        this.$router.replace({name : 'search',params : this.$route.params})
      },
      removeKeyword(){
        this.searchParams.keyword = undefined;
        this.$bus.$emit('clearKeyword');
        // this.getSearchInfo()
        // this.$router.push({name : 'search',query : this.$route.query})
        this.$router.replace({name : 'search',query : this.$route.query})
      },
      removeTrademark(){
        this.searchParams.trademark = undefined;
        this.searchParams.pageNo = 1;
        this.getSearchInfo()

      },
      removeProps(index){
        this.searchParams.props.splice(index,1)
        this.searchParams.pageNo = 1;
        this.getSearchInfo()

      },
      searchTrademark(trademark){
        this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
        this.searchParams.pageNo = 1;
        this.getSearchInfo()
      },
      searchProps(value,attr){
        let props = `${attr.attrId}:${value}:${attr.attrName}`;
        if(!this.searchParams.props.some((val)=>{return val===props}))
        {
          this.searchParams.props.push(props);
          this.searchParams.pageNo = 1;
          this.getSearchInfo()
        }
      },
      changeSort(flag){
        let oldflag = this.searchParams.order.split(':')[0];
        let oldsort = this.searchParams.order.split(':')[1];
        let order = '';
        if(flag === oldflag)
        {
          order = `${flag}:${oldsort==='asc'?'desc':'asc'}`;
        }
        else
        {
          order =  `${flag}:${'desc'}`;
        }
        this.searchParams.order = order;
        this.getSearchInfo();
      },
      changeCurrentPage(page){
        this.searchParams.pageNo = page;
        this.getSearchInfo()
      }
    },
    computed : {
      ...mapGetters(['goodsList']),
      ...mapState({
        searchInfo: state => state.search.searchInfo,
      })
    },
    watch : {
      $route(newval,oldval){
        this.handlerSearchParams()
        this.getSearchInfo()
      }
    }
  }
</script>

<style lang="less" scoped>
  .main {
    margin: 10px 0;

    .py-container {
      width: 1200px;
      margin: 0 auto;

      .bread {
        margin-bottom: 5px;
        overflow: hidden;

        .sui-breadcrumb {
          padding: 3px 15px;
          margin: 0;
          font-weight: 400;
          border-radius: 3px;
          float: left;

          li {
            display: inline-block;
            line-height: 18px;

            a {
              color: #aaa;
              text-decoration: none;

              &:hover {
                color: #333 !important;
              }
            }
          }
        }

        .sui-tag {
          margin-top: -5px;
          list-style: none;
          line-height: 0;
          padding: 5px 0 0;
          margin-bottom: 18px;
          float: left;

          .with-x {
            font-size: 12px;
            margin: 0 5px 5px 0;
            border-radius: 10px;
            display: inline-block;
            overflow: hidden;
            color: #aaa;
            background: none;
            padding: 0 7px;
            height: 20px;
            line-height: 20px;
            border: 1px solid #aaa;
            white-space: nowrap;
            transition: color 400ms;
            cursor: pointer;

            i {
              margin-left: 10px;
              cursor: pointer;
              font: 400 14px tahoma;
              display: inline-block;
              height: 100%;
              vertical-align: middle;
            }

            &:hover {
              color: #333;
            }
          }
        }
      }

      .details {
        .sui-navbar {
          background-color: rgba(200,200,200,.3);
          width: 1200px;
          margin: 0 auto;
          box-sizing: border-box;
          padding: 10px;
          font-size: 20px;
          font-weight: bold;
          height: 60px;
          border: 1px solid #ccc;
          border-radius: 10px 10px 0px 0px;
          .filter {
            min-height: 40px;
            padding-right: 20px;
            padding-left: 0;
            border-radius: 0;

            .sui-nav {
              position: relative;
              left: 0;
              display: block;
              float: left;
              margin: 0 10px 0 0;

              li {
                float: left;
                line-height: 18px;

                a {
                  display: block;
                  cursor: pointer;
                  padding: 11px 15px;
                  color: #777;
                  text-decoration: none;
                }
                &.active {
                  a {
                    color: #333;
                  }
                }
              }
            }
          }
        }

        .goods-list {
          min-width: 1200px;
          box-sizing: border-box;
          ul {
            display: flex;
            flex-wrap: wrap;
            li {
              height: 100%;
              width: 25%;
              box-sizing: border-box;
              border-right: 1px solid #ccc;
              border-bottom: 1px solid #ccc;
              &:nth-of-type(4n){
                border-right: none;
              }
              .list-wrap {
                padding: 20px;
                min-height: 400px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
                background-color: #fff;
                
                &:hover{
                  box-shadow: inset 0 0 30px 1px rgba(0, 0, 0, 0.08);
                }
                .p-img {
                  width: 200px;
                  height: 200px;

                  a {
                    color: #666;

                    img {
                      max-width: 100%;
                      height: auto;
                      vertical-align: middle;
                      &:hover{
                        transform: scale(1.1);
                        transition: transform .3s;
                      }
                    }
                  }
                }

                .price {
                  margin-top: 50px;
                  font-size: 18px;
                  color: #c81623;

                  strong {
                    font-weight: 700;

                    i {
                      margin-left: -5px;
                    }
                  }
                }

                .attr {
                  width: 85%;
                  overflow: hidden;
                  margin-bottom: 8px;
                  min-height: 38px;
                  cursor: pointer;
                  line-height: 1.8;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;
                  a {
                    color: #333;
                    text-decoration: none;
                  }
                }

                .commit {
                  padding-left: 15px;
                  height: 22px;
                  font-size: 13px;
                  color: #a7a7a7;

                  span {
                    font-weight: 700;
                    color: #646fb0;
                  }
                }

                .operate {
                  padding: 12px 15px;

                  .sui-btn {
                    display: inline-block;
                    padding: 2px 14px;
                    box-sizing: border-box;
                    margin-bottom: 0;
                    font-size: 12px;
                    line-height: 18px;
                    text-align: center;
                    vertical-align: middle;
                    cursor: pointer;
                    border-radius: 0;
                    background-color: transparent;
                    margin-right: 15px;
                  }

                  .btn-bordered {
                    min-width: 85px;
                    background-color: transparent;
                    border: 1px solid #8c8c8c;
                    color: #8c8c8c;

                    &:hover {
                      border: 1px solid #666;
                      color: #fff !important;
                      background-color: #666;
                      text-decoration: none;
                    }
                  }

                  .btn-danger {
                    border: 1px solid #e1251b;
                    color: #e1251b;

                    &:hover {
                      border: 1px solid #e1251b;
                      background-color: #e1251b;
                      color: white !important;
                      text-decoration: none;
                    }
                  }
                }
              }
            }
          }
        }

        .page {
          width: 733px;
          height: 66px;
          overflow: hidden;
          float: right;

          .sui-pagination {
            margin: 18px 0;

            ul {
              margin-left: 0;
              margin-bottom: 0;
              vertical-align: middle;
              width: 490px;
              float: left;

              li {
                line-height: 18px;
                display: inline-block;

                a {
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  border: 1px solid #e0e9ee;
                  margin-left: -1px;
                  font-size: 14px;
                  padding: 9px 18px;
                  color: #333;
                }

                &.active {
                  a {
                    background-color: #fff;
                    color: #e1251b;
                    border-color: #fff;
                    cursor: default;
                  }
                }

                &.prev {
                  a {
                    background-color: #fafafa;
                  }
                }

                &.disabled {
                  a {
                    color: #999;
                    cursor: default;
                  }
                }

                &.dotted {
                  span {
                    margin-left: -1px;
                    position: relative;
                    float: left;
                    line-height: 18px;
                    text-decoration: none;
                    background-color: #fff;
                    font-size: 14px;
                    border: 0;
                    padding: 9px 18px;
                    color: #333;
                  }
                }

                &.next {
                  a {
                    background-color: #fafafa;
                  }
                }
              }
            }

            div {
              color: #333;
              font-size: 14px;
              float: right;
              width: 241px;
            }
          }
        }
      }
    }
  }
</style>