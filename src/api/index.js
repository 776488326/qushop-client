import request from './ajax'
import mockAjax from './mockAjax'
import localApi from "./localApi"
// 接口请求函数

// axios的使用 函数，对象
// 配置三种参数 params参数，query参数，请求体参数
// params参数在url中携带
// query参数,可以在url中以?分割携带,也可以在对象中配置,配置的属性名叫params
// 请求体参数,在配置对象中的data中配置,请求方式是put或post才有
// axios({
//     url : 'localhost:8080/userinfo/1?name=zhaoliying',
//     method : 'POST',
//     params : {
//         // 配置query参数
//         name : 'zhaoliying'
//     },
//     data : {
//         // 配置请求体参数
//     }
// })

// 请求三级分类列表数据
export const requestCategoryList = () => {
    return request({
        url : "/product/getBaseCategoryList",
        method : 'get'
    })
}

export const requestBannerList = ()=>{
    return mockAjax({
        url : "/banner",
        method : 'get'
    })
}

export const requestFloorList = ()=>{
    return mockAjax({
        url : "/floor",
        method : 'get'
    })
}
// 请求获取search数据，searchParams必须传一个对象，可以为空对象
export const requestSearchInfo = (searchParams)=>{
    return request({
        url : "/list",
        method : "post",
        data : searchParams
    })
}
// 请求获取详情数据
export const requestDetailInfo = (skuId)=>{
    return request({
        url:`/item/${skuId}`,
        method : 'get'
    })
}
// 请求更新购物车商品数量
export const reqUpdateShopNum = (skuId,skuNum)=>{
    return request({
        url : `/cart/addToCart/${skuId}/${skuNum}`,
        method : 'post'
    })
}
// 请求购物车页面数据
export const reqShopCartList = ()=>{
    return request({
        url: '/cart/cartList',
        method: 'get'
    })
}
// 请求修改购物车状态
export const reqShopCartState = (skuId,isChecked)=>{
    return request({
        url: `/cart/checkCart/${skuId}/${isChecked}`,
        method: 'get'
    })
}

// 请求删除购物车数据
export const reqDeleteShopCart = (skuId) =>{
    return request({
        url: `/cart/deleteCart/${skuId}`,
        method: 'delete'
    })
}

// 请求注册用户
export const reqUserRegister = (userInfo)=>{
    return localApi({
        url: '/user/reg',
        method:'post',
        data: userInfo
    })
}
// 请求获取验证码
export const reqCheckCode = (phone)=>{
    return request({
        url:`/user/passport/sendCode/${phone}`,
        method:'get'
    })
}
// 请求用户登录
export const reqUserLogin = (userInfo)=>{
    return localApi({
        url: `/user/login`,
        method:'post',
        data:userInfo
    })
}

// 获取用户信息
export const reqGetUserInfo = ()=>{
    return localApi({
        url:'/user/personalMsg',
        method:'get'
    })
}

// 请求获取用户的收货地址信息
export const reqUserAddress = ()=>{
    return request({
        url: '/user/userAddress/auth/findUserAddressList',
        method: 'get'
    })
}
export const reqTradeInfo = ()=>{
    return request({
        url: '/order/auth/trade',
        method: 'get'
    })
}

// 请求提交创建订单
export const reqSubmitOrder = (tradeNo,tradeInfo)=>{
    return request({
        url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
        method:'post',
        data:tradeInfo
    })
}