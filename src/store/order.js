import { reqSubmitOrder ,reqOrderList} from "@/api";

const state = {
    orderList: []
}

const actions = {
    async createOrder({commit},tradeInfo){
        const res = await reqSubmitOrder(tradeInfo);
        if(res.code == 200){
            return res;
        }
    },
    async getOrderList({commit},userId){
        const res = await reqOrderList(userId);
        commit("UPDATEORDERLIST",res.data);
        if(res.code == 200){
            return res.msg;
        }
    }
}

const mutations = {
    UPDATEORDERLIST(state,orderList){
        state.orderList = orderList;
    }
}

const getters = {

}


export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}