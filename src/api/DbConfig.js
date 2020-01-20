import request from '@/common/utils/request'
export function dbaccount_add (type, r_role_user, r_role_password, status) {
  return request({
    url: 'http://10.254.124.60:9000/db_config/',
    method: 'post',
    data: {
      type, r_role_user, r_role_password, status
    }
  })
}

export function dbaccount_show () {
  return request({
    url: 'http://10.254.124.60:9000/db_config/',
    method: 'get'
  })
}

export function dbaccount_del (id) {
  return request({
    url: 'http://10.254.124.60:9000/db_config/' + id + '/',
    method: 'delete'
  })
}
export function inception_add (biaodan) {
  return request({
    url: 'http://10.254.124.60:9000/inception_config/',
    method: 'post',
    data: {
      biaodan
    }
  })
}

export function inception_select () {
  return request({
    url: 'http://10.254.124.60:9000/inception_config/',
    method: 'get'
  })
}

export function inceptioncon_select () {
  return request({
    url: 'http://10.254.124.60:9000/inception_global/',
    method: 'get'
  })
}
