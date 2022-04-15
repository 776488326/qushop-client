import Vue from "vue";
import Vuex from 'vuex'
Vue.use(Vuex)
import user from './user'
import home from "./home"
import search from "./search"
import detail from './detail'
import shopcart from "./shopcart";
import trade from "./trade";

// Vuex的四个核心
const state = {

}
const mutations = {

}
const actions = {

}
const getters = {

}
export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    // 模块化
    modules:{
        user,
        home,
        search,
        detail,
        shopcart,
        trade
    }
})