import request from '@/utils/request'
import BASE_URL from '@/api/base'

// 查询大屏数据列表
export function listCovid(query) {
  return request({
    url: BASE_URL +'system/covid/list',
    method: 'get',
    params: query
  })
}

// 查询大屏数据详细
export function getCovid(id) {
  return request({
    url: BASE_URL +'system/covid/' + id,
    method: 'get'
  })
}

// 新增大屏数据
export function addCovid(data) {
  return request({
    url: BASE_URL +'system/covid',
    method: 'post',
    data: data
  })
}

// 修改大屏数据
export function updateCovid(data) {
  return request({
    url: BASE_URL +'system/covid',
    method: 'put',
    data: data
  })
}

// 删除大屏数据
export function delCovid(id) {
  return request({
    url: BASE_URL +'system/covid/' + id,
    method: 'delete'
  })
}
