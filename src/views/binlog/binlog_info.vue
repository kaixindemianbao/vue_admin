<template>
  <div>
<el-table :data="logg" border  ref="multipleTable">
    <el-table-column prop="master" label="主库" width="150px">
                  </el-table-column>
      <el-table-column prop="w_vip" label="主库-VIP" width="150px">
                  </el-table-column>
  <el-table-column  label="binlog信息">
          <template slot-scope="scope">
        <el-button @click="chakan1(scope.row.w_vip)">binlog信息</el-button></template>
                  </el-table-column>
  <el-table-column  label="死锁信息">
          <template slot-scope="scope">
        <el-button @click="chakan2(scope.row.w_vip)">死锁信息</el-button></template>
                  </el-table-column>
</el-table>
     <el-dialog  title="查看结果" :visible.sync="rstform"  :append-to-body=false class="dialog-wrap"  >
 <el-table   ref="multipleTable" :data="cep_result" style="width: 100%" >
   <el-table-column prop="binlog_file" label="日志文件" width="150px">
                  </el-table-column>
    <el-table-column prop="binlog_position" label="日志位置" width="150px">
                  </el-table-column>
      <el-table-column prop="binlog_expire" label="保留日期" width="150px">
                  </el-table-column>
   <el-table-column prop="binlog_type" label="日志格式" width="150px">
                  </el-table-column>
    </el-table>
</el-dialog>
  </div>
  </template>
  <script>
import { meta_select } from '../../api/select'
import { binlog_info } from '../../api/status'

export default {
  name: 'Sql_log',
  border: true,
  inject: ['reload'],
  data: function () {
    return {
      logg: [],
      rstform: false,
      cep_result: [],
      type: '',
      filename: ''
    }
  },
  created: function () {
    meta_select().then((res) => {
      this.logg = res.data
    })
  },
  methods: {
    chakan1: function (row) {
      this.rstform = true
      this.type = 'binlog'
      binlog_info(row, this.type).then((res) => {
        this.cep_result = res.data
        console.log(this.cep_result)
      })
    },
    chakan2: function (row) {
      this.type = 'deadlock'
      binlog_info(row, this.type).then((res) => {
        this.filename = res.data
        window.location.href = 'http://10.254.124.60:8088/' + this.filename
      })
    }
  }
}
</script>
