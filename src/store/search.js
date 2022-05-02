import {requestSearchInfo} from "@/api"
const state = {
    // 存数据
    searchParams:{
        searchWord:"",
        category3IdList:"",
        limit:8,
        curPage:1,
        tradeMarkId:"",
        sort:1
    },
    searchResult : [],
    count:0
}
const mutations = {
    // 修改数据
    RECEIVE_SEARCHRESULT(state,data){
        state.searchResult = data.data;
        state.count = data.msg;
    },
    UPDATESEARCHPARAMS(state,searchParams){
        Object.assign(state.searchParams,searchParams);
    }
}
const actions = {
    // 异步操作
    async getSearchResult({commit}){
        const result = await requestSearchInfo(state.searchParams);
        if(result.code === 200)
        {
            commit('RECEIVE_SEARCHRESULT',result)

            return result;
        }
    },
    setSearchParams({commit},searchParams){
        commit("UPDATESEARCHPARAMS",searchParams);
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