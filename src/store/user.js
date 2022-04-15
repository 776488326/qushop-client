import { getUserTempId } from "@/utils/userabout"
import { reqUserRegister,reqCheckCode,reqUserLogin,reqGetUserInfo,reqUserAddress,reqTradeInfo} from "@/api"
const state = {
    // 存数据
    userTempId: getUserTempId(),
    token: localStorage.getItem('TOKEN'),
    userInfo:{},
    userAddress:[]
    }
    const mutations = {
        RECEIVE_TOKEN(state,token)
        {
            state.token = token
        },
        RECEIVE_USERINFO(state,userInfo){
            state.userInfo = userInfo
        },
        RECEIVE_CLEARTOKEN(state)
        {
            state.token = ''
        },
        RECEIVE_USERADDRESS(state,userAddress){
            state.userAddress = userAddress
        }
    }
    const actions = {
    // 异步操作
        async registerUser({commit},userInfo){
            const result = await reqUserRegister(userInfo)
            return result;
        },
        async getCheckCode({commit},phonenum)
        {
            const result = await reqCheckCode(phonenum)
            if(result.code ===200)
            {
                return result.data
            }
            else
            {
                return Promise.reject(new Error('faild'))
            }
        },
        async loginUser({commit},userInfo){
            const result = await reqUserLogin(userInfo)
            if(result.code ===200)
            {
                commit('RECEIVE_TOKEN',result.data.token)
                localStorage.setItem('TOKEN',result.data.token)
            }
            return result;
        },
        async reqGetUserInfo({commit}){
            try {
                const result = await reqGetUserInfo()
                if(result.code === 200)
                {
                    commit('RECEIVE_USERINFO',result.data)
                    return 'ok'
                }
            } catch (error) {
                return Promise.reject(new Error('faild'))
            }
        },
        async clearUserToken({commit}){
            commit('RECEIVE_CLEARTOKEN')
            localStorage.removeItem('TOKEN') //清除本地的token令牌
        },
        async getUserAddress({commit}){
            try {
                const result = await reqUserAddress()
                if(result.code)
                {
                    commit('RECEIVE_USERADDRESS',result.data)
                    return 'ok'
                }else
                {
                    return Promise.reject(new Error('服务器出错，地址获取失败!'))
                }       
            } catch (error) {
                return Promise.reject(new Error('faild'))
            }
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