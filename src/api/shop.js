import request from "./ajax"

// 请求三级分类列表数据
const requestCategoryList = () => {
    return request({
        url : "/shop/category",
        method : 'get'
    })
}

// 请求获取search数据，searchParams必须传一个对象，可以为空对象
const requestSearchInfo = (searchParams)=>{
    return request({
        url : "/shop/search",
        method : "post",
        data : searchParams
    })
}
// 请求获取详情数据
const requestDetailInfo = (skuId)=>{
    return request({
        url:`/shop/detail/${skuId}`,
        method : 'get'
    })
}

export {
    requestCategoryList,
    requestSearchInfo,
    requestDetailInfo
}