import request from '@/common/utils/request'
export function mysql_dml (hostname, backup, db, zhuti, sql, dev_manager, sql_type) {
  return request({
    url: 'http://10.254.124.60:9000/mysql_dml/',
    method: 'post',
    data: {
      hostname,
      backup,
      db,
      zhuti,
      sql,
      dev_manager,
      sql_type
    }
  })
}
