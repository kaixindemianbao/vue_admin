import request from '@/common/utils/request'
export function db_status (host, port) {
  return request({
    url: 'http://10.254.124.60:9000/db_status/',
    method: 'post',
    data: { host, port }
  })
}
export function session_kill (host, port, session_id) {
  return request({
    url: 'http://10.254.124.60:9000/mysql_session/',
    method: 'post',
    data: { host, port, session_id }
  })
}

export function query_session () {
  return request({
    url: 'http://10.254.124.60:9000/query_session/',
    method: 'get'
  })
}

export function binlog (shiwu) {
  return request({
    url: 'http://10.254.124.60:9000/binlog/',
    method: 'post',
    data: { shiwu }
  })
}

export function binlog_info (w_vip, type) {
  return request({
    url: 'http://10.254.124.60:9000/binlog_info/',
    method: 'post',
    data: { w_vip, type }
  })
}

export function zk_config (user_config) {
  return request({
    url: 'http://10.254.124.60:9000/zk_config/',
    method: 'post',
    data: { user_config }
  })
}

export function slow_log (host, db, start_time, end_time) {
  return request({
    url: 'http://10.254.124.60:9000/slowlog/',
    method: 'post',
    data: { host, db, start_time, end_time }
  })
}

export function linux_cmd (select_info) {
  return request({
    url: 'http://10.254.124.60:9000/linux_cmd/',
    method: 'post',
    data: { select_info }
  })
}
export function mysql_archiver (pt) {
  return request({
    url: 'http://10.254.124.60:9000/mysql_archiver/',
    method: 'post',
    data: { pt }
  })
}

export function linux_log () {
  return request({
    url: 'http://10.254.124.60:9000/linux_cmd/',
    method: 'get'
  })
}

