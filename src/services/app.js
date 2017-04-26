import request from '../utils/request'
import {serverInfo} from '../utils/serverConf'

export async function queryOnePage (params) {
  console.log(serverInfo)
  return request({
    url:'http://'+serverInfo.ServerIp+'/blog/queryOnePage',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },//这里也要设置下头部，后台才能获取到参数
    body: JSON.stringify(params),//草草草草草，居然没有用JSON.stringify
                                  //格式化一下，后台就获取不到数据而且都不报错
  })
}

export async function byIdGetDetailed (params) {
  return request({
    url:'http://'+serverInfo.ServerIp+'/blog/byIdGetDetailed',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params),
  })
}



export async function byIdGetComments (params) {
  return request({
    url:'http://'+serverInfo.ServerIp+'/blog/byIdGetComments',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params),
  })
}

export async function byIdGetReplys (params) {
  return request({
    url:'http://'+serverInfo.ServerIp+'/blog/byIdGetReplys',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params),
  })
}

export async function submitComment (params) {
  let commentType=params.CommentDate.type==="reply"?"submitReply":"submitComment"
  return request({
    url:'http://'+serverInfo.ServerIp+'/blog/'+commentType,
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params.CommentDate.data),
  })
}