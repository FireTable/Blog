import request from '../utils/request'

export async function getOnePageMessage (params) {
  return request({
    url:'http://127.0.0.1:3005/message/getOnePageMessage',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },//这里也要设置下头部，后台才能获取到参数
    body: JSON.stringify(params),
  })
}

export async function submitBlogrollApply(params) {
  return request({
    url:'http://127.0.0.1:3005/blogroll/submitBlogrollApply',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params),
  })
}
