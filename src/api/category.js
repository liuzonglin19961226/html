import request from '@/utils/request'
const api = {
  categoryList: '/interface/api/category/categoryList',
  categoryUpdate: '/interface/api/category/categoryUpdate',
  categoryInsert: '/interface/api/category/categoryInsert',
  categoryDelete: '/interface/api/category/categoryDelete',
  categoryGoodsList: '/interface/api/category/categoryGoodsList',
}

export function categoryGoodsList (parameter) {
  return request({
    url: api.categoryGoodsList,
    method: 'get',
    params: parameter
  })
}

export function categoryList (parameter) {
  return request({
    url: api.categoryList,
    method: 'get',
    params: parameter
  })
}

export function categoryUpdate (parameter) {
  return request({
    url: api.categoryUpdate,
    method: 'get',
    params: parameter
  })
}

export function categoryInsert (parameter) {
  return request({
    url: api.categoryInsert,
    method: 'get',
    params: parameter
  })
}

export function categoryDelete (parameter) {
  return request({
    url: api.categoryDelete,
    method: 'get',
    params: parameter
  })
}