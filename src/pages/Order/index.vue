<template>
    <div class="order">
    <div v-if="orderList.length">
        <h2 style="margin:50px 70px">全部订单</h2>
        <el-descriptions :column="4" direction="vertical" border v-for="(item,index) in orderList" :key="index">
            <el-descriptions-item label="创建时间">{{item.creatTime}}</el-descriptions-item>
            <el-descriptions-item label="订单信息" contentClassName="msgBox">
                <div class="msg" v-for="(item,index) in item.orderInfo.shopList" :key="index">
                    <div>
                        <img :src="item.skuImg" style="width:80px">
                    </div>
                    <div>
                        <p>商品名：{{item.skuName}}</p>
                        <p>单价：{{item.price}}</p>
                        <p>数量：x{{item.count}}</p>
                    </div>
                </div>
            </el-descriptions-item>
            <el-descriptions-item label="订单金额">¥{{item.orderInfo.total}}</el-descriptions-item>
            <el-descriptions-item label="完成状态">
                <el-button v-if="item.status" type="success">已完成</el-button>
                <el-button v-else type="primary">进行中</el-button>
            </el-descriptions-item>
       </el-descriptions>
    </div>
    <el-empty v-else description="还没有订单呦，快去下单商品吧！"></el-empty>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
    name:"Order",
    data(){
        return{

        }
    },
    props:["userId"],
    methods:{
        ...mapActions("order",["getOrderList"]),
    },
    async mounted(){
        const res = await this.getOrderList(this.userId);
        if(res.code === 200){
            console.log(res);
        }
    },
    computed:{
        ...mapState("order",["orderList"])
    }
}
</script>

<style lang="less" scoped>
    .order{
        width: 1200px;
        margin: auto;
        min-height: 50vh;
        margin-bottom: 50px;
    }
    .msgBox{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        .msg{
            display: flex;
            margin: 10px;
            div{
                margin: 10px;
            }
        }
    }
</style>