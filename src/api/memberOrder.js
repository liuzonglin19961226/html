import request from '@/utils/request'
const api = {
  memberOrderList: '/interface/api/memberOrder/memberOrderList',
  memberOrderInsert: '/interface/api/memberOrder/memberOrderInsert',
  memberOrderDetail: '/interface/api/memberOrder/memberOrderDetail',
  memberOrderPay: '/interface/api/memberOrder/memberOrderPay',
  memberOrderPrint: '/interface/api/memberOrder/memberOrderPrint',
  memberOrderChange: '/interface/api/memberOrder/memberOrderChange',
}

export function memberOrderList (parameter) {
  return request({
    url: api.memberOrderList,
    method: 'get',
    params: parameter
  })
}

export function memberOrderInsert (parameter) {
  return request({
    url: api.memberOrderInsert,
    method: 'get',
    params: parameter
  })
}

export function memberOrderDetail (parameter) {
  return request({
    url: api.memberOrderDetail,
    method: 'get',
    params: parameter
  })
}


export function memberOrderPay (parameter) {
  return request({
    url: api.memberOrderPay,
    method: 'get',
    params: parameter
  })
}

export function memberOrderPrint (parameter) {
  return request({
    url: api.memberOrderPrint,
    method: 'get',
    params: parameter
  })
}

export function memberOrderChange (parameter) {
  return request({
    url: api.memberOrderChange,
    method: 'get',
    params: parameter
  })
}
