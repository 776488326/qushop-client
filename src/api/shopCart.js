import request from "./ajax"


// 请求更新购物车商品数量
const reqUpdateShopNum = (cartId,shopInfo)=>{
    return request({
        url : '/cart/add',
        method : 'post',
        data:{cartId,shopInfo}
    })
}
// 请求购物车页面数据
const reqShopCartList = (cartId)=>{
    return request({
        url: `/cart/list/${cartId}`,
        method: 'get'
    })
}
// 请求修改购物车状态
const reqShopCartState = (skuId,isChecked)=>{
    return request({
        url: `/cart/checkCart/${skuId}/${isChecked}`,
        method: 'get'
    })
}

// 请求删除购物车数据
const reqDeleteShopCart = (params) =>{
    return request({
        url: "/cart/del",
        method: 'delete',
        data:params
    })
}


export {
    reqDeleteShopCart,
    reqShopCartList,
    reqShopCartState,
    reqUpdateShopNum,
}