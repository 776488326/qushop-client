<template>
  <!--商标-->
    <div class="brand">
        <div class="py-container">
            <p class="brand-title">品牌精选</p>
            <ul class="brand-list">
                <li class="brand-item">
                    <img src="./images/brand_21.png" />
                </li>
                <li class="brand-item">
                    <img src="./images/brand_03.png" />
                </li>
                <li class="brand-item">
                    <img src="./images/brand_05.png" />
                </li>
                <li class="brand-item">
                    <img src="./images/brand_07.png" />
                </li>
                <li class="brand-item">
                    <img src="./images/brand_09.png" />
                </li>
                <li class="brand-item">
                    <img src="./images/brand_11.png" />
                </li>
                <li class="brand-item">
                    <img src="./images/brand_13.png" />
                </li>
                <li class="brand-item">
                    <img src="./images/brand_15.png" />
                </li>
                <li class="brand-item">
                    <img src="./images/brand_17.png" />
                </li>
                <li class="brand-item">
                    <img src="./images/brand_19.png" />
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name : "Brand"
}
</script>

<style lang="less" scoped>
.brand {
        margin: 30px 0;

        .py-container {
            width: 1200px;
            margin: 0 auto;
            .brand-title{
                width: 100%;
                height: 50px;
                line-height: 30px;
                padding: 10px;
                box-sizing: border-box;
                border: 1px solid #ccc;
                border-radius: 10px 10px 0px 0px;
                font-size: 20px;
                font-weight: bold;
            }
            .brand-list {
                background-color: #f7f7f7;
                display: flex;
                flex-wrap: wrap;
                .brand-item {
                    width: 240px;
                    height: 100px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    &:hover{
                        box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.06);
                    }
                }
            }
        }
    }
</style>