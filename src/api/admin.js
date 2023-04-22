import request from '@/utils/request'
import BASE_URL from '@/api/base'

export function getAllAdmin() {
  return request({
    url: BASE_URL + 'admin/getAll',
    method: 'GET'
  })
}

export function deleteById(id) {
  return request({
    url: BASE_URL + 'admin/deleteById',
    method: 'GET',
    params: {
      id
    }
  })
}
export function save(obj) {
  return request({
    url: BASE_URL + 'admin/save',
    method: 'POST',
    data: obj
  })
}
export function getAdminInfo() {
  return request({
    url: BASE_URL + 'admin/info',
    method: 'get'
  })
}
