<template>
<div>
  <el-form id="#select_aa" ref="select_aa" :model="select_info" label-width="80px" >
    <el-form-item style="margin-bottom: 10px; width: 50%" label="主机名:" prop="string">
           <el-input v-model="select_info.host"></el-input>
   </el-form-item>
       <el-form-item style="margin-bottom: 10px; width: 50%" label="端口:" prop="string">
           <el-input v-model="select_info.port"></el-input>
   </el-form-item>
      <el-form-item style="margin-bottom: 10px; width: 50%" label="选择执行命令:" prop="string">
    <el-select @click.native=choose v-model="select_info.cmd_type" style="width: 100%">
            <el-option v-for="(item,index) in type_list" :key="index" :label="item.type" :value="item.type"></el-option>
          </el-select>
      </el-form-item>
        <el-form-item style="margin-bottom: 10px; width: 50%" label="命令" prop="string">
           <el-input v-model="select_info.key"></el-input>
   </el-form-item>
  <el-button @click=chakan>查看</el-button>
  </el-form>
</div>
</template>

<script>
  import { redis_query, redis_type } from '../../api/select'

  export default {
    name: 'redis_query',
    inject: ['reload'],
    data: function () {
      return {
        sql_result: '',
        type_list: [],
        select_info: {
          host: '',
          port: '',
          cmd_type: '',
          key: ''
        }
      }
    },
    methods: {
      chakan: function () {
        redis_query(this.select_info).then((res) => {
          this.sql_result = res.data
        })
          .catch(function (err) {
            alert(err)
          })
      },
      choose: function () {
        redis_type().then((res) => {
          this.type_list = res.data
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
