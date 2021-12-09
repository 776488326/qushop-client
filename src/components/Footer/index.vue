<template>
  <!-- 底部 -->
    <div class="footer">
        <div class="footer-container">
            <div class="footerList">
                <div class="footerItem">
                    <h4>购物指南</h4>
                    <ul class="footerItemCon">
                        <li>购物流程</li>
                        <li>会员介绍</li>
                        <li>生活旅行</li>
                        <li>常见问题</li>
                        <li>购物指南</li>
                    </ul>

                </div>
                <div class="footerItem">
                    <h4>配送方式</h4>
                    <ul class="footerItemCon">
                        <li>海外配送</li>
                        <li>上门自提</li>
                        <li>211限时达</li>
                        <li>配送服务查询</li>
                        <li>配送费收取标准</li>
                    </ul>
                </div>
                <div class="footerItem">
                    <h4>售后服务</h4>
                    <ul class="footerItemCon">
                        <li>售后政策</li>
                        <li>价格保护</li>
                        <li>退款说明</li>
                        <li>取消订单</li>
                        <li>返修/退换货</li>
                    </ul>
                </div>
                <div class="footerItem">
                    <h4>帮助中心</h4>
                    <img src="./images/wx_cz.jpg">
                </div>
            </div>
            <div class="copyright">
                <ul class="helpLink">
                    <li>关于我们
                        <span class="space"></span>
                    </li>
                    <li>联系我们
                        <span class="space"></span>
                    </li>
                    <li>关于我们
                        <span class="space"></span>
                    </li>
                    <li>商家入驻
                        <span class="space"></span>
                    </li>
                    <li>营销中心
                        <span class="space"></span>
                    </li>
                    <li>友情链接
                        <span class="space"></span>
                    </li>
                    <li>关于我们
                        <span class="space"></span>
                    </li>
                    <li>营销中心
                        <span class="space"></span>
                    </li>
                    <li>友情链接
                        <span class="space"></span>
                    </li>
                    <li>关于我们</li>
                </ul>
                <p>地址：河北省唐山市华北理工大学</p>
                <p>京ICP备 2021092733</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name : "Footer"
}
</script>

<style lang="less" scoped>
    .footer {
            background: hsla(0,0%,100%,.3);
            .footer-container {
                width: 1200px;
                margin: 0 auto;
                padding: 15px;
                display: flex;
                flex-direction: column;
                box-sizing: border-box;

                .footerList {
                    flex: 1;
                    display: flex;
                    justify-content: start;
                    overflow: hidden;
                    margin: 20px;
                    box-sizing: border-box;
                    .footerItem {
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-around;
                        align-items: center;
                        h4 {
                            font-size: 16px;
                            margin-bottom: 20px;
                        }
                        &:last-child {
                            img{
                                width: 110px;
                            }
                        }
                        .footerItemCon{
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;
                            align-items: center;
                            height: 150px;
                        }
                    }
                }

                .copyright {
                    padding: 20px;

                    .helpLink {
                        text-align: center;

                        li {
                            display: inline;

                            .space {
                                border-left: 1px solid #666;
                                width: 1px;
                                height: 13px;
                                background: #666;
                                margin: 8px 10px;
                            }
                        }
                    }

                    p {
                        margin: 10px 0;
                        text-align: center;
                    }
                }
            }
        }
</style>