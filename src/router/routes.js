import Home from "@/pages/Home"
import Login from "@/pages/Login"
import Register from "@/pages/Register"
import Search from "@/pages/Search"
import Detail from "@/pages/Detail"
import ShopCart from "@/pages/ShopCart"
import Order from '@/pages/Order'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
// 向外暴露路由器对象
export default [
    {
        path : "/home",
        component : Home
    },
    {
        path : "/register",
        component : Register,
        meta : {
            isHidden : true
        }
    },
    {
        path : "/login",
        component : Login,
        meta : {
            isHidden : true
        }
    },
    {
        name : "search",
        path : "/search/:category1Id/:index",
        component : Search,
        props($route){
            return{
                categoryId:$route.params.category1Id||'',
                index:$route.params.index||""
            }
        }
    },
    {
        path : "/",
        redirect : '/home'
    },
    {
        path : "/detail/:skuId",
        component : Detail,
        props($route){
            return {
                skuId:$route.params.skuId
            }
        }
    },
    {
        path: "/shopcart",
        component: ShopCart
    },
    {
        path:'/order',
        component:Order,
        props($route){
            return {
                userId: $route.query.userId
            }
        }
    },
    {
        path: '/pay',
        component:Pay,
        props($route){
            return {
                selectInfo:$route.query.selectInfo
            }
        }
    },
    {
        path:'/paysuccess',
        component: PaySuccess
    },
    {
        path:'/center',
        component: Center
    }
    
]