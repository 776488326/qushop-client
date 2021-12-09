import axios from "axios"
import nprogress from "nprogress"
import 'nprogress/nprogress.css'
import store from '@/store'
// 创建axios实例进行二次封装

const service = axios.create({
    baseURL : '/api',
    timeout : 10000
})

// 添加进度条功能，则配置请求拦截器和响应拦截器
service.interceptors.request.use(function(config){
    // config 就是请求报文，所以处理完必须返回
    // 此处一般用于添加额外的功能，或者给请求头添加需要的数据

    nprogress.start();
    // 配置用户临时ID
    let userTempId = store.state.user.userTempId
    if(userTempId)
    {
        config.headers.userTempId = userTempId
    }
    // 请求头中配置token
    let token = store.state.user.token
    if(token){
        config.headers.token =token
    }
    return config
},function (error) {
    // 一般不写失败的回调
    // return Promise.reject(error); 
})
service.interceptors.response.use(function(response){
    // 添加响应处理
    // response 就是响应报文
    nprogress.done();
    
    return response.data
},function (error) {
    // 停止进度条 
    nprogress.done();
    // 统一处理错误
    // alert('失败！！！')
    return new Promise(()=>{});
})

export default service //暴露二次封装的axios