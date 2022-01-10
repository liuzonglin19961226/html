import request from '@/utils/request'
const api = {
  goodsList: '/interface/api/category/goodsList',
  goodsInsert: '/interface/api/category/goodsInsert',
  goodsSearch: '/interface/api/category/goodsSearch',
  goodsUpdate: '/interface/api/category/goodsUpdate',
  goodsDelete: '/interface/api/category/goodsDelete',
  returnGoodsInsert: '/interface/api/category/returnGoodsInsert',
  returnGoodsList: '/interface/api/category/returnGoodsList'
}

export function goodsList (parameter) {
  return request({
    url: api.goodsList,
    method: 'get',
    params: parameter
  })
}

export function goodsInsert (parameter) {
  return request({
    url: api.goodsInsert,
    method: 'get',
    params: parameter
  })
}

export function goodsUpdate (parameter) {
  return request({
    url: api.goodsUpdate,
    method: 'get',
    params: parameter
  })
}

export function goodsSearch (parameter) {
  return request({
    url: api.goodsSearch,
    method: 'get',
    params: parameter
  })
}

export function goodsDelete (parameter) {
  return request({
    url: api.goodsDelete,
    method: 'get',
    params: parameter
  })
}

export function returnGoodsInsert (parameter) {
  return request({
    url: api.returnGoodsInsert,
    method: 'get',
    params: parameter
  })
}

export function returnGoodsList (parameter) {
  return request({
    url: api.returnGoodsList,
    method: 'get',
    params: parameter
  })
}