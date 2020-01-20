<template>
  <div>
<el-table :data="logg" border style="width: 50%" ref="multipleTable">
    <el-table-column prop="user" label="操作用户">
                  </el-table-column>
   <el-table-column prop="host1" label="数据服务器">
                  </el-table-column>
   <el-table-column prop="host2" label="应用服务器">
                  </el-table-column>
    <el-table-column prop="sql_db" label="数据库">
                  </el-table-column>
     <el-table-column prop="sql_time" label="sql耗时">
                  </el-table-column>
   <el-table-column prop="sql_comment" :show-overflow-tooltip=true label="具体sql">
                  </el-table-column>
   <el-table-column prop="cmd_status" label="执行状况">
                  </el-table-column>
    <el-table-column prop="riqi" label="日期">
                  </el-table-column>
</el-table>
  </div>
  </template>
  <script>
import { query_session } from '../../api/status'
export default {
  name: 'Sql_log',
  border: true,
  inject: ['reload'],
  data: function () {
    return {
      logg: [],
      type_list: [{ 'type': 'master' }, { 'type': 'slave' }]
    }
  },
  created: function () {
    query_session().then((res) => {
      this.logg = res.data
    })
  }
}
</script>
