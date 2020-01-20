import request from '@/common/utils/request'
export function show_order (page) {
  return request({
    url: 'http://10.254.124.60:9000/auth_order/?page=' + page,
    method: 'get'
  })
}

export function show_order_list (order_id, order_opeation) {
  return request({
    url: 'http://10.254.124.60:9000/order/list/',
    method: 'post',
    data: {
      order_id: order_id,
      order_opeation: order_opeation
    }
  })
}
export function inception_result (order_id) {
  return request({
    url: 'http://10.254.124.60:9000/inception_result/',
    method: 'post',
    data: {
      order_id: order_id
    }
  })
}

export function op_order (row) {
  return request({
    url: 'http://10.254.124.60:9000/order/',
    method: 'post',
    data: {
      row
    }
  })
}
export function op_order_reject (order_id) {
  return request({
    url: 'http://10.254.124.60:9000/order/list/',
    method: 'post',
    data: {
      order_id
    }
  })
}

