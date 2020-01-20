<template>
<div>
<el-table  ref="multipleTable" :data="(list2 || []).slice((currentPage-1)*pagesize,currentPage*pagesize)"  style="width: 100%" >
      <el-table-column  v-for="(item,index) in list1" :key="index" :label="item.key" :width="item.width">
        <template slot-scope="scope">
          <span>{{scope.row[item.key]}}</span>
   </template>
      </el-table-column>
   <el-table-column >
   <template slot-scope="scope">
     <el-button size="small" type="danger" @click='Row_Delete(scope.row)'>删除</el-button>
     <el-button size="small" type="danger" @click='Row_Edit(scope.row)'>编辑</el-button>
   </template>
  </el-table-column>
    </el-table>
      <el-pagination class="fy" layout="prev, pager, next" @current-change="current_change" :total="total" background></el-pagination>
  <el-button  type="danger" size="small" @click="addform = true">新增机器</el-button>
    <el-dialog  title="新增机器信息" :visible.sync="addform"  :append-to-body=false class="dialog-wrap" @close='closeDialog' >
    <el-form id="addforms"  ref="addforms" :model="addforms" >
      <el-form-item label="主机IP" prop="hostname">
        <el-input v-model="addforms.host"></el-input>
      </el-form-item>
       <el-form-item style="margin-bottom: 10px; width: 50%" label="数据库类型" prop="string">
      <el-select  v-model="addforms.type"  style="width: 100%">
            <el-option v-for="(item,index) in type1" :key="index" :label="item.title" :value="item.title"></el-option>
      </el-select>
         <p>{{ this.addforms.type}}</p>
       </el-form-item>
           <el-form-item style="margin-bottom: 10px; width: 50%" label="所在机房" prop="string">
      <el-select  v-model="addforms.machine_local"  style="width: 100%">
            <el-option v-for="(item,index) in type2" :key="index" :label="item.title" :value="item.title"></el-option>
      </el-select>
           </el-form-item>
           <el-form-item style="margin-bottom: 10px; width: 50%" label="使用环境" prop="string">
      <el-select  v-model="addforms.env"  style="width: 100%">
            <el-option v-for="(item,index) in type3" :key="index" :label="item.title" :value="item.title"></el-option>
          </el-select>
           </el-form-item>
           <el-form-item style="margin-bottom: 10px; width: 50%" label="使用状态" prop="string">
      <el-select  v-model="addforms.status"  style="width: 100%">
            <el-option v-for="(item,index) in type4" :key="index" :label="item.title" :value="item.title"></el-option>
          </el-select>
           </el-form-item>
      <el-form-item label="角色信息" style="margin-bottom: 10px; width: 50%" prop="string">
      <<el-select   v-model="addforms.role"  style="width: 100%" >
            <el-option v-for="(item,index) in type5" :key="index" :label="item.title":value="item.title"></el-option>
          </el-select>
        </el-form-item>
        <el-button @click='machine_add(),addform = false'>确定</el-button>
        <el-button @click="addform = false">取消</el-button>
    </el-form>
  </el-dialog><el-dialog  title="编辑机器信息" :visible.sync="editform"  :append-to-body=false class="dialog-wrap"  >
    <el-form id="editforms"  ref="editforms" :model="editforms" >
      <el-form-item style="margin-bottom: 10px; width: 50%" label="主机" prop="string">
        <el-input v-model="editforms.host" readonly></el-input>
      </el-form-item>
      <el-form-item style="margin-bottom: 10px; width: 50%" label="数据库类型" prop="string">
      <el-select  v-model="editforms.type"  style="width: 100%">
            <el-option v-for="(item,index) in type1" :key="index" :label="item.title" :value="item.title"></el-option>
      </el-select>
           </el-form-item>
           <el-form-item style="margin-bottom: 10px; width: 50%" label="所在机房" prop="string">
      <el-select  v-model="editforms.machine_local"  style="width: 100%">
            <el-option v-for="(item,index) in type2" :key="index" :label="item.title" :value="item.title"></el-option>
      </el-select>
           </el-form-item>
           <el-form-item style="margin-bottom: 10px; width: 50%" label="使用环境" prop="string">
      <el-select  v-model="editforms.env"  style="width: 100%">
            <el-option v-for="(item,index) in type3" :key="index" :label="item.title" :value="item.title"></el-option>
          </el-select>
           </el-form-item>
           <el-form-item style="margin-bottom: 10px; width: 50%" label="使用状态" prop="string">
      <el-select  v-model="editforms.status"  style="width: 100%">
            <el-option v-for="(item,index) in type4" :key="index" :label="item.title" :value="item.title"></el-option>
          </el-select>
           </el-form-item>
         <el-form-item style="margin-bottom: 10px; width: 50%" label="角色" prop="string">
      <el-select  v-model="editforms.role"  style="width: 100%">
            <el-option v-for="(item,index) in type5" :key="index" :label="item.title" :value="item.title"></el-option>
          </el-select>
           </el-form-item>
      <el-form-item label="备注" prop="string">
        <el-input v-model="editforms.beizhu"></el-input>
      </el-form-item>
        <el-button @click='machine_edit(),editform = false'>确定</el-button>
        <el-button @click="editform = false">取消</el-button>
    </el-form>
  </el-dialog>
</div>
</template>
<script>
import { machine_manage, Machine_Add, Machine_Del, Machine_Edit } from '../../api/manage'
export default {
  name: 'manage',
  inject: ['reload'],
  data: function () {
    return {
      list1: [{ key: 'host' }, { key: 'type' }, { key: 'machine_local' }, { key: 'env' }, { key: 'status' }, { key: 'role' }, { key: 'riqi' }],
      total: 1000,
      pagesize: 9,
      currentPage: 1,
      xianshi1: false,
      list2: [],
      addform: false,
      id: '',
      addforms: {},
      editforms: {},
      editform: false,
      type1: [{ title: 'Mysql' }, { title: 'Mongodb' }, { title: 'Redis' }],
      type2: [{ title: '亦庄' }, { title: 'M7' }],
      type3: [{ title: 'Online' }, { title: 'Test' }, { title: 'Beta' }],
      type4: [{ title: '使用中' }, { title: '待用' }],
      type5: [{ title: 'Master' }, { title: 'Slave' }, { title: 'Single' }],
      partial: true

    }
  },
  created () {
    machine_manage().then((res) => {
      this.list2 = res.data
    })
  },
  methods: {
    machine_add: function () {
      console.log('test')
      Machine_Add(this.addforms.host, this.addforms.type, this.addforms.machine_local, this.addforms.env, this.addforms.status)
        .then((res) => {
          console.log(this.addforms.beizhu)
          this.reload()
        })
        .catch(function (err) {
          console.log('增加失败')
          alert(err)
        })
    },
    Row_Edit: function (row) {
      this.editform = true
      this.id = row.id
      const _row = row
      this.editforms = Object.assign({}, _row)
    },
    Row_Delete: function (row) {
      Machine_Del(row.id)
        .then((res) => {
          console.log('增加成功')
          this.reload()
        })
        .catch(function (err) {
          console.log('增加失败')
          alert(err)
        })
    },
    machine_edit: function (row) {
      console.log(this.editforms)
      Machine_Edit(this.id, this.editforms.type, this.editforms.machine_local, this.editforms.env, this.editforms.status, this.editforms.role)
        .then((res) => {
          console.log(this.editforms)
          this.reload()
        })
        .catch(function (err) {
          console.log('增加失败')
          alert(err)
        })
    },
    current_change: function (currentPage) {
      this.currentPage = currentPage
    },
    closeDialog: function () {
    }
  }
}

</script>

<style scoped>

</style>
