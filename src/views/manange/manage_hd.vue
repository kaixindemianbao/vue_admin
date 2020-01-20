<template>
  <div>
<el-table :data="logg" border style="width: 50%" ref="multipleTable">
    <el-table-column prop="master" label="主库">
                  </el-table-column>
  <el-table-column prop="riqi" label="更新日期"></el-table-column>
                  <el-table-column>
     <template slot-scope="scope">
     <el-button size="small" type="danger" @click='Row_Edit(scope.row)'>更新</el-button>
   </template>
   </el-table-column>
</el-table>
  </div>
  </template>
  <script>
import { meta_select, meta_edit } from '../../api/select'
export default {
  name: 'manage_meta',
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
  },
  methods: {
    Row_Edit: function (row) {
      meta_edit(row.master).then((res) => {
        this.reload()
        this.dblist2 = res.data
      })
        .catch(function (err) {
          alert(err)
        })
    }
  }
}
</script>
