import request from "./ajax"

const setSitetVisitCount = async ()=>{
    return request({
        url:"/site/visit",
        method:"get"
    })
}

const getSiteInfo = async ()=>{
    return request({
        url:"/site/msg",
        method:"get"
    })
}

const getHotTop = async (skip)=>{
    return request({
        url:`/site/hot/${skip}`,
        method:"get"
    })
}

const getBestSelectList = async ()=>{
    return request({
        url:'/site/best',
        method:"get"
    })
}



export {
    setSitetVisitCount,
    getSiteInfo,
    getHotTop,
    getBestSelectList,
}