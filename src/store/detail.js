import {requestDetailInfo} from "@/api"
const state = {
    skuInfo : {}
}
const actions = {
    async getDetailInfo({commit},skuId){
        const result = await requestDetailInfo(skuId)
        if(result.code = 200)
        {
            commit('RECEIVE_DETAILINFO',result.data)
        }
    }
}
const mutations = {
    RECEIVE_DETAILINFO(state,detailInfo)
    {
        state.skuInfo = detailInfo;
    }
}
const getters = {
    
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}