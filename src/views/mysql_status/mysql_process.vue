<template>
<div>
  <el-form id="#select_aa" ref="select_aa" :model="select_aa" label-width="80px" >
    <el-form-item style="margin-bottom: 10px; width: 50%" label="类型:" prop="string">
   <el-select  v-model="select_aa.type" style="width: 100%">
            <el-option v-for="(item,index) in type_list" :key="index" :label="item.type" :value="item.type"></el-option>
          </el-select>
   </el-form-item>
   <el-form-item style="margin-bottom: 10px; width: 50%" label="主机名:" prop="string">
   <el-select @click.native=selectGet v-model="select_aa.host" style="width: 100%">
            <el-option v-for="(item,index) in dblist2" :key="index" :label="item.host" :value="item.host"></el-option>
          </el-select>
   </el-form-item>
        <el-form-item  style="margin-bottom: 50px; width: 50%"  label="端口"   >
      <el-input v-model=select_aa.port autosize type="number" defaultVal='3306' ></el-input>
    </el-form-item>
  </el-form>
  <el-button @click="chakan">查看数据库状态</el-button>
  <p> 查看数据库线程状态</p>
<el-table  v-if=xianshi1 ref="multipleTable" :data="(list2 || []).slice((currentPage-1)*pagesize,currentPage*pagesize)" @selection-change="handleSelectionChange">  style="width: 100%" >
        <el-table-column type="selection" width="55"></el-table-column>
       <el-table-column prop="ID" label="ID"></el-table-column>
       <el-table-column prop="USER" label="USER"></el-table-column>
       <el-table-column prop="HOST" label="HOST"></el-table-column>
       <el-table-column prop="DB" label="DB"></el-table-column>
       <el-table-column prop="COMMAND" label="COMMAND"></el-table-column>
       <el-table-column prop="TIME" label="TIME"></el-table-column>
       <el-table-column label="STATE">
         <template slot-scope="scope">
                <span :class="{yangshi:chuli(scope.row.STATE)}" >{{scope.row.STATE}}</span>
         </template>
       </el-table-column>
       <el-table-column prop="INFO" label="INFO" :show-overflow-tooltip=true></el-table-column>
   </el-table>
  <div style="margin-top: 20px">
    <el-button v-if="zhuangtai2" @click="stop()">终止会话</el-button>
    <el-row>{{zhuangtai}}</el-row>

  </div>
  <p>查看DB线程数量</p>
  <el-table  v-if=xianshi3 ref="multipleTable1" :data="(db_data || []).slice((currentPage-1)*pagesize,currentPage*pagesize)"  style="width: 100%" >
      <el-table-column  v-for="(item,index) in db_title" :key="index" :label="item.ziduan" :width="item.width">
        <template slot-scope="scope">
          <span>{{scope.row[item.key]}}</span>
   </template>
      </el-table-column>
    </el-table>
  <p>查看总运行线程数</p>
  <el-table v-if=xianshi4 ref="multipleTable2" :data="(total_data || []).slice((currentPage-1)*pagesize,currentPage*pagesize)"  style="width: 100%" >
      <el-table-column  v-for="(item,index) in total_title" :key="index" :label="item.ziduan" :width="item.width">
        <template slot-scope="scope">
          <span>{{scope.row[item.key]}}</span>
   </template>
      </el-table-column>
    </el-table>
  <p>查看锁持有事务信息,包含未提交事务</p>
  <el-table  v-if=xianshi4 ref="multipleTable" :data="(lock_data || []).slice((currentPage-1)*pagesize,currentPage*pagesize)" @selection-change="handleSelectionChange">  style="width: 100%" >
       <el-table-column prop="trx_id" label="事务ID"></el-table-column>
       <el-table-column prop="trx_started" label="事务开启日期"></el-table-column>
       <el-table-column prop="trx_state" label="事务状态"></el-table-column>
       <el-table-column prop="trx_query" :show-overflow-tooltip=true label="事务查询语句"></el-table-column>
  </el-table>
    <p>IP-HOST详细对应</p>
   <el-button @click.native="info()">详细查询</el-button>
    <el-table v-if=xianshi5 :data="ip_data" style="width: 100%" >
      <el-table-column prop="DB" label="数据库"></el-table-column>
      <el-table-column prop="HOST" label="应用服务器"></el-table-column>
    </el-table>
</div>
</template>

<script>
  import { db_status, session_kill } from '../../api/status'
  import { host_select2 } from '../../api/select'
  export default {
    name: 'mysql_process',
    inject: ['reload'],
    data: function () {
      return {
        host: '',
        list1: [{ key: 'ID' }, { key: 'USER' }, { key: 'HOST' }, { key: 'DB' }, { key: 'COMMAND' }, { key: 'TIME' }, { key: 'STATE' }, { key: 'INFO' }, { key: 'result' }],
        total: 1000,
        pagesize: 50,
        currentPage: 1,
        list2: [],
        lock_data: [],
        lock_title: [],
        total_data: [],
        total_title: [],
        ip_data: [],
        db_data: [],
        db_title: [],
        xianshi1: false,
        xianshi2: false,
        xianshi3: false,
        xianshi4: false,
        xianshi5: false,
        totoal_1: '',
        yangshi: false,
        type_list: [{ 'type': 'master' }, { 'type': 'slave' }],
        select_aa: {
          type: '',
          hostname: '',
          port: ''
        },
        zhuangtai: '',
        dblist2: [],
        multipleSelection: [],
        zhuangtai2: ''
      }
    },
    created () {
      this.select_aa.port = 3306
    },
    methods: {
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      current_change: function (currentPage) {
        this.currentPage = currentPage
      },
      stop: function (row) {
        console.log(this.multipleSelection)
        session_kill(this.select_aa.host, this.select_aa.port, this.multipleSelection).then((res) => {
          this.zhuangtai = res.data
        })
          .catch(function (err) {
            alert(err)
          })
      },
      chuli: function (row) {
        if (row === 'Waiting for table metadata lock' || row === 'copy to tmp table') {
          return true
        } else {
          return false
        }
      },
      selectGet: function () {
        console.log(this.select_aa.type)
        host_select2(this.select_aa.type).then((res) => {
          this.dblist2 = res.data
        })
          .catch(function (err) {
            alert(err)
          })
      },
      info: function () {
        console.log('测试测试')
        this.xianshi5 = true
      },
      chakan: function () {
        this.zhuangtai2 = true
        db_status(this.select_aa.host, this.select_aa.port)
          .then((res) => {
            if (res.data['processlist']['data']) {
              this.xianshi1 = true
              this.list2 = res.data['processlist']['data']
              this.total_1 = res.data['processlist']['len']
            }
            if (res.data['lock']['data']) {
              this.xianshi2 = true
              this.lock_title = res.data['lock']['title']
              this.lock_data = res.data['lock']['data']
            }
            if (res.data['DbTotal']['data']) {
              this.xianshi3 = true
              this.db_data = res.data['DbTotal']['data']
              this.db_title = res.data['DbTotal']['title']
            }
            if (res.data['Total']['data']) {
              this.xianshi4 = true
              this.total_data = res.data['Total']['data']
              this.total_title = res.data['Total']['title']
            }
            if (res.data['ip_info']['data']) {
              this.ip_data = res.data['ip_info']['data']
              console.log('是否使用方法')
            }
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
