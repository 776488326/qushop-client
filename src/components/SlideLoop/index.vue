<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item) in list" :key="item.id">
            <img :src="item.imgUrl">
        </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
    
    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
    
    <!-- 如果需要滚动条 -->
    <div class="swiper-scrollbar"></div>
</div>
</template>

<script>
import Swiper from 'swiper'
export default {
    name : 'SlideLoop',
    props : ['list'],
    watch : {
        list : {
            immediate : true,
            handler(newval,oldval){
                this.$nextTick(()=>{
                    new Swiper ('.swiper-container', {
                        // direction: 'vertical', // 垂直切换选项
                        loop: true, // 循环模式选项
                        
                        // 如果需要分页器
                        pagination: {
                        el: '.swiper-pagination',
                        },
                        
                        // 如果需要前进后退按钮
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                            hideOnClick: true,
                        },
                        
                        // // 如果需要滚动条
                        scrollbar: {
                            el: '.swiper-scrollbar',
                            hide:true
                        },
                    })
                })   
            }
        }
    }
}
</script>

<style lang="less" scoped>
    .swiper-slide{
        overflow: hidden;
        text-align: center;
        img {
            height: 100%;
        }
    }
    .swiper-container{
        --swiper-theme-color: #ff6600;/* 设置Swiper风格 */
        --swiper-navigation-color: #ddd;/* 单独设置按钮颜色 */
        --swiper-navigation-size: 30px;/* 设置按钮大小 */
    }
</style>