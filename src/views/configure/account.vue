<template>
  <div>
    <el-table :data="(list1 || [])"  border style="width: 100%; margin-top: 20px" width=100% ref="multipleTable">
      <el-table-column  prop="type" label="账号类型"></el-table-column>
      <el-table-column  prop="r_role_user"  label="账号名称"></el-table-column>
      <el-table-column  prop="status"  label="账号状态"></el-table-column>
        <el-table-column>
        <template slot-scope="scope">
        <el-button  type="danger" size="small" @click='del_role(scope.row)'>删除</el-button>           </template>
      </el-table-column>
</el-table>
     <el-button  type="danger" size="small" @click="addForms = true">新增账号</el-button>
    <el-dialog  title="新增用户信息" :visible.sync="addForms"  :append-to-body=false class="dialog-wrap" >
    <el-form id="#addsForm"  ref="addsForm" :model="addsForm" >
   <el-form-item style="margin-bottom: 10px; width: 50%" label="账号类型" prop="string">
    <el-select  v-model="addsForm.type" style="width: 100%">
            <el-option v-for="(item,index) in dblist1" :key="index" :label="item.label" :value="item.label"></el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="账号名称" prop="r_role_user" >
        <el-input v-model="addsForm.r_role_user"></el-input>
      </el-form-item>
      <el-form-item label="账号密码" prop="r_role_password">
        <el-input type="password" v-model="addsForm.r_role_password"></el-input>
      </el-form-item>
      <el-form-item style="margin-bottom: 10px; width: 50%" label="账号类型" prop="string">
    <el-select  v-model="addsForm.status" style="width: 100%">
            <el-option v-for="(item,index) in dblist2" :key="index" :label="item.label" :value="item.label"></el-option>
          </el-select>
      </el-form-item>
        <el-button @click='add_role(),addForms = false'>确定</el-button>
        <el-button @click="addForms = false">取消</el-button>
    </el-form>
  </el-dialog>
  </div>
</template>
<script>
  import { dbaccount_add, dbaccount_show, dbaccount_del } from '../../api/DbConfig'
  export default {
    name: 'Sqlselect',
    border: true,
    inject: ['reload'],
    data: function () {
      return {
        list1: [],
        addForms: false,
        addsForm: {
          type: '',
          r_role_user: '',
          r_role_password: '',
          status: ''
        },
        dblist1: [{ label: '数据库读写账号' }, { label: '数据库查询账号' }, { label: '数据库监控账号' }],
        dblist2: [{ label: '账号启用' }, { label: '账号禁用' }]

      }
    },
    created () {
      dbaccount_show()
        .then((res) => {
          this.list1 = res.data
        })
        .catch(function (err) {
          alert(err)
        })
    },
    methods: {
      add_role: function () {
        const Base64 = require('js-base64').Base64
        dbaccount_add(this.addsForm.type, this.addsForm.r_role_user, Base64.encode(this.addsForm.r_role_password), this.addsForm.status).then((res) => {
          this.reload()
        })
          .catch(function (err) {
            alert(err)
          })
      },
      del_role: function (row) {
        console.log(row.id)
        dbaccount_del('9').then((res) => {
          this.reload()
        })
          .catch(function (err) {
            alert(err)
          })
      }
    }
}
</script>
