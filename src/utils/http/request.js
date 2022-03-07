import baseRequest from "../base/baseRequest";

export function request(val,url){
    return baseRequest({
        data:val,
        method: 'post',
        url:url
    })
}