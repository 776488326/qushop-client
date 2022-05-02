// 引入并声明Vuerouter
import store from "../store";
import Vue from "vue"
import VueRouter from "vue-router"
Vue.use(VueRouter)
import routes from './routes'
// 修改push原型，处理编程式路由参数不变连续点击时需要传入成功或失败的回调的问题
const originPush = VueRouter.prototype.push;
VueRouter.push = function(location,resolve,reject){
    if(resolve === undefined && reject === undefined)
    {
        return originPush.call(this,location).catch(()=>{})
    }
    else
    {
        return originPush.call(this,location,resolve,reject)
    }
}

const vueRouter = new VueRouter({
    routes,
    scrollBehavior(to,from,savedPosition){
        return {x:0,y:0};
    }
})

vueRouter.beforeEach(async (to,from,next)=>{
    // to 到哪去
    // from 从哪来
    // next（） 处理函数，可接收参数，fasle表示原地不动，'/'表示强制跳转地址，空表示无条件放行
    let token = store.state.user.token
    let userInfo = store.state.user.userInfo
    if(token)
    {
        if(to.path === '/login')
        {
            next('/')
        }else
        {
            if(to.path === '/home')
            {
                await store.dispatch("site/setSitetVisitCount");
            }
            if(userInfo)
            {
                next()
            }
            else
            {
                try {
                    const result = await store.dispatch('user/reqGetUserInfo');
                    next()
                } catch (error) {
                    store.dispatch('clearUserToken')
                    next('/login')
                }
            }
        }
    }else
    {
        if(to.path === "/center"|| to.path === "/order" || to.path === "/shopcart"){

            return false;
        }
        next();
    }
})

export default vueRouter