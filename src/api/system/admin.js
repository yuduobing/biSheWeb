import request from '@/utils/request'
import BASE_URL from '@/api/base'

// 查询用户表列表
export function listAdmin(query) {
  return request({
    url: BASE_URL +'system/admin/list',
    method: 'get',
    params: query
  })
}

// 查询用户表详细
export function getAdmin(id) {
  return request({
    url: BASE_URL +'system/admin/' + id,
    method: 'get'
  })
}

// 新增用户表
export function addAdmin(data) {
  return request({
    url: BASE_URL +'system/admin',
    method: 'post',
    data: data
  })
}

// 修改用户表
export function updateAdmin(data) {
  return request({
    url: BASE_URL +'system/admin',
    method: 'put',
    data: data
  })
}

// 删除用户表
export function delAdmin(id) {
  return request({
    url: BASE_URL +'system/admin/' + id,
    method: 'delete'
  })
}
