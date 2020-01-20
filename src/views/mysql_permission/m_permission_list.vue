<template>
  <div>
  <el-form>
 <el-form-item style="margin-bottom: 10px; width: 50%" label="业务组:" prop="string">
   <el-select @click.native=group_list v-model="select_info.group" style="width: 100%">
            <el-option v-for="(item,index) in grouplist" :key="index" :label="item.department" :value="item.department"></el-option>
          </el-select>
   </el-form-item>
      <el-form-item style="margin-bottom: 10px; width: 50%" label="类型:" prop="string">
   <el-select  v-model="select_info.type" style="width: 100%">
            <el-option v-for="(item,index) in type_list" :key="index" :label="item.type" :value="item.type"></el-option>
   </el-select>
           </el-form-item>
    <el-form-item style="" label="数据库名" prop="string">
      <el-input v-model="select_info.dbname">数据库名</el-input>
    </el-form-item>
     </el-form>
  <el-button @click="search">查询</el-button>
    <el-table :data="(auth_list )" border style="width: 100%; margin-top: 20px" width=100% ref="multipleTable">
      <el-table-column prop="m_host" label="数据库地址">
      </el-table-column>
      <el-table-column prop="m_db" label="数据库名">
      </el-table-column>
      <el-table-column prop="m_group" label="认证组">
      </el-table-column>
      <el-table-column prop="m_type" label="角色">
      </el-table-column>

      <el-table-column>
        <template slot-scope="scope">
          <el-button size="small" type="danger" @click='row_delete(scope.row.id)'>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="fy" layout="prev, pager, next" @current-change="  handleCurrentChange" :total=total
                   background></el-pagination>
  </div>
</template>

<script>
  import { auth_list, del_permission, query_permission, user_group } from '../../api/ldap'

  export default {
    name: 'm_permission_list',
    inject: ['reload'],
    data: function () {
      return {
        dbnamelist: [],
        select_info: {
          hostname: '',
          dbname: '',
          group: ''
        },
        cc: [],
        multipleSelection: [],
        dblist2: [{ hostname: '1.2.3.4' }],
        grouplist: [],
        auth_list: [],
        total: 10,
        pagesize: 9,
        currentPage: 1,
        type_list: [{ 'type': 'master' }, { 'type': 'slave' }]

      }
    },
    mounted () {
      this.handleCurrentChange(1)
    },
    methods: {
      row_delete: function (row) {
        del_permission(row)
          .then((res) => {
            this.reload()
          })
          .catch(function (err) {
            alert(err)
          })
      },
      group_list: function () {
        user_group()
          .then((res) => {
            this.grouplist = res.data
          })
          .catch(function (err) {
            alert(err)
          })
      },
      search: function () {
        query_permission(this.select_info)
          .then((res) => {
            this.auth_list = res.data['results']
            this.total = res.data['count']
          })
          .catch(function (err) {
            alert(err)
          })
      },
      handleSizeChange (val) {
        this.pagesize = val
      },
      handleCurrentChange (val) {
        this.currentPage = val
        auth_list(this.currentPage).then((res) => {
          this.auth_list = res.data['results']
          this.total = res.data['count']
        }).catch(function (err) {
          alert(err)
        })
      }
    }
  }
</script>
<style>
  .yangshi {
    background-color: #FF0000;
  }
</style>
