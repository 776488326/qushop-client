<template>
  <div class="clearfix selector">
    <div class="type-wrap logo">
      <div class="fl key brand">品牌</div>
      <div class="value logos">
        <ul class="logo-list">
          <li v-for="(trade) in trademarkList" :key="trade.tmId" @click="searchTrademark(trade)">{{trade.tmName}}</li>
        </ul>
      </div>
    </div>
    <div class="type-wrap" v-for="(attr) in attrsList" :key="attr.attrId">
      <div class="fl key">{{attr.attrName}}</div>
      <div class="fl value">
        <ul class="type-list">
          <li v-for="(value,index) in attr.attrValueList" :key="index">
            <a href="javascript:;" @click="searchProps(value,attr)">{{value}}</a>
          </li>
        </ul>
      </div>
      <div class="fl ext"></div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
  export default {
    name: 'SearchSelector',
    methods :{
      searchTrademark(trade){
      this.$emit('searchTrademark',trade)
      },
      searchProps(value,attr){
      this.$emit('searchProps',value,attr)
      }
    },
    computed : {
      ...mapGetters(['attrsList','trademarkList'])
    }
  }
</script>

<style lang="less" scoped>
  .selector {
    border: 1px solid #aaa;
    border-bottom: none;
    border-radius: 20px 20px 0px 0px;
    overflow: hidden;
    margin-bottom: 30px;
    .logo {
      font-size: 18px;
      display: flex;
      align-items: center;
      box-sizing: border-box;
    }

    .type-wrap {
      display: flex;
      align-items: center;
      box-sizing: border-box;
      padding: 10px;
      background: hsla(0,0%,100%,.3);
      border-bottom: 5px dashed rgba(200, 200, 200, 0.2);

      .key {
        width: 100px;
        background: none;
        line-height: 26px;
        text-align: right;
        padding: 10px 10px 0 15px;
        float: left;
      }

      .value {
        overflow: hidden;
        padding: 10px 0 0 15px;
        color: #333;
        margin-left: 120px;
        padding-right: 90px;

        .logo-list {
          li {
            float: left;
            border: 1px solid #e4e4e4;
            margin: -1px -1px 0 0;
            width: 105px;
            height: 52px;
            text-align: center;
            line-height: 52px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-weight: 700;
            color: #e1251b;
            font-style: italic;
            font-size: 14px;

            img {
              max-width: 100%;
              vertical-align: middle;
            }
          }
        }

        .type-list {
          li {
            float: left;
            display: block;
            margin-right: 30px;
            line-height: 26px;

            a {
              text-decoration: none;
              color: #666;
            }
          }
        }
      }

      .ext {
        position: absolute;
        top: 10px;
        right: 10px;

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
          padding: 0 10px;
          background: #fff;
          border: 1px solid #d5d5d5;
        }

        a {
          color: #666;
        }
      }
    }
  }
</style>