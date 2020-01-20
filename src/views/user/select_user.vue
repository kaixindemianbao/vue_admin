<template>
  <div>
<el-table :data="user" border style="width:100%" ref="multipleTable">
    <el-table-column prop="username" label="姓名">
                  </el-table-column>
    <el-table-column prop="department" label="部门">
                  </el-table-column>
    <el-table-column prop="email" label="邮件">
                  </el-table-column>
      <el-table-column prop="real_name" label="真实姓名">
                  </el-table-column>
   <el-table-column prop="auth_group" label="权限组">
                  </el-table-column>
  <el-table-column>
   <template slot-scope="scope">
     <el-button size="small" type="danger" @click='Row_Delete(scope.row)'>删除</el-button>
     <el-button size="small" type="danger" @click='Row_Edit(scope.row)'>编辑</el-button>
   </template>
  </el-table-column>
  <el-table-column>
    </el-table-column>
</el-table>
    <el-dialog  title="编辑用户信息" :visible.sync="editForms"  :append-to-body=false class="dialog-wrap" >
    <el-form id="#editForm"  ref="editForm" :model="editForm" >
      <el-form-item label="姓名" prop="username">
        <el-input v-model="editForm.username" readonly></el-input>
      </el-form-item>
<el-form-item style="margin-bottom: 10px; width: 50%" label="业务组:" prop="string">
   <el-select @click.native=group_list v-model="editForm.department" style="width: 100%">
            <el-option v-for="(item,index) in group" :key="index" :label="item.department" :value="item.department"></el-option>
          </el-select>
   </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="editForm.email"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名" prop="real_name">
        <el-input v-model="editForm.real_name"></el-input></el-form-item>
             <el-select  v-model="editForm.auth_group" style="width: 100%">
            <el-option v-for="(item,index) in auth_grouplist" :key="index" :label="item.index" :value="item.label"></el-option>
          </el-select>
        <el-button @click='user_editd(),editForms = false'>确定</el-button>
        <el-button @click="editForms = false">取消</el-button>
    </el-form>
  </el-dialog>
    <el-button  type="danger" size="small" @click="addForms = true">新增用户</el-button>
    <el-dialog  title="新增用户信息" :visible.sync="addForms"  :append-to-body=false class="dialog-wrap" >
    <el-form id="#addsForm"  ref="addsForm" :model="addsForm" >
      <el-form-item label="姓名" prop="username">
        <el-input v-model="addsForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" >
        <el-input v-model="addsForm.password"></el-input>
      </el-form-item>
     <el-form-item style="margin-bottom: 10px; width: 50%" label="业务组:" prop="string">
   <el-select @click.native=group_list v-model="addsForm.department" style="width: 100%">
            <el-option v-for="(item,index) in group" :key="index" :label="item.department" :value="item.department"></el-option>
          </el-select>
   </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="addsForm.email"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名" prop="real_name">       <el-input v-model="addsForm.real_name"></el-input></el-form-item>
        <el-button @click='Row_ADD(),addForms = false'>确定</el-button>
        <el-button @click="addForms = false">取消</el-button>
    </el-form>
  </el-dialog>
        </div>
</template>
<script>
import { user_manage, user_del, user_add, user_edit } from '@/api/ldap'
import { user_group } from '../../api/ldap'

export default {
  name: 'user_managed',
  inject: ['reload'],
  data: function () {
    return {
      user: [],
      reload: this.reload,
      addForms: false,
      editForms: false,
      editForm: {
        username: '',
        password: '',
        department: '',
        email: '',
        real_name: '',
        auth_group: ''
      },
      addsForm: {
        username: '',
        password: '',
        department: '',
        email: '',
        real_name: '',
        auth_group: ''
      },
      group: '',
      auth_grouplist: [{ label: '研发' }, { label: '研发组长' }, { label: 'DBA' }]

    }
  },
  created () {
    user_manage().then((res) => {
      this.user = res.data
    })
  },
  methods: {
    current_change: function (currentPage) {
      this.currentPage = currentPage
    },
    handleSelectionChange: function (val) {
      this.multipleSelection = val
    },
    Row_Delete: function (row) {
      user_del(row.username).then((res) => {
        console.log('删除成功')
        this.reload()
      })
    },
    group_list: function () {
      user_group().then((res) => {
        this.group = res.data
        console.log(this.group)
      })
    },
    Row_ADD: function () {
      user_add(this.addsForm).then((res) => {
        console.log(this.addsForm)
        this.reload()
      })
    },
    Row_Edit: function (row) {
      this.editForms = true
      this.id = row.id
      const _row = row
      this.editForm = Object.assign({}, _row)
    },
    user_editd: function (row) {
      user_edit(this.editForm).then((res) => {
        this.reload()
      })
    }
  }
}
</script>


