<template>
  <!--列表-->
    <div class="list-container">
        <div class="sortList clearfix">
            <div class="center">
                <slideLoop :list="bannerList"></slideLoop>
            </div>
            <div class="right">
                <div class="news">
                    <h4>
                        <em class="fl">趣购物快报</em>
                        <span class="fr tip">更多 ></span>
                    </h4>
                    <div class="clearix"></div>
                    <ul class="news-list unstyled">
                        <li>
                            <span class="bold">[特惠]</span>备战开学季 全民半价购数码
                        </li>
                        <li>
                            <span class="bold">[公告]</span>备战开学季 全民半价购数码
                        </li>
                        <li>
                            <span class="bold">[特惠]</span>备战开学季 全民半价购数码
                        </li>
                        <li>
                            <span class="bold">[公告]</span>备战开学季 全民半价购数码
                        </li>
                        <li class="update">
                            <span>双十二狂欢来临！</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    name : "listContainer",
    computed : {
        ...mapState({
            bannerList :state => state.home.bannerList
        })
    },
    mounted(){
        this.$store.dispatch('getBannerList')
        // swiper实例化必须在结构完全形成之后，而结构中的li标签是通过异步动态获取数据形成的，所以不能再此处创建
    }
}
</script>

<style lang="less" scoped>
    .list-container {
            width: 1200px;
            margin: 0 auto;

            .sortList {
                height: 463px;
                padding-left: 210px;
                box-sizing: border-box;
                border: 1px solid #ccc;
                border-radius: 0px 15px 0px 0px;
                .center {
                    box-sizing: border-box;
                    width: 740px;
                    height: 100%;
                    padding: 5px;
                    float: left;
                }

                .right {
                    float: left;
                    width: 248px;
                    height: 100%;
                    box-sizing: border-box;
                    .news {
                        height: 100%;
                        border: 1px solid #e4e4e4;
                        margin-top: 5px;
                        display: flex;  
                        flex-direction: column;

                        h4 {
                            height: 50px;
                            padding: 10px;
                            margin-bottom: 20px;
                            box-sizing: border-box;
                            line-height: 22px;

                            .fl {
                                float: left;
                                font-size: 16px;
                            }

                            .fr {
                                float: right;
                                font-size: 12px;
                                font-weight: 400;
                                &:hover{
                                    cursor: pointer;
                                }
                            }
                        }

                        .news-list {
                            flex: 1;
                            display: flex;
                            box-sizing: border-box;
                            padding: 10px;
                            flex-direction: column;
                            justify-content: space-around;
                            li{
                                display: flex;
                                justify-content: center;
                                height: 30px;
                                line-height: 30px;
                                align-items: center;
                                font-size: 14px;
                                &:hover{
                                    border-radius: 10px;
                                    box-shadow: 0 0 6px rgba(180,160,120,.8);
                                }
                            }
                            .update{
                                    
                                    height: 30px;
                                    line-height: 30px;
                                    text-align: center;
                                    width: 100%;
                                    span{
                                        display: inline-block;
                                        width: 60%;
                                        font: bold 14px Consolas, Monaco, monospace;   /*等宽字体*/
                                        overflow: hidden;
                                        white-space: nowrap;
                                        font-weight: 500;
                                        border-right: 1px solid transparent;
                                        animation: typing 8s steps(10), caret 1s steps(1) infinite;

                                    }
                                }
                            }
                            .bold {
                                margin-right: 5px;
                                font-weight: 700;
                            }
                        }
                    }
                }
            
            @keyframes typing{
                from {
                    width: 0;
                }
            }
            @keyframes caret{
                50% { border-right-color: currentColor}
            }
        }
</style>