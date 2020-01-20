import request from '@/common/utils/request'
export function machine () {
  return request({
    url: 'http://10.254.124.60:9000/dbquery/',
    method: 'get'
  })
}

export function db_sq_list (name) {
  return request({
    url: 'http://10.254.124.60:9000/dblist/',
    method: 'post',
    data: 'dbname'
  })
}

export function sql_log () {
  return request({
    url: 'http://10.254.124.60:9000/db_search/',
    method: 'get'
  }
  )
}
export function host_select () {
  return request({
    url: 'http://10.254.124.60:9000/dbquery/',
    method: 'get'
  })
}

export function redis_query (select_info) {
  return request({
    url: 'http://10.254.124.60:9000/redis_query/',
    method: 'post',
    data: { select_info }
  })
}
export function redis_type () {
  return request({
    url: 'http://10.254.124.60:9000/redis_query/',
    method: 'get'
  })
}

export function host_select2 (type) {
  return request({
    url: 'http://10.254.124.60:9000/host_db/',
    method: 'post',
    data: { type }
  })
}
export function meta_select () {
  return request({
    url: 'http://10.254.124.60:9000/mysql_cmd/',
    method: 'get'
  })
}
export function meta_edit (master) {
  return request({
    url: 'http://10.254.124.60:9000/mysql_cmd/',
    method: 'post',
    data: { master }
  })
}
export function save_log (query_sql) {
  return request({
    url: 'http://10.254.124.60:9000/save_sql/',
    method: 'post',
    data: { query_sql }
  })
}

export function delete_log (id) {
  return request({
    url: 'http://10.254.124.60:9000/save_sql/' + id + '/',
    method: 'delete',
    data: { id }
  })
}

export function select_log (query_sql) {
  return request({
    url: 'http://10.254.124.60:9000/save_sql/',
    method: 'get'
  })
}
export function host_select1 () {
  return request({
    url: 'http://10.254.124.60:9000/slowlog/',
    method: 'get'
  })
}

export function db_select (select_info) {
  return request({
    url: 'http://10.254.124.60:9000/dbquery/',
    method: 'post',
    data: { select_info }
  })
}
export function tableed_select (select_info) {
  return request({
    url: 'http://10.254.124.60:9000/dbquery/',
    method: 'post',
    data: { select_info }
  })
}

export function auth_host (type) {
  return request({
    url: 'http://10.254.124.60:9000/auth_host/',
    method: 'post',
    data: { type }
  })
}

export function auth_order () {
  return request({
    url: 'http://10.254.124.60:9000/order_list/',
    method: 'get'
  })
}

export function auth_db (hostname) {
  return request({
    url: 'http://10.254.124.60:9000/auth_database/',
    method: 'post',
    data: { hostname }
  })
}

export function table_select (auth) {
  return request({
    url: 'http://10.254.124.60:9000/auth_db/',
    method: 'post',
    data: { auth }
  })
}
export function sql_select (hostname, db, tablenamed, type, sql_text) {
  return request({
    url: 'http://10.254.124.60:9000/db_search/',
    method: 'post',
    data: { hostname, db, tablenamed, type, sql_text }
  })
}
