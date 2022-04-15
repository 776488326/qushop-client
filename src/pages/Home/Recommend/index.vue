<template>
<!--今日推荐-->
    <div class="today-recommend">
        <div class="header">
            今日推荐
        </div>
        <div class="py-container">
            <ul class="recommend">
                <li class="clock">
                    <div class="time">
                        <img src="./images/clock.png" />
                        <h3>今日推荐</h3>
                    </div>
                </li>
                <li class="banner">
                    <img src="./images/today01.png" />
                    <img src="./images/today02.png" />
                </li>
                <li class="banner">
                    <img src="./images/today04.png" />
                    <img src="./images/today03.png" />
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name : "recommend",
}
</script>

<style lang="less" scoped>
    .today-recommend {
    margin-top: 30px;
            .header{
                background-color: rgba(200,200,200,.3);
                width: 1200px;
                margin: 0 auto;
                box-sizing: border-box;
                padding: 10px;
                font-size: 20px;
                font-weight: bold;
                height: 50px;
                line-height: 30px;
                border: 1px solid #ccc;
                border-radius: 10px 10px 0px 0px;
            }
            .py-container {
                width: 1200px;
                margin: 0 auto;

                .recommend {
                    height: 400px;
                    display: flex;

                    .clock {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        text-align: center;
                        flex: 2;
                        background-color: #5c5251;
                        color: #fff;
                        font-size: 18px;
                        .time {
                            padding: 30px 0;
                        }

                        h3 {
                            margin: 9px 0;
                            font-weight: 700;
                            font-size: 18px;
                            line-height: 30.06px;
                        }
                    }

                    .banner {
                        flex: 1;
                        display: flex;
                        flex-direction: column;

                        img {
                            flex: 1;
                            width: 100%;
                            opacity: 0.8;
                            transition: all 400ms;

                            &:hover {
                                opacity: 1;
                            }
                        }
                    }
                }
            }
        }
</style>