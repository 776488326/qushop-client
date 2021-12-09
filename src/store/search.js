import {requestSearchInfo} from "@/api"
const state = {
    // 存数据
    searchInfo : {},
}
const mutations = {
    // 修改数据
    RECEIVE_SEARCHINFO(state,searchInfo){
        state.searchInfo = searchInfo
    }
}
const actions = {
    // 异步操作
    async getSearchInfo({commit},searchParams){
        const result = await requestSearchInfo(searchParams);
        if(result.code === 200)
        {
            commit('RECEIVE_SEARCHINFO',result.data)
        }
    }
}
const getters = {
    // 简化数据操作,如果获取到的数据内部结构比较复杂，则可以在此处先做处理，来简化数据
    attrsList(state){
        return state.searchInfo.attrsList || []
    },
    goodsList(state){
        return state.searchInfo.goodsList || []
    },
    trademarkList(state){
        return state.searchInfo.trademarkList || []
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}