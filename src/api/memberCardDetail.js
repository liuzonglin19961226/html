import request from '@/utils/request'
const api = {
  memberCardDetailList: '/interface/api/memberCardDetail/memberCardDetailList'
}

export function memberCardDetailList (parameter) {
  return request({
    url: api.memberCardDetailList,
    method: 'get',
    params: parameter
  })
}