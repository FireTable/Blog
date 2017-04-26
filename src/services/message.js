import request from '../utils/request'
import {serverInfo} from '../utils/serverConf'

export async function getOnePageMessage (params) {
  return request({
    url:'http://'+serverInfo.ServerIp+'/message/getOnePageMessage',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },//这里也要设置下头部，后台才能获取到参数
    body: JSON.stringify(params),
  })
}

export async function submitMessage(params) {
  return request({
    url:'http://'+serverInfo.ServerIp+'/message/submitMessage',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params),
  })
}
