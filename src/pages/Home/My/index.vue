<template>
  <div class="my">
    <div class="header">
        我的收藏
    </div>
    <div class="container">
        <ul class="shop-list">
            <li><a href="#"><img src="./images/huawei.jpg" alt=""></a></li>
            <li><a href="#"><img src="./images/meizu.jpg" alt=""></a></li>
            <li><a href="#"><img src="./images/oppo.jpg" alt=""></a></li>
        </ul>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
    .my{
        width: 1200px;
        margin: 30px auto;
        .header{
            background-color: rgba(200,200,200,.3);
            width: 100%;
            height: 50px;
            line-height: 30px;
            padding: 10px;
            box-sizing: border-box;
            font-weight: bold;
            font-size: 20px;
            border: 1px solid #ccc;
            border-radius: 10px 10px 0px 0px;
        }
        .container{
            width: 100%;
            display: flex;
            .shop-list{
                flex: 1;
                display: flex;
                justify-content: space-around;
                background-color: #fff;
                overflow: hidden;
                li{
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    height: 400px;
                    box-sizing: border-box;
                    overflow: hidden;
                    img{
                        width: 200px;
                        height: 250px;  
                        transition: transform .5s;                   
                    }
                    &:hover{
                        box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.06);
                        img{
                            transform: scale(1.1);
                        }
                    }
                }
            }
        }
    }
</style>