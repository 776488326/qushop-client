// 生成用户临时标识
import { v4 as uuidv4 } from 'uuid';
export function getUserTempId(){
    // 先检查localstorage中是否已经存在临时标识
    // 若存在则读取并使用
    // 若不存则使用uuid来生成并存储到localstorage中
    let userTempId = localStorage.getItem('USERTEMPID_KEY')
    if(userTempId)
    {
        return userTempId
    }
    else
    {
        let userTempId = uuidv4()
        localStorage.setItem('USERTEMPID_KEY',userTempId)
        return userTempId
    }
}