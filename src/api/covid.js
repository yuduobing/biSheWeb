import request from '@/utils/request'
import BASE_URL from '@/api/base'

export function getAll() {
  return request({
    url: BASE_URL + 'covid/getAll',
    method: 'GET'
  })
}
export function getPage(pageNum, pageSize) {
  return request({
    url: BASE_URL + 'covid/getPage',
    method: 'GET',
    params: {
      pageNum, pageSize
    }
  })
}

export function getLaster(num) {
  return request({
    url: BASE_URL + 'covid/getNewest',
    method: 'GET',
    params: { num }
  })
}

export function deleteById(id) {
  return request({
    url: BASE_URL + 'covid/deleteById',
    method: 'GET',
    params: {
      id
    }
  })
}

export function getById(id) {
  return request({
    url: BASE_URL + 'covid/getById',
    method: 'GET',
    params: {
      id
    }
  })
}

export function save(obj) {
  return request({
    url: BASE_URL + 'covid/save',
    method: 'POST',
    data: obj
  })
}
export function update(obj) {
  return request({
    url: BASE_URL + 'covid/save',
    method: 'POST',
    data: obj
  })
}

export function getToDayConfirmed() {
  return request({
    url: BASE_URL + 'covid/toDayConfirmed',
    method: 'GET'
  })
}
export function getQuanguoConfirmed() {
  return request({
    url: BASE_URL + 'covid/quanguoConfirmed',
    method: 'GET'
  })
}

export function getDeadOfProvince() {
  return request({
    url: BASE_URL + 'covid/deadOfProvince',
    method: 'GET'
  })
}

export function getConfirmedTread(lastday) {
  return request({
    url: BASE_URL + 'covid/confirmedTread',
    method: 'GET',
    params: {
      lastday
    }
  })
}

export function getZhiyuTread(lastday) {
  return request({
    url: BASE_URL + 'covid/zhiyuTread',
    method: 'GET',
    params: {
      lastday
    }
  })
}

export function getLeijiZhiyu() {
  return request({
    url: BASE_URL + 'covid/leijiZhiyu',
    method: 'GET'
  })
}

export function getLejiDead() {
  return request({
    url: BASE_URL + 'covid/leijiDead',
    method: 'GET'
  })
}

export function getLeijiConfirmed() {
  return request({
    url: BASE_URL + 'covid/leijiConfirmed',
    method: 'GET'
  })
}

export function getDeadRate() {
  return request({
    url: BASE_URL + 'covid/deadRate',
    method: 'GET'
  })
}
export function getZhiyuRate() {
  return request({
    url: BASE_URL + 'covid/zhiyuRate',
    method: 'GET'
  })
}

export function getDeadAndZhiyuRate() {
  return request({
    url: BASE_URL + 'covid/deadAndZhiyuRate',
    method: 'GET'
  })
}
