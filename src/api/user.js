import request from '@/utils/request'
const api = {
  userList: '/interface/api/user/userList',
  initPassword: '/interface/api/user/initPassword',
  deleteUser: '/interface/api/user/deleteUser',
  deleteUsers: '/interface/api/user/deleteUsers',
  lockUser: '/interface/api/user/lockUser',
  unLockUser: '/interface/api/user/unLockUser',
  lockUsers: '/interface/api/user/lockUsers',
  insertUser: '/interface/api/user/insertUser'
}

export function userList (parameter) {
  return request({
    url: api.userList,
    method: 'get',
    params: parameter
  })
}

export function initPassword (parameter) {
  return request({
    url: api.initPassword,
    method: 'get',
    params: parameter
  })
}
export function deleteUser (parameter) {
  return request({
    url: api.deleteUser,
    method: 'get',
    params: parameter
  })
}
export function deleteUsers (parameter) {
  return request({
    url: api.deleteUsers,
    method: 'get',
    params: parameter
  })
}
export function lockUser (parameter) {
  return request({
    url: api.lockUser,
    method: 'get',
    params: parameter
  })
}
export function unLockUser (parameter) {
  return request({
    url: api.unLockUser,
    method: 'get',
    params: parameter
  })
}
export function lockUsers (parameter) {
  return request({
    url: api.lockUsers,
    method: 'get',
    params: parameter
  })
}
export function insertUser (parameter) {
  return request({
    url: api.insertUser,
    method: 'get',
    params: parameter
  })
}
