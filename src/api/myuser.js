import request from '@/utils/request'
import BASE_URL from '@/api/base'

export function getPage(pageNum, pageSize, matchStr) {
  return request({
    url: BASE_URL + 'user/page',
    method: 'GET',
    params: {
      pageNum, pageSize, matchStr
    }
  })
}

export function deleteById(id) {
  return request({
    url: BASE_URL + 'user/deleteById',
    method: 'GET',
    params: {
      id
    }
  })
}

export function getById(id) {
  return request({
    url: BASE_URL + 'user/getById',
    method: 'GET',
    params: {
      id
    }
  })
}

export function save(obj) {
  return request({
    url: BASE_URL + 'user/save',
    method: 'POST',
    data: obj
  })
}
export function update(obj) {
  return request({
    url: BASE_URL + 'user/save',
    method: 'POST',
    data: obj
  })
}
