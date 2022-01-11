import request from '@/utils/request'
const api = {
  memberCardList: '/interface/api/memberCard/memberCardList',
  memberCardInsert: '/interface/api/memberCard/memberCardInsert',
  memberCardRecharge: '/interface/api/memberCard/memberCardRecharge',
  memberCardPay: '/interface/api/memberCard/memberCardPay',
  memberCardListNoPage: '/interface/api/memberCard/memberCardListNoPage',
  memberCardUpdate: '/interface/api/memberCard/memberCardUpdate'
}

export function memberCardList (parameter) {
  return request({
    url: api.memberCardList,
    method: 'get',
    params: parameter
  })
}

export function memberCardInsert (parameter) {
  return request({
    url: api.memberCardInsert,
    method: 'get',
    params: parameter
  })
}

export function memberCardRecharge (parameter) {
  return request({
    url: api.memberCardRecharge,
    method: 'get',
    params: parameter
  })
}

export function memberCardPay (parameter) {
  return request({
    url: api.memberCardPay,
    method: 'get',
    params: parameter
  })
}

export function memberCardListNoPage (parameter) {
  return request({
    url: api.memberCardListNoPage,
    method: 'get',
    params: parameter
  })
}

export function memberCardUpdate (parameter) {
  return request({
    url: api.memberCardUpdate,
    method: 'get',
    params: parameter
  })
}