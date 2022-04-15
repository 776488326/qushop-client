import Home from "@/pages/Home"
import Login from "@/pages/Login"
import Register from "@/pages/Register"
import Search from "@/pages/Search"
import Detail from "@/pages/Detail"
import AddCartSuccess from "@/pages/AddCartSuccess"
import shopcart from "@/pages/ShopCart"
import trade from '@/pages/Trade'
import pay from '@/pages/Pay'
import paySuccess from '@/pages/PaySuccess'
import center from '@/pages/Center'
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
        path : "/search/:keyword?",
        component : Search,
        props(route){
            return {
                keyword : route.params.keyword,
            }
        }
    },
    {
        path : "/",
        redirect : '/home'
    },
    {
        path : "/detail/:goods",
        component : Detail
    },
    {
        path: '/addcartsuccess',
        component: AddCartSuccess
    },
    {
        path: "/shopcart",
        component: shopcart
    },
    {
        path:'/trade',
        component:trade
    },
    {
        path: '/pay',
        component:pay
    },
    {
        path:'/paysuccess',
        component: paySuccess
    },
    {
        path:'/center',
        component: center
    }
]