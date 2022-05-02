import request from "./ajax"

// 请求注册用户
const reqUserRegister = (userInfo)=>{
    return request({
        url: '/user/reg',
        method:'post',
        data: userInfo
    })
}


// 请求用户登录
const reqUserLogin = (userInfo)=>{
    return request({
        url: '/user/login',
        method:'post',
        data:userInfo
    })
}

// 获取用户信息
const reqGetUserInfo = ()=>{
    return request({
        url:'/user/info',
        method:'get'
    })
}

// 更新用户信息
const requpdateUserInfo = (userInfo)=>{
    return request({
        url:"/user/update",
        method: "put",
        data: userInfo
    })
}

export {
    reqUserRegister,
    reqUserLogin,
    reqGetUserInfo,
    requpdateUserInfo,
}