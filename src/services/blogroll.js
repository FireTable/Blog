import request from '../utils/request'

export async function getAllBlogroll () {
  return request({
    url:'http://127.0.0.1:3005/blogroll/getAllBlogroll',
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    },//这里也要设置下头部，后台才能获取到参数
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
