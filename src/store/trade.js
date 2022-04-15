import {reqTradeInfo,reqUserAddress} from '@/api'
const state = {
    tradeInfo : {}
};
const mutations = {
    RECEIVE_TRADE(state,tradeInfo){
        state.tradeInfo = tradeInfo
    }
};
const actions = {
    async getTradeInfo({commit}){
        try {
            const result = await reqTradeInfo()
            if(result.code===200)
            {
                commit('RECEIVE_TRADE',result.data)
            }
            else
            {
                return Promise.reject(new Error('服务器出错，交易信息获取失败!'))
            }
        } catch (error) {
            return Promise.reject(new Error('faild'))
        }

    },
    async getAddressInfo(){
        try {
            const result = await reqUserAddress()
            if(result === 200)
            {
                return 'ok'
            }
            else
            {
                return Promise.reject(new Error('服务器出错，地址信息获取失败!'))
            }
        } catch (error) {
            return Promise.reject( new Error('faild'))
        }
    }
};
const getters = {

}
export default {
    state,
    mutations,
    actions,
    getters
}