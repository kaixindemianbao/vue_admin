<template>
  <div>
<el-table :data="logg" border style="width: 50%" ref="multipleTable">
    <el-table-column prop="user" label="姓名">
                  </el-table-column>
   <el-table-column prop="db" label="数据库">
                  </el-table-column>
    <el-table-column prop="comment_sql" label="具体sql">
                  </el-table-column>
    <el-table-column prop="riqi" label="日期">
                  </el-table-column>
</el-table>
  </div>
  </template>
  <script>
import { sql_log } from '../../api/select'
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
    sql_log().then((res) => {
      this.logg = res.data
    })
  }
}
</script>
