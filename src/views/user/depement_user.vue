<template>
  <div>
<el-table :data="user" border style="width: 100%" ref="multipleTable">
    <el-table-column prop="department" label="部门">
                  </el-table-column>
  <el-table-column prop="dev_manager" label="审核人">
    </el-table-column>
  <el-table-column prop="dba_manager" label="备用审核人">
    </el-table-column>
<el-table-column>
     <template slot-scope="scope">
     <el-button size="small" type="danger" @click='Row_Edit(scope.row)'>编辑</el-button>
       <el-button size="small" type="danger" @click='row_delete(scope.row)'>删除</el-button>

   </template>
</el-table-column>
</el-table>
    <el-dialog  title="编辑用户组信息" :visible.sync="editForms"  :append-to-body=false class="dialog-wrap" >
    <el-form id="#editForm"  ref="editForm" :model="editForm" >
      <el-form-item label="部门名" prop="depement">
        <el-input v-model="editForm.department" readonly></el-input>
      </el-form-item>
       <el-form-item label="审核人" prop="dev_manager">
    <el-select @click.native='user_list' v-model="editForm.dev_manager" style="width: 100%">
            <el-option v-for="(item,index) in userlist" :key="index" :label="item.index" :value="item.real_name"></el-option>
          </el-select>
       </el-form-item>
       <el-form-item label="备用审核人" prop="dba_manager">
         <el-select @click.native='user_list' v-model="editForm.dba_manager" style="width: 100%">
            <el-option v-for="(item,index) in userlist" :key="index" :label="item.index" :value="item.real_name"></el-option>
          </el-select>
      </el-form-item>
             <el-button @click='row_edit(),editForms = false'>确定</el-button>
        <el-button @click="editForms = false">取消</el-button>
    </el-form>
      </el-dialog>
<el-button  type="danger" size="small" @click="addForms = true">新增用户组</el-button>
    <el-dialog  title="新增用户组信息" :visible.sync="addForms"  :append-to-body=false class="dialog-wrap" >
    <el-form id="#addsForm"  ref="addsForm" :model="addsForm" >
      <el-form-item label="部门名" prop="depement">
        <el-input v-model="addsForm.department"></el-input>
      </el-form-item>
       <el-form-item label="审核人" prop="dev_manager">
    <el-select @click.native='user_list' v-model="addsForm.dev_manager" style="width: 100%">
            <el-option v-for="(item,index) in userlist" :key="index" :label="item.index" :value="item.real_name"></el-option>
          </el-select>
       </el-form-item>
       <el-form-item label="备用审核人" prop="dba_manager">
         <el-select @click.native='user_list' v-model="addsForm.dba_manager" style="width: 100%">
            <el-option v-for="(item,index) in userlist" :key="index" :label="item.index" :value="item.real_name"></el-option>
          </el-select>
      </el-form-item>
             <el-button @click='Row_ADD(),addForms = false'>确定</el-button>
        <el-button @click="addForms = false">取消</el-button>
    </el-form>
      </el-dialog>
        </div>
</template>
<script>
import { user_group, add_group, auth_name, edit_group, del_group } from '../../api/ldap'
export default {
  name: 'depemnt_user',
  inject: ['reload'],
  data: function () {
    return {
      user: [],
      reload: this.reload,
      addForms: false,
      addsForm: {
        department: '',
        dev_manager: '',
        dba_manager: ''
      },
      userlist: '',
      editForm: {
        department: '',
        dev_manager: '',
        dba_manager: ''
      },
      editForms: false
    }
  },
  created () {
    user_group().then((res) => {
      this.user = res.data
    })
  },
  methods: {
    Row_ADD: function () {
      add_group(this.addsForm.department, this.addsForm.dev_manager, this.addsForm.dba_manager).then((res) => {
        console.log(this.addsForm)
        this.reload()
      })
    },
    user_list: function () {
      auth_name().then((res) => {
        this.userlist = res.data
        console.log(this.userlist)
      })
    },
    Row_Edit: function (row) {
      this.editForms = true
      this.id = row.id
      const _row = row
      this.editForm = Object.assign({}, _row)
    },
    row_edit: function () {
      edit_group(this.id, this.editForm.department, this.editForm.dev_manager, this.editForm.dba_manager)
        .then((res) => {
          this.reload()
          console.log(res.data)
        })
    },
    row_delete: function (row) {
      del_group(row.id)
        .then((res) => {
          this.reload()
          console.log(res.data)
        })
    }
  }
}
</script>


