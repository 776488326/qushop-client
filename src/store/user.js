import { getUserTempId } from "@/utils/userabout"

import { reqUserLogin,reqUserRegister,reqGetUserInfo,requpdateUserInfo } from "@/api"

const state = {
    // 存数据
    userTempId: getUserTempId(),
    token: localStorage.getItem('TOKEN'),
    userInfo: null
}
const mutations = {
    RECEIVE_TOKEN(state, token) {
        state.token = token
    },
    RECEIVE_USERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    RECEIVE_CLEARTOKENANDINFO(state) {
        state.token = '';
        state.userInfo = null;
    }
}
const actions = {
    // 异步操作
    async registerUser({ commit }, userInfo) {
        const result = await reqUserRegister(userInfo)
        return result;
    },
    async loginUser({ commit }, userInfo) {
        const result = await reqUserLogin(userInfo)
        if (result.code === 200) {
            commit('RECEIVE_TOKEN', result.data.token)
            localStorage.setItem('TOKEN', result.data.token)
        }
        return result;
    },
    async reqGetUserInfo({ commit }) {
        try {
            const result = await reqGetUserInfo()
            if (result.code === 200) {
                commit('RECEIVE_USERINFO', result.data)
                return 'ok'
            }
        } catch (error) {
            return Promise.reject(new Error('faild'))
        }
    },
    clearUserTokenAndInfo({ commit }) {
        commit('RECEIVE_CLEARTOKENANDINFO')
        localStorage.removeItem('TOKEN') //清除本地的token令牌
    },
    async updateUserInfo({ commit },userInfo) {
        try {
            const res = await requpdateUserInfo(userInfo);
            if(res.code == 200){
                commit("RECEIVE_USERINFO",userInfo);
                return res;
            }
        } catch (error) {
            return Promise.reject(new Error('faild'))
        }
    },

}
const getters = {
    // 简化数据操作
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}