import {request} from "./request";
//首页发送的请求都在这里
export function getHomeMultiData() {
  //你只管发请求，处理结果的事交给then来做
  return request({
    url:'/home/multidata'
  })
}

export function getHomeGoods(type,page) {
  return request({
    url:'/home/data',
    params:{
      type,
      page
    }
  })
}
