<template>
  <div>
 <el-form id="#select_info" ref="select_info" :model="select_info" label-width="80px"  :rules="rules">
   <el-form-item style="margin-bottom: 10px; width: 50%" label="主机名:" prop="string">
   <el-select @click.native=selectGet v-model="select_info.hostname" style="width: 100%">
            <el-option v-for="(item,index) in dblist2" :key="index" :label="item.m_host" :value="item.m_host"></el-option>
          </el-select>
   </el-form-item>
      <el-form-item style="margin-bottom: 10px; width: 50%" label="数据库名:" prop="string">
    <el-select  @click.native=selectDB v-model="select_info.db" style="width: 100%">
            <el-option v-for="(item,index) in db_port" :key="index" :label="item.m_db" :value="item.m_db"></el-option>
          </el-select>
      </el-form-item>
   <el-form-item style="margin-bottom: 10px; width: 50%" label="表名:" prop="string">
    <el-select @click.native=dbtableGet v-model="select_info.tablenamed" style="width: 100%">
            <el-option v-for="(item,index) in table_name" :key="index" :label="item.Table" :value="item.Table"></el-option>
          </el-select>
      </el-form-item>
     <el-form-item style="margin-bottom: 10px; width: 50%" label="查询方式类别:" prop="string">
        <el-select  v-model="select_info.type"  style="width: 100%">
            <el-option v-for="(item,index) in typed" :key="index" :label="item.type" :value="item.type"></el-option>
          </el-select>
   </el-form-item>
     <el-form-item style="margin-bottom: 10px; width: 50%" label="sql语句" prop="sql_text" >
      <codemirror ref="test" v-model="select_info.sql_text" :options="cmOptions" class="code"  ></codemirror>
    </el-form-item>
      <el-button @click='chakan' :loading="disableds">确定</el-button>
       <el-button @click="See(url)">下载</el-button>
  </el-form>
    <el-button @click="query">保存sql</el-button>
    <el-button @click="query1">查看sql</el-button>
    <el-row>{{slave_status}}</el-row>
    <el-table v-if="xianshi1" ref="multipleTable" :data="(result || []).slice((currentPage-1)*pagesize,currentPage*pagesize)"  style="width: 100%" >
      <el-table-column  v-for="(item,index) in result2" :key="index" :label="item.key" :width="item.width">
        <template slot-scope="scope">
          <span>{{scope.row[item.key]}}</span>
        </template>
      </el-table-column>
    </el-table>
      <el-dialog  title="增加sql" :visible.sync=aa :append-to-body=false  >
 <el-form id="#query_sql" ref="query_sql" :model="query_sql" label-width="80px" >
   <el-form-item style="margin-bottom: 10px; width: 50%" label="主题:" prop="string">
             <el-input v-model="query_sql.zhuti" ></el-input>
   </el-form-item>
   <el-form-item style="margin-bottom: 10px; width: 50%" label="sql本身:" prop="string">
     <el-input v-model="query_sql.sql_text" readonly></el-input>
   </el-form-item>
       <el-button @click="save_sql">确定</el-button>
 </el-form>
</el-dialog>
    <el-dialog  title="查看sql" :visible.sync=ee :append-to-body=false  >
  <el-table :data="shuju||[]" border style="width: 100%" ref="multipleTable">
     <el-table-column prop="id" label="序号">
                  </el-table-column>
       <el-table-column prop="zhuti" label="主题">
                  </el-table-column>
    <el-table-column prop="comment_sql" width="410px" label="具体sql">
                  </el-table-column>
       <el-table-column  width="100px" label="填充">
          <template slot-scope="scope">
        <el-button @click="full(scope.row.comment_sql)">填充</el-button>
         <el-button @click="dele_log(scope.row.id)">删除</el-button></template>
                  </el-table-column>
</el-table>
</el-dialog>
    <el-pagination class="fy" layout="prev, pager, next" @current-change="current_change" :total="total" background></el-pagination>
    <el-table v-if="xianshi2" ref="multipleTable" :data="indexed || []"  style="width: 100%" >
      <el-table-column  v-for="(item,index) in index_column" :key="index" :label="item.key" :width="item.width">
        <template slot-scope="scope">
          <span>{{scope.row[item.key]}}</span>
        </template>
      </el-table-column>
    </el-table>
    </div>
</template>
<script>
import store from '../../store'
import { auth_host, table_select, sql_select, auth_db, save_log, select_log, delete_log } from '../../api/select'
import { codemirror } from 'vue-codemirror'
require('codemirror/mode/python/python.js')
require('codemirror/mode/javascript/javascript.js')
require('codemirror/mode/clike/clike.js')
require('codemirror/mode/shell/shell.js')
require('codemirror/theme/blackboard.css')
require('codemirror/addon/hint/show-hint.css')
require('codemirror/addon/hint/show-hint.js')
require('codemirror/addon/hint/javascript-hint.js')
export default {
  name: 'Sqlselect',
  border: true,
  inject: ['reload'],
  components: {
    codemirror
  },
  data: function () {
    var checkAge = (rule, value, callback) => {
      value = this.getSql()
      if (this.select_info.type !== '数据查询') {
        callback()
        return true
      }
      if (value.toLowerCase().match(/explain/i)) {
        callback()
        return true
      }
      if (value.toLowerCase().indexOf('select') === -1) {
        callback(new Error('不是查询语句'))
        return false
      }
      if (value.toLowerCase().indexOf('limit') === -1) {
        if (value.toLowerCase().indexOf('distinct') === -1 && value.toLowerCase().indexOf('count') === -1 && value.toLowerCase().indexOf('sum') === -1 && value.toLowerCase().indexOf('max') === -1 && value.toLowerCase().indexOf('min') === -1 && value.toLowerCase().indexOf('avg') === -1) {
          callback(new Error('为了节省资源，需要加limit'))
          return false
        }
      }
      if (value.toLowerCase().indexOf('update[\t]') !== -1 || value.toLowerCase().indexOf('delete[\t]') !== -1 || value.toLowerCase().indexOf('insert[\t]') !== -1) {
        callback(new Error('不是查询查询语句'))
        return false
      }
      callback()

      // var pattern = new RegExp('^(select|SELECT).*(limit|LIMIT).([1-9]\\d{0,2}|1000)$')
      // var pattern1 = new RegExp('^select|SELECT) count|sum|max|min|avg(.*).*$')
      // var pattern2 = new RegExp('^(explain|EXPLAIN) .*$')(
      // if (this.select_info.type === '数据查询' && (pattern.test(value) || pattern1.test(value) || pattern2.test(value))) {
      //   callback()
      //   console.log('验证成功')
      // } else if (this.select_info.type !== '数据查询') {
      //   callback()
      // } else {
      //   console.log('验证试试呗')
      //   callback(new Error('错误'))
      // }
    }
    return {
      'message': 'nihao',
      addsForm: {
        username: '',
        password: '',
        department: '',
        email: '',
        real_name: ''
      },
      ff: '',
      select_info: {
        hostname: '',
        db: '',
        tablenamed: '',
        sql_text: '',
        yonghuming: ''
      },
      ee: false,
      query_sql: {
        id: '',
        zhuti: '',
        sql_text: ''
      },
      aa: false,
      disableds: false,
      rules: {
        sql_text: [
          { validator: checkAge, trigger: 'blur' }]
      },
      username: [],
      result: [],
      usernamed: [],
      multipleSelection: [],
      userlist: [],
      rows: [],
      addForms: false,
      addform: '',
      result2: [],
      scope: '',
      stripe: true,
      dblist2: [{ hostname: '1.2.3.4' }],
      dbnamelist: [],
      table_name: [],
      ip: '',
      typed: [{ type: '数据查询' }, { type: '表索引查询' }, { type: '检测从库延时' }, { type: 'csv导出' }],
      index_column: [{ key: 'index_type' }, { key: 'column_name' }, { key: 'key_name' }],
      indexed: [],
      Non_unique: '',
      status: '',
      total: 10,
      pagesize: 9,
      currentPage: 1,
      file: '',
      cc: [],
      slave_status: '',
      shuju: '',
      url: ' ',
      xianshi1: false,
      xianshi2: false,
      db_port: '',
      host: '',
      show: true,
      hs_type: 'Slave',
      cmOptions: {
        tabSize: 4,
        theme: 'blackboard',
        lineNumbers: true,
        options: 'cmOptions',
        line: true,
        extraKeys: { 'Ctrl': 'autocomplete' },
        styleSelectedText: true,
        autofocus: true
      }
    }
  },
  computed: {
    codemirror: function () {
      console.log('111111111111111111111111111111111111')
      return this.$refs.myCm.codemirror
    }
  },
  methods: {
    created: function () {
      this.total = this.tableData.length
    },
    See: function (e) {
      window.location.href = this.url
    },
    full: function (row) {
      this.select_info.sql_text = row
    },
    current_change: function (currentPage) {
      this.currentPage = currentPage
    },
    selectGet: function () {
      auth_host(this.hs_type).then((res) => {
        this.dblist2 = res.data['host']
      })
        .catch(function (err) {
          alert(err)
        })
    },
    selectDB: function () {
      auth_db(this.select_info.hostname)
        .then((res) => {
          this.db_port = res.data['db_port']
        })
        .catch(function (err) {
          alert(err)
        })
    },
    dele_log: function (id) {
      delete_log(id)
        .then((res) => {
          this.reload
        })
        .catch(function (err) {
          alert(err)
        })
    },
    save_sql: function () {
      save_log(this.query_sql)
        .then((res) => {
          console.log('ok')
        })
        .catch(function (err) {
          alert(err)
        })
    },
    query: function () {
      this.aa = true
      this.query_sql.sql_text = this.select_info.sql_text
      console.log(this.query_sql.sql_text)
    },
    query1: function () {
      this.ee = true
      select_log().then((res) => {
        this.shuju = res.data
      })
        .catch(function (err) {
          alert(err)
        })
    },
    dbtableGet: function () {
      table_select(this.select_info)
        .then((res) => {
          this.table_name = res.data
          console.log(typeof this.table_name)
        })
        .catch(function (err) {
          alert(err)
        })
    },
    showstatus: function () {
      if (this.select_info.type === '表索引查询' || this.select_info.type === '检测从库延时') {
        return false
      } else {
        return true
      }
    },
    getSql: function () {
      return this.$refs.test.codemirror.getSelection() === '' ? this.$refs.test.codemirror.getValue() : this.$refs.test.codemirror.getSelection()
    },
    chakan: function () {
      var sql = this.getSql()
      console.log('绑定制', this.select_info.sql_text)
      console.log('选中值', sql)
      this.$refs['select_info'].validate((valid) => {
        if (valid) {
          this.disableds = true
          this.select_info.yonghuming = store.getters.name
          sql_select(this.select_info.hostname, this.select_info.db, this.select_info.tablenamed, this.select_info.type, this.getSql(), this.select_info.yonghuming)
            .then((res) => {
              this.disableds = false
              if (this.select_info.type === '数据查询') {
                this.result = res.data['data']
                console.log(this.result)
                this.result2 = res.data['title']
                this.total = res.data['len']
                this.xianshi2 = false
                this.xianshi1 = true
              } else if (this.select_info.type === '表索引查询') {
                this.indexed = res.data
                this.xianshi1 = false
                this.xianshi2 = true
              } else if (this.select_info.type === 'csv导出') {
                this.file = res.data
                this.url = 'http://10.254.124.60:8088/' + this.file
              } else if (this.select_info.type === '检测从库延时') {
                this.slave_status = res.data
              } else {
                this.file = res.data
              }
            })
            .catch(function (err) {
              this.disableds = false
              console.log(err)
            })
        } else {
          this.disableds = false
          console.log('验证失败')
        }
      }
      )
    }
  }
}
</script>
