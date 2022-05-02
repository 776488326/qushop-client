import { setSitetVisitCount,getSiteInfo,getHotTop,requestCategoryList} from "@/api";

const state = {
    siteInfo: {
        swiperList:[]
    },
    brandList:[],
    hotTopList: [],
    categoryList:[],
}

const actions = {
    async requestCategoryList({commit}){
        try {
            const res = await requestCategoryList();
            if(res.code != 200){
                return res;
            }else{
                commit("SETCATEGORYLIST",res.data);
                return res;
            }
        } catch (error) {
            return error;
        }
    },
    async setSitetVisitCount(){
        try {
            const res = await setSitetVisitCount();
            if(res.code != 200){
                return res;
            }
        } catch (error) {
            return error;
        }
    },
    async getSiteInfo({commit}){
        try {
            const res = await getSiteInfo();
            if(res.code != 200){
                return res;
            }else{
                let params = {
                    siteInfo: res.data,
                    brandList: res.msg
                }
                commit("GETSITEINFO",params);
                return res;
            }
        } catch (error) {
            return error
        }
    },
    async getHotTop({commit},skip){
        try {
            const res = await getHotTop(skip);
            if(res.code != 200){
                return res;
            }else{
                commit("GETHOTTOP",res.data);
                return res;
            }
        } catch (error) {
            return error
        }
    },
}

const mutations = {
    SETCATEGORYLIST(state,categoryList){
        state.categoryList = categoryList;
    },
    GETSITEINFO(state,params){
        state.siteInfo = params.siteInfo;
        state.brandList = params.brandList;
    },
    GETHOTTOP(state,hotTopList){
        state.hotTopList = hotTopList;
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