import request from "./ajax"

const reqOrderList = (userId)=>{
    return request({
        url: `/order/list/${userId}`,
        method: 'get'
    })
}

// 请求提交创建订单
const reqSubmitOrder = (tradeInfo)=>{
    return request({
        url:"/order/create",
        method:'post',
        data:tradeInfo
    })
}


export {
    reqOrderList,
    reqSubmitOrder
}