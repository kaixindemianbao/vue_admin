<template>
<div>
  <el-form id="#pt_archiver" ref="pt" :model="pt" label-width="80px" >
      <el-form-item style="margin-bottom: 10px; width: 50%" label="类型:" prop="string">
   <el-select  v-model="pt.type" style="width: 100%">
            <el-option v-for="(item,index) in type_list" :key="index" :label="item.type" :value="item.type"></el-option>
          </el-select>
   </el-form-item>
        <el-form-item  style="margin-bottom: 50px; width: 50%"  label="清理HOST"   >
      <el-input v-model=pt.hostname ></el-input>
    </el-form-item>
           <el-form-item  style="margin-bottom: 50px; width: 50%" label="清理DB"   >
      <el-input v-model=pt.db_name  ></el-input>
    </el-form-item>
        <el-form-item  style="margin-bottom: 50px; width: 50%" label="清理TABLE"   >
      <el-input v-model=pt.table_name  ></el-input>
    </el-form-item>
      <el-form-item  style="margin-bottom: 50px; width: 50%"  label="辅助索引"   >
      <el-input v-model=pt.index_name ></el-input>
    </el-form-item>
       <el-form-item  style="margin-bottom: 50px; width: 50%" label="清理条件"   >
      <el-input v-model=pt.sql ></el-input>
    </el-form-item>
      <el-form-item  style="margin-bottom: 50px; width: 50%"   label="间隔行数"   >
      <el-input v-model=pt.row ></el-input>
    </el-form-item>
    <el-button @click="chakan">归档语句生成</el-button>
  </el-form>
  <p>{{ sql_result }}</p>
</div>
</template>

<script>
  import { mysql_archiver } from '../../api/status'

  export default {
    name: 'mysql_prchiver',
    inject: ['reload'],
    data: function () {
      return {
        sql_result: '',
        type_list: [{ 'type': '清理历史数据' }, { 'type': '清理历史数据并归档' }],
        pt: {
          type: '',
          hostname: '',
          db_name: '',
          table_name: '',
          sql: '',
          row: '',
          index_name: ''
        }
      }
    },
    methods: {
      chakan: function () {
        mysql_archiver(this.pt).then((res) => {
          this.sql_result = res.data
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
