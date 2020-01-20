<template>
  <div>
 <el-form id="#shiwu" ref="shiwu" :model="shiwu" label-width="80px" :rules="rules" >
   <el-form-item style="margin-bottom: 10px; width: 50%" label="主机名:" prop="string">
   <el-select @click.native=selectGet v-model="shiwu.hostname" style="width: 100%">
            <el-option v-for="(item,index) in dblist2" :key="index" :label="item.m_host" :value="item.m_host"></el-option>
          </el-select>
   </el-form-item>
      <el-form-item style="margin-bottom: 10px; width: 50%" label="数据库名:" prop="string">
    <el-select @click.native=selectDB v-model="shiwu.db" style="width: 100%">
            <el-option v-for="(item,index) in m_db" :key="index" :label="item.m_db" :value="item.m_db"></el-option>
          </el-select>
      </el-form-item>
   <el-form-item style="margin-bottom: 10px; width: 50%" label="表名:" prop="string">
    <el-select @click.native=dbtableGet v-model="shiwu.tablenamed" style="width: 100%">
            <el-option v-for="(item,index) in table_name" :key="index" :label="item.Table" :value="item.Table"></el-option>
          </el-select>
      </el-form-item>
    <el-form-item style="margin-bottom: 10px; width: 50%" label="是否备份:" prop="string">
    <el-select @click.native=dbtableGet v-model="shiwu.backup" style="width: 100%">
            <el-option v-for="(item,index) in backuplist" :key="index" :label="item.label" :value="item.label"></el-option>
          </el-select>
      </el-form-item>
    <el-form-item  style="margin-bottom: 50px; width: 50%"  label="sql主题" prop="sql_text"  >
      <el-input v-model=shiwu.sql_zhuti></el-input>
    </el-form-item>
       <el-form-item  style="margin-bottom: 50px; width: 50%"  label="sql类型" prop="string"  >
             <el-select v-model="shiwu.sql_type" style="width: 100%">
         <el-option v-for="(item,index) in dd" :key="index" :label="item.label" :value="item.label"></el-option>
             </el-select>
    </el-form-item>
     <el-form-item  style="margin-bottom: 50px; width: 50%"  label="sql语句" prop="sql_text"  >
      <el-input v-model=shiwu.sql_text autosize type="textarea" ></el-input>
    </el-form-item>
       <el-form-item style="margin-bottom: 10px; width: 50%" label="审核人:" prop="string">
    <el-select @click.native=user_list v-model="shiwu.dev_manager" style="width: 100%">
            <el-option v-for="(item,index) in manager_user" :key="index" :label="item.label" :value="item.dev_manager"></el-option>
          </el-select>
      </el-form-item>
    <el-button type="primary" @click='tijiao' :disabled=lastatus :loading=disableds>提交</el-button>
  </el-form>
    <el-table  v-if=xianshi3 ref="multipleTable" :data="sql_result" style="width: 100%" >
      <el-table-column  v-for="(item,index) in list" :key="index" :label="item.label" :width="item.width">
        <template slot-scope="scope">
          <span>{{scope.row[item.label]}}</span>
   </template>
      </el-table-column>
    </el-table>
       <p>{{keyword}}</p>
       <p>{{inception_error}}</p>
    </div>
</template>
<script>
import { auth_host, table_select, auth_db } from '../../api/select'
import { mysql_dml } from '../../api/dml'
import { auth_name_list } from '../../api/ldap'
export default {
  name: 'Sqlselect',
  border: true,
  data: function () {
    var checksql = (rule, value, callback) => {
      var pattern = new RegExp('.*drop|truncate.*')
      if (!pattern.test(value)) {
        callback()
      } else {
        callback(new Error('很抱歉,不允许提交DROP/TRUNCATE语句'))
      }
    }
    return {
      'message': 'nihao',
      shiwu: {
        host: '',
        db: '',
        table_named: '',
        backup: '',
        sql_text: '',
        sql_type: '',
        sql_zhuti: '',
        dev_manager: '',
        sql_user: ''
      },
      disableds: false,
      backuplist: [{ label: '备份' }, { label: '不备份' }],
      dd: [{ label: 'DML类型' }, { label: 'DDL类型' }],
      username: [],
      result: [],
      usernamed: [],
      userlist: [],
      rows: [],
      addform: '',
      result2: [],
      scope: '',
      stripe: true,
      dblist2: [],
      dbnamelist: [],
      table_name: [],
      ip: '',
      indexed: [],
      Non_unique: '',
      status: '',
      total: 10,
      pagesize: 9,
      currentPage: 1,
      keyword: '',
      file: '',
      cc: [],
      url: ' ',
      xianshi1: false,
      xianshi2: false,
      xianshi3: false,
      sql_result: [],
      list: [{ label: 'ID' }, { label: 'stage' }, { label: 'errlevel' }, { label: 'stagestatus' }, { label: 'errormessage' }, { label: 'sql' }, { label: 'affected_rows' }, { label: 'sequence' }, { label: 'execute_time' }, { label: 'SQLSHA1' }],
      inception_error: '',
      manager_user: [],
      m_port: '',
      m_db: '',
      hs_type: 'Master',
      rules: {
        sql_text: [
          { validator: checksql, trigger: 'blur' }]
      },
      lastatus: false
    }
  },

  methods: {
    user_list: function () {
      auth_name_list(this.manager_user).then((res) => {
        this.manager_user = res.data
        console.log(this.manager_user)
      })
    },
    selectGet: function () {
      auth_host(this.hs_type).then((res) => {
        this.dblist2 = res.data['host']
        console.log(res.data)
      })
        .catch(function (err) {
          alert(err)
        })
    },
    dbtableGet: function () {
      table_select(this.shiwu)
        .then((res) => {
          this.table_name = res.data
        })
        .catch(function (err) {
          alert(err)
        })
    },
    selectDB: function () {
      auth_db(this.shiwu.hostname)
        .then((res) => {
          this.m_db = res.data['db_port']
        })
        .catch(function (err) {
          alert(err)
        })
    },

    tijiao: function () {
      this.disableds = true
      this.$refs['shiwu'].validate((valid) => {
        if (!valid) {
          console.log('验证失败')
        } else {
          mysql_dml(this.shiwu.hostname, this.shiwu.backup, this.shiwu.db, this.shiwu.sql_zhuti, this.shiwu.sql_text, this.shiwu.dev_manager, this.shiwu.sql_type)
            .then((res) => {
              this.inception_error = res.data['status']
              this.keyword = res.data['keyword']
              this.sql_result = res.data['result']
              this.xianshi3 = true
              this.disableds = false
              if (this.inception_error === 'success') {
                this.lastatus = true
              } else {
                this.lastatus = false
              }
            })
            .catch(function (err) {
              this.disableds = false
              alert(err)
            })
        }
      })
    }
  }
}
</script>
