import request from '@/common/utils/request'
export function ldap_login (username, password, biaoshi) {
  return request({
    url: 'http://10.254.124.60:9000/auth/',
    method: 'post',
    data: { username, password, biaoshi }
  })
}

export function getInfo (token) {
  return request({
    url: 'http://10.254.124.60:9000/auth/',
    method: 'get',
    params: { token } })
}

export function user_manage () {
  return request({
    url: 'http://10.254.124.60:9000/user_manage/',
    method: 'get'
  })
}
export function user_del (username) {
  return request({
    url: 'http://10.254.124.60:9000/user_manage/',
    method: 'delete',
    data: {
      'username': [username]
    }
  })
}
export function user_add (userform) {
  return request({
    url: 'http://10.254.124.60:9000/user_manage/',
    method: 'post',
    data: {
      userform
    }
  })
}
export function user_edit (userform) {
  return request({
    url: 'http://10.254.124.60:9000/user_manage/',
    method: 'put',
    data: {
      userform
    }
  })
}

export function user_group () {
  return request({
    url: 'http://10.254.124.60:9000/user_group_manage/',
    method: 'get'
  })
}

export function edit_group (id, department, dev_manager, dba_manager) {
  return request({
    url: 'http://10.254.124.60:9000/user_group_manage/' + id + '/',
    method: 'put',
    data: {
      department, dev_manager, dba_manager
    }
  })
}

export function del_group (id) {
  return request({
    url: 'http://10.254.124.60:9000/user_group_manage/' + id + '/',
    method: 'delete'
  })
}
export function add_group (department, dev_manager, dba_manager) {
  return request({
    url: 'http://10.254.124.60:9000/user_group_manage/',
    method: 'post',
    data: {
      department, dev_manager, dba_manager
    }
  })
}

export function auth_group (authadd) {
  return request({
    url: 'http://10.254.124.60:9000/group_manage/',
    method: 'post',
    data: {
      authadd
    }
  })
}

export function auth_list (num) {
  return request({
    url: 'http://10.254.124.60:9000/group_manage/?page=' + num,
    method: 'get'
  })
}

export function db_list (dbname) {
  return request({
    url: 'http://10.254.124.60:9000/dblist/',
    method: 'post',
    data: { dbname }
  })
}
export function db_list2 () {
  return request({
    url: 'http://10.254.124.60:9000/dblist/',
    method: 'get'
  })
}

export function auth_name () {
  return request({
    url: 'http://10.254.124.60:9000/auth_name/',
    method: 'get'
  })
}
export function auth_name_list (yonghuming) {
  return request({
    url: 'http://10.254.124.60:9000/auth_name/',
    method: 'post',
    data: {
      yonghuming
    }
  })
}

export function del_permission (id) {
  return request({
    url: 'http://10.254.124.60:9000/group_manage/' + id + '/',
    method: 'delete'
  })
}

export function query_permission (select_info) {
  return request({
    url: 'http://10.254.124.60:9000/group_query/',
    method: 'post',
    data: { select_info }
  })
}
