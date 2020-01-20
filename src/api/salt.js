import request from '@/common/utils/request'

export function salt_login () {
  return request({
    url: 'http://10.254.124.60:9000/api_test/',
    method: 'get'
  })
}
