<template>
  <div>
     <el-form id="#zk_form" ref="zk_form" :model="user_config" label-width="80px" >
     <el-form-item  style="margin-bottom: 10px; width: 30%" label="域名:" prop="string">
               <el-input v-model="user_config.host"  ></el-input>
             </el-form-item>
      <el-form-item  style="margin-bottom: 10px; width: 30%" label="用户名:" prop="string">
               <el-input v-model="user_config.user"  ></el-input>
      </el-form-item>
       <el-form-item  style="margin-bottom: 10px; width: 20%" label="数据库名:" prop="string">
               <el-input v-model="user_config.dbname"  ></el-input>
   </el-form-item>
            <el-form-item  style="margin-bottom: 10px; width: 20%" label="环境:" prop="string">
               <el-select @click.native=get_env v-model="user_config.env" style="width: 100%">
            <el-option v-for="(item,index) in dblist2" :key="index" :label="item.env" :value="item.env"></el-option>
          </el-select>
   </el-form-item>
     </el-form>
    <el-button @click="tijiao">提交</el-button>
<el-table :data="zk" border style="width: 50%" ref="multipleTable">
    <el-table-column prop="zk_key" label="zk_key">
                  </el-table-column>
     <el-table-column prop="zk_value" label="zk_value">
                  </el-table-column>
</el-table>
  </div>
  </template>
  <script>
   import { zk_config } from '../../api/status'
   export default {
     name: 'Sql_log',
     border: true,
     inject: ['reload'],
     data: function () {
       return {
         zk: [],
         user_config: {
           user: '',
           host: '',
           dbname: '',
           env: ''
         },
         dblist2: [{ 'env': '测试' }, { 'env': '生产' }]
       }
     },
     methods: {
       tijiao: function (row) {
         zk_config(this.user_config).then((res) => {
           this.zk = res.data
         })
           .catch(function (err) {
             alert(err)
           })
       }
     }
   }
</script>
