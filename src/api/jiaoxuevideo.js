import request from '@/utils/request'
import BASE_URL from '@/api/base'

export function getAll() {
  return request({
    url: BASE_URL + 'jiaoxue/getAll',
    method: 'GET'
  })
}

export function getPage(pageNum, pageSize) {
  return request({
    url: BASE_URL + 'jiaoxue/getPage',
    method: 'GET',
    params: {
      pageNum, pageSize
    }
  })
}

export function deleteById(id) {
  return request({
    url: BASE_URL + 'jiaoxue/deleteById',
    method: 'GET',
    params: {
      id
    }
  })
}

export function save(obj) {
  return request({
    url: BASE_URL + 'jiaoxue/save',
    method: 'POST',
    data: obj
  })
}
