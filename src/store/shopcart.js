import { reqUpdateShopNum,reqShopCartList,reqShopCartState,reqDeleteShopCart} from "@/api"
const state = {
    shopcartList: {}
}
const mutations = {
    RECEIVESHOPCARTLIST(state,shopcartList){
        state.shopcartList = shopcartList
    }
}
const actions = {
    // async 返回的一定是promise，与return无关
    // 返回的promise的结果由return决定
    async updateShopCartNum({commit},{skuId,skuNum}){
        const result = await reqUpdateShopNum(skuId,skuNum)
        if(result.code === 200)
        {
            return 'ok'
        }
        else
        {
            return Promise.reject(new Error('faild'))
        }
    },
    async getShopCartList({commit},cartId){
        const result = await reqShopCartList(cartId) 
        if(result.code === 200)
        {
            commit('RECEIVESHOPCARTLIST',result.data)
        }
    },
    async updateShopCartState({commit},{skuId,isChecked}){
        const result = await reqShopCartState(skuId,isChecked)
        if(result.code === 200)
        {
            return 'ok'
        }
        else
        {
            return Promise.reject(new Error('faild'))
        }
    },
    async updateShopCartAllState({commit,dispatch,getters},isCheckAll){
        let promises = []
        getters.shopcartList.forEach((item)=>{
            if(item.isChecked!==isCheckAll){
                promises.push(dispatch('updateShopCartState',{skuId:item.skuId,isChecked:isCheckAll}))
            }
        })
        return Promise.all(promises);
    },
    async deleteShopCart({commit},params){
        const result = await reqDeleteShopCart(params)
        if(result.code===200)
        {
            return 'ok'
        }
        else
        {
            return Promise.reject(new Error('faild'))
        }
    },
    async deleteAllShopCart({commit,getters,dispatch})
    {
        let promises = []
        getters.shopcartList.forEach((item)=>{
            if(item.isChecked)
            {
                promises.push(dispatch('deleteShopCart',item.skuId))
            }
        })
        return Promise.all(promises)
    },
    
}
const getters = {
    shopcartList(state){
        return state.shopcartList?state.shopcartList.shopList:[] || []
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}