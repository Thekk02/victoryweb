import request from"@/utils/request"

//系统相关
export const login = (data) =>{
    return request.post('/user/login',data)
}





























