<template>
  <div>
<el-table :data="logg" border style="width: 100%" ref="multipleTable">
    <el-table-column prop="master" label="主库">
                  </el-table-column>
   <el-table-column prop="slave" label="从库" width="200px">
                  </el-table-column>
    <el-table-column prop="db_name" label="数据库名称" width="800px">
                  </el-table-column>
      <el-table-column prop="w_vip" label="主库-VIP" width="200px">
                  </el-table-column>
      <el-table-column prop="r_vip" label="从库-VIP" width="200px">
                  </el-table-column>
</el-table>
  </div>
  </template>
  <script>
import { meta_select } from '../../api/select'
export default {
  name: 'Sql_log',
  border: true,
  inject: ['reload'],
  data: function () {
    return {
      logg: []
    }
  },
  created: function () {
    meta_select().then((res) => {
      this.logg = res.data
    })
  }
}
</script>
