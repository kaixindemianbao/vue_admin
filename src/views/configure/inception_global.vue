<template>
  <div>
<el-table :data="(valuelist || [])"  border style="width: 100%; margin-top: 20px" width=100% ref="multipleTable">
      <el-table-column  prop="label" label="类型"></el-table-column>
      <el-table-column  prop="key"  label="状态"></el-table-column>
        <el-table-column>
        <template slot-scope="scope">
        <el-button   type="danger" size="small" >{{chakan(scope.row.key)}}</el-button>  </template>
      </el-table-column>
</el-table>
  </div>
</template>
<script>
  import { inceptioncon_select } from '../../api/DbConfig'

  export default {
    name: 'inception',
    border: true,
    inject: ['reload'],
    data: function () {
      return {
        list1: [],
        addForms: false,
        addform: {
          inc_host: '',
          inc_port: '',
          inc_user: '',
          inc_password: '',
          db_host: '',
          db_port: '',
          db_user: '',
          db_password: ''
        },
        result: '',
        valuelist: [],
        zhuangtai: ''

      }
    },
    created () {
      inceptioncon_select()
        .then((res) => {
          this.valuelist = res.data
        })
        .catch(function (err) {
          alert(err)
        })
    },
    methods: {
      chakan: function (key) {
        if (key === 'OFF') {
          return '打开'
        } else if (key === 'ON') {
          return '关闭'
        } else {
          return '调整'
        }
      }
    }
  }

</script>
