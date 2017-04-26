import request from '../utils/request'
import {serverInfo} from '../utils/serverConf'

export async function getAllBlogroll () {
  return request({
    url:'http://'+serverInfo.ServerIp+'/blogroll/getAllBlogroll',
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    },//这里也要设置下头部，后台才能获取到参数
  })
}

export async function submitBlogrollApply(params) {
  return request({
    url:'http://'+serverInfo.ServerIp+'/blogroll/submitBlogrollApply',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params),
  })
}
