<template>
    <!-- 商品分类导航 -->
    <div class="type-nav">
        <div class="container">
            <div @mouseleave="moveOutDiv()" @mouseenter="isShow = true">
                <h2 class="all">全部商品分类</h2>
                <transition name="sort">
                    <div class="sort" v-show="isShow">
                        <div class="all-sort-list2" @click="toSearch">
                            <div class="item bo" 
                            :class="{ item_on : currentindex===index}" 
                            v-for="(c1,index) in categoryList" 
                            :key="c1.categoryId" 
                            @mouseenter="moveInItem(index)">
                                <h3>
                                    <a href="javascript:;" :data-category1Id="c1.categoryId" :data-categoryName="c1.categoryName">{{c1.categoryName}}</a>
                                    <!--<router-link :to="{
                                        name : 'search',
                                        query : {
                                            category1Id : c1.categoryId,
                                            categoryName : c1.categoryName
                                        },
                                    }">{{c1.categoryName}}</router-link>-->
                                    
                                </h3>
                                <div class="item-list clearfix">
                                    <div class="subitem">
                                        <dl class="fore" v-for="(c2) in c1.categoryChild" :key="c2.categoryId">
                                            <dt>
                                                <a href="javascript:;" :data-category2Id="c2.categoryId" :data-categoryName="c2.categoryName">{{c2.categoryName}}</a>
                                                <!--<router-link :to="{
                                                    name : 'search',
                                                    query : {
                                                        category2Id : c2.categoryId,
                                                        categoryName : c2.categoryName
                                                    },
                                                }">{{c2.categoryName}}</router-link>-->
                                                
                                            </dt>
                                            <dd>
                                                <em v-for="(c3) in c2.categoryChild" :key="c3.categoryId">
                                                    <a href="javascript:;" :data-category3Id="c3.categoryId" :data-categoryName="c3.categoryName">{{c3.categoryName}}</a>
                                                    <!--<router-link :to="{
                                                        name : 'search',
                                                        query : {
                                                            category3Id : c3.categoryId,
                                                            categoryName : c3.categoryName
                                                        },
                                                    }">{{c3.categoryName}}</router-link>-->
                                                    
                                                </em>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">趣购物超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
//import _ from "lodash"  直接将全部的文件引入会导致打包体积过大
import throttle from "lodash/throttle"
export default {
    name : "typeNav",
    data(){
        return{
            currentindex : -1,
            isShow : true,
        }
    },
    computed : {
        // 获取state中的数据使用mapstate时，如果是直接在state中则可以使用数组形式
        // 如果模块化后，则必须使用对象形式
        ...mapState({
            categoryList : state => state.home.categoryList
        }),
    },
    // 挂载完成立马获取数据
    mounted(){
        // dispatch可以触发vuex中的action中的方法
        if(this.$route.path !== '/home')
        [
            this.isShow = false
        ]
    },
    methods :
    {
        moveInItem : throttle(function(index){
            this.currentindex = index;
        },50,{'trailing' : false}),
        // 事件委派回调函数
        toSearch(event){
            let {category1id,category2id,category3id,categoryname} = event.target.dataset
            if(categoryname)
            {
                let location = {
                    name : "search"
                }
                let query = {
                    categoryName : categoryname
                }
                if(category1id){
                    query.category1Id = category1id
                }
                else if(category2id)
                {
                    query.category2Id = category2id
                }
                else
                {
                    query.category3Id = category3id
                }
                location.query = query;
                // 如果之前已经有参数则，带上原来的参数
                if(this.$route.params){
                    location.params = this.$route.params;
                }
                if(this.$route.path !== '/home')
                {
                    this.$router.replace(location)
                }
                else
                {
                    this.$router.push(location)
                }
                }
            
            },
        moveOutDiv(){
            this.currentindex = -1;
            if(this.$route.path !== '/home')
            {
                this.isShow = false;
            }
        }
        }
    }
</script>

<style lang="less" scoped>
    .type-nav {
        width: 1200px;
        margin: auto;
        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;

            .all {
                width: 210px;
                height: 45px;
                border-radius: 22px 22px 0px 0px;
                background-color: #ccc;
                line-height: 45px;
                text-align: center;
                color: #333;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                a {
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #777;
                    text-decoration: none;
                    &:hover{
                        color: #000 !important;
                    }
                }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 47px;
                width: 210px;
                height: 460px;
                position: absolute;
                background: #fff;
                z-index: 999;

                &.sort-enter{
                    height: 0;
                    opacity: 0;
                }
                &.sort-enter-to{
                    height: 461px;
                    opacity: 1;
                }
                &.sort-enter-active{
                    transition: all .5s;
                }
                .all-sort-list2 {
                    .item {
                        h3 {
                            line-height: 30px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;

                            a {
                                color: #333;
                            }
                        }

                        .item-list {
                            display: none;
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        width: 618px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }

                        &.item_on {
                            .item-list {
                                display: block;
                            }
                            background-color: skyblue;
                        }
                    }
                }
            }
        }
    }
</style>