import request from '@/utils/request'
import BASE_URL from '@/api/base'

export function login(data) {
  return request({
    url: BASE_URL + 'admin/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: BASE_URL + 'admin/info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: BASE_URL + 'admin/logout',
    method: 'GET'
  })
}


export function update(user) {
  return request({
    url: BASE_URL + 'user/update',
    method: 'POST',
    data: user
  })
}

