<template>
  <div>
    <el-form style="margin-bottom: 2px; width: 30%" prop="string">
      <el-form-item label="inception地址" >
        <el-input  v-model="addform.inc_host"></el-input>
      </el-form-item>
      <el-form-item label="inception端口" >
        <el-input  v-model="addform.inc_port"></el-input>
      </el-form-item>
      <el-form-item label="inception用户" >
        <el-input  v-model="addform.inc_user"></el-input>
      </el-form-item>
      <el-form-item label="inception密码" >
        <el-input type="password" v-model="addform.inc_password"></el-input>
      </el-form-item>
      <el-form-item label="备份库地址" >
        <el-input  v-model="addform.db_host"></el-input>
      </el-form-item>
      <el-form-item label="备份库端口" >
        <el-input v-model="addform.db_port"></el-input>
      </el-form-item>
         <el-form-item label="备份库用户" >
        <el-input  v-model="addform.db_user"></el-input>
      </el-form-item>
         <el-form-item label="备份库密码">
        <el-input type="password" v-model="addform.db_password"></el-input>
      </el-form-item>
    </el-form>
    <el-button  type="danger" size="small" @click='add'>保存提交</el-button>
    <p>{{result}}</p>
  </div>
</template>
<script>
  import { inception_add, inception_select } from '../../api/DbConfig'

  export default {
    name: 'inception',
    border: true,
    inject: ['reload'],
    data: function () {
      return {
        list1: [],
        addForms: false,
        addform: {
          inc_host: '',
          inc_port: '',
          inc_user: '',
          inc_password: '',
          db_host: '',
          db_port: '',
          db_user: '',
          db_password: ''
        },
        result: ''
      }
    },
    created () {
      inception_select()
        .then((res) => {
          this.addform = res.data[0]
          console.log(res.data)
        })
        .catch(function (err) {
          alert(err)
        })
    },
    methods: {
      add: function () {
        const Base64 = require('js-base64').Base64
        console.log(this.addform.db_password)
        this.addform.db_password = Base64.encode(this.addform.db_password)
        console.log(this.addform.db_password)
        inception_add(this.addform)
          .then((res) => {
            this.result = '添加成功'
            console.log(res.data)
          })
          .catch(function (err) {
            alert(err)
          })
      }
    }
  }
</script>
