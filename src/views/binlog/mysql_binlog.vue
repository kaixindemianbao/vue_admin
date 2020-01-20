<template>
  <div>
 <el-form id="#shiwu" ref="shiwu" :model="shiwu" label-width="80px"  >
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
      <el-form-item style="margin-bottom: 10px; width: 50%" label="输入时间:" prop="string">
<el-date-picker type="datetime"  v-model="shiwu.start_time" placeholder="选择开始时间" value-format="yyyy-MM-dd HH:mm:ss"    style="width: 100%;"></el-date-picker>
    </el-form-item>
     <el-form-item style="margin-bottom: 10px; width: 50%" label="输入时间:" prop="string">
<el-date-picker type="datetime"  v-model="shiwu.stop_time" placeholder="选择结束时间" value-format="yyyy-MM-dd HH:mm:ss"    style="width: 100%;"></el-date-picker>
    </el-form-item>
      <el-form-item  style="margin-bottom: 50px; width: 50%"  label="binlog文件命名" prop="sql_text"  >
      <el-input v-model=shiwu.binlog_filename  ></el-input>
    </el-form-item>
       <el-button @click="tijiao" :loading="disableds">解析</el-button>
          <el-button @click="See(url)">下载</el-button>
 </el-form>
    <el-row>{{filename}}</el-row>
    </div>
</template>
<script>
import { auth_host, table_select, auth_db } from '../../api/select'
import { auth_name_list } from '../../api/ldap'
import { binlog } from '../../api/status'
export default {
  name: 'Sqlselect',
  border: true,
  data: function () {
    return {
      'message': 'nihao',
      shiwu: {
        hostname: '',
        db: '',
        tablenamed: '',
        start_time: '',
        stop_time: '',
        binlog_filename: ''
      },
      filename: '',
      disableds: false,
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
    See: function (e) {
      window.location.href = this.url
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
      this.disabled = true
      binlog(this.shiwu).then((res) => {
        this.disabled = false
        this.filename = res.data
        this.url = 'http://10.254.124.60:8088/' + this.filename
      })
    }
  }
}
</script>
