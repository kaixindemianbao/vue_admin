<template>
<div>
  <el-form id="#select_info" ref="select_info" :model="select_info" label-width="80px" >
      <el-form-item style="margin-bottom: 10px; width: 50%" label="类型:" prop="string">
   <el-select  v-model="select_info.type" style="width: 100%">
            <el-option v-for="(item,index) in type_list" :key="index" :label="item.type" :value="item.type"></el-option>
          </el-select>
   </el-form-item>
   <el-form-item style="margin-bottom: 10px; width: 50%" label="主机名:" prop="string">
   <el-select @click.native=selectGet v-model="select_info.hostname" style="width: 100%">
            <el-option v-for="(item,index) in dblist2" :key="index" :label="item.host" :value="item.host"></el-option>
          </el-select>
   </el-form-item>
        <el-form-item  style="margin-bottom: 50px; width: 50%"  label="端口"   >
      <el-input v-model=select_info.m_port autosize type="number" defaultVal='3306' ></el-input>
    </el-form-item>
      <el-form-item style="margin-bottom: 10px; width: 50%" label="数据库名:" prop="string">
        <el-button @click.native=dbnameGet >数据库列表</el-button>
      <el-checkbox-group  @selection-change="changeFun" v-model="select_info.db">
        <el-checkbox v-for="(item,index) in dbnamelist" :key="index" :label="item.Database" :value="item.Database"></el-checkbox>
  </el-checkbox-group>
      </el-form-item>
    <el-form-item style="margin-bottom: 10px; width: 50%" label="业务组:" prop="string">
   <el-select @click.native=group_list v-model="select_info.group" style="width: 100%">
            <el-option v-for="(item,index) in grouplist" :key="index" :label="item.department" :value="item.department"></el-option>
          </el-select>
   </el-form-item>
  </el-form>
  <el-button @click.native=submit >保存数据库权限</el-button>
</div>
</template>

<script>
  import { host_select2, db_select } from '../../api/select'
  import { user_group, auth_group } from '../../api/ldap'
  export default {
    name: 'm_permission',
    inject: ['reload'],
    data: function () {
      return {
        dbnamelist: [],
        select_info: {
          type: '',
          hostname: '',
          db: [],
          group: '',
          m_port: ''
        },
        multipleSelection: [],
        dblist2: [{ hostname: '1.2.3.4' }],
        type_list: [{ 'type': 'master' }, { 'type': 'slave' }],
        grouplist: [],
        status: []

      }
    },
    created () {
      this.select_info.m_port = 3306
    },
    methods: {
      selectGet: function () {
        console.log(this.select_info.type)
        host_select2(this.select_info.type).then((res) => {
          this.dblist2 = res.data
        })
          .catch(function (err) {
            alert(err)
          })
      },
      changeFun (val) {
        this.multipleSelection = val
      },
      dbnameGet: function () {
        db_select(this.select_info)
          .then((res) => {
            this.dbnamelist = res.data['data']
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
      submit: function () {
        console.log(this.select_info)
        auth_group(this.select_info)
          .then((res) => {
            this.status = res.data
          })
          .catch(function (err) {
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
