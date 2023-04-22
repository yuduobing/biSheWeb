import request from '@/utils/request'
import BASE_URL from '@/api/base'

export function getAll() {
  return request({
    url: BASE_URL + 'chongwu/getAll',
    method: 'GET'
  })
}
export function getPage(pageNum, pageSize) {
  return request({
    url: BASE_URL + 'chongwu/getPage',
    method: 'GET',
    params: {
      pageNum, pageSize
    }
  })
}
export function shenqingInfo() {
  return request({
    url: BASE_URL + 'chongwu/shenqingInfo',
    method: 'GET'
  })
}

export function setStatus(chongwuId, status) {
  return request({
    url: BASE_URL + 'chongwu/setStatus',
    method: 'GET',
    params: {
      chongwuId, status
    }
  })
}

export function deleteById(id) {
  return request({
    url: BASE_URL + 'chongwu/deleteById',
    method: 'GET',
    params: {
      id
    }
  })
}

export function save(obj) {
  return request({
    url: BASE_URL + 'chongwu/save',
    method: 'POST',
    data: obj
  })
}
