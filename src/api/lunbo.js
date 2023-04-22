import request from '@/utils/request'
import BASE_URL from '@/api/base'

export function getAll() {
  return request({
    url: BASE_URL + 'lunbo/getAll',
    method: 'GET'
  })
}

export function deleteById(id) {
  return request({
    url: BASE_URL + 'lunbo/deleteById',
    method: 'GET',
    params: {
      id
    }
  })
}

export function save(obj) {
  return request({
    url: BASE_URL + 'lunbo/save',
    method: 'POST',
    data: obj
  })
}
