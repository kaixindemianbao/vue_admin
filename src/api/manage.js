import request from '@/common/utils/request'

export function machine_manage () {
  return request({
    url: 'http://10.254.124.60:9000/db_manage/',
    method: 'get'
  })
}

export function Machine_Add (host, type, machine_local, env, status, role) {
  return request({
    url: 'http://10.254.124.60:9000/db_manage/',
    method: 'post',
    data: { host, type, machine_local, env, status, role }
  })
}

export function Machine_Del (id) {
  return request({
    url: 'http://10.254.124.60:9000/db_manage/' + id + '/',
    method: 'delete',
    data: { id }
  })
}
export function Machine_Edit (id, type, machine_local, env, status, role) {
  return request({
    url: 'http://10.254.124.60:9000/db_manage/' + id + '/',
    method: 'put',
    data: { id, type, machine_local, env, status, role }
  })
}

