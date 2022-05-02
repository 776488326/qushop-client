import { requestCategoryList,requestBannerList,requestFloorList } from "@/api"
const state = {
// 存数据
    categoryList : [],
    bannerList : [],
    floorList : [],
}
const actions = {
// 异步操作
    async getCategoryList({commit}){
        // 发请求拿数据，提交给mutations
        // await和async使用时可实现同步代码实现异步效果
        // .then().catch()使用时需要从传入回调，仍然是异步效果
        const result = await requestCategoryList()
        if(result.code === 200)
        {
            commit('RECEIVE_CATEGORYLIST',result.data)
        }
    },
    async getBannerList({commit}){
        const result = await requestBannerList()
        if(result.code === 200)
        {
            commit('RECEIVE_BANNERLIST',result.data)
        }
    },
    async getFloorList({commit}){
        const result = await requestFloorList()
        if(result.code === 200)
        {
            commit('RECEIVE_FLOORLIST',result.data)
        }
    }
}
const mutations = {
// 修改数据
    RECEIVE_CATEGORYLIST(state,categoryList)
    {
        state.categoryList = categoryList.slice(0,15);
    },
    RECEIVE_BANNERLIST(state,bannerList)
    {
        state.bannerList = bannerList;
    },
    RECEIVE_FLOORLIST(state,floorList)
    {
        state.floorList = floorList;
    }
}
const getters = {
// 简化数据操作

}
export default {
    
    state,
    mutations,
    actions,
    getters
}