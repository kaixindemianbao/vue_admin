<template>
<div>
  <el-input placeholder="数据库名" v-model="dbname" >
			<i slot="prefix" class="el-input__icon el-icon-search"></i>
		</el-input>
  <el-button @click="search">查询</el-button>

  <el-table :data="(auth_list || []).slice((currentPage-1)*pagesize,currentPage*pagesize)"  border style="width: 100%; margin-top: 20px" width=100% ref="multipleTable">
      <el-table-column prop="m_host"  label="数据库地址">
                  </el-table-column>
      <el-table-column prop="m_db" label="数据库名">
                  </el-table-column>
</el-table>
      <el-pagination class="fy" layout="prev, pager, next" @current-change="current_change" :total=total background></el-pagination>
</div>
</template>

<script>
  import { db_list2, db_list } from '../../api/ldap'
  export default
  {
    name: 'db_list',
    inject: ['reload'],
    data: function () {
      return {
        dbnamelist: [],
        select_info: {
          hostname: '',
          db: [],
          group: ''
        },
        multipleSelection: [],
        dblist2: [{ hostname: '1.2.3.4' }],
        grouplist: [],
        auth_list: [],
        total: 1,
        pagesize: 10,
        currentPage: 1,
        dbname: ''

      }
    },
    created: function () {
      db_list2()
        .then((res) => {
          this.auth_list = res.data['result']
          this.total = res.data['count']
          console.log(this.total)
        })
        .catch(function (err) {
          alert(err)
        })
    },
    methods: {
      current_change: function (currentPage) {
        this.currentPage = currentPage
      },
      search: function () {
        db_list(this.dbname).then((res) => {
          this.auth_list = res.data['result']
          this.total = res.data['count']
          console.log(this.total)
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
