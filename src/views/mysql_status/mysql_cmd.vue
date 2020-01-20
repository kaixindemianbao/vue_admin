<template>
<div>
  <el-form id="#select_aa" ref="select_aa" :model="select_aa" label-width="80px" >

    <el-form-item style="margin-bottom: 10px; width: 50%" label="类型:" prop="string">
   <el-select  v-model="select_aa.cmd_type" style="margin-bottom: 10px; width: 50%">
            <el-option v-for="(item,index) in type_list2" :key="index" :label="item.type" :value="item.type"></el-option>
          </el-select>
   </el-form-item>
   <el-form-item style="margin-bottom: 10px; width: 50%" label="主机名:" prop="string">
     <el-select multiple @click.native=selectGet  collapse-tags v-model='select_aa.host' @change='changeSelect' placeholder='请选择'>
            <el-option v-for="(item,index) in dblist2" :key="index" :label="item.host" :value="item.host"></el-option>
          </el-select>
   </el-form-item>
        <el-form-item style="margin-bottom: 10px; width: 50%" label="命令:" prop="string">
     <el-input v-model="select_aa.cmd"></el-input>
   </el-form-item>
  </el-form>
   <el-button @click.native="execute_cmd()">执行命令</el-button>
     <el-button @click.native="select_cmd()">查看命令</el-button>
    <<el-dialog  title="查看命令列表" :visible.sync="editform"  :append-to-body=false class="dialog-wrap"  >
  <p>统计 慢日志   cat /data/mysql/arch_slow_log/slowquery_20200108*|grep Row|awk '$3>10'</p>
  <p>添加 开机启动 echo "/data/scripts/lvs_read.sh start" >> /etc/rc.d/rc.local</p>
  <p>摘掉 ipvs     ipvsadm -e -t vip:3306  -r ip -w 0</p>
   <p>  GRANT SELECT, REPLICATION SLAVE,REPLICATION CLIENT ON *.* TO 'pro_read_cc'@'10.10.%' IDENTIFIED BY PASSWORD '*FE3359AADA603971CAF334508754A8C19E0DF422';<p>
		  <p> GRANT SELECT, INSERT, UPDATE, DELETE, CREATE,PROCESS, ALTER, SUPER, REPLICATION SLAVE, REPLICATION CLIENT, TRIGGER,DROP ON *.* TO 'pro_godder'@'10.10.%' IDENTIFIED BY PASSWORD '*01C186D17AC131818D3853949B6690E8985AC49D'; <p>
		   <p>  GRANT SELECT, PROCESS, SUPER, REPLICATION SLAVE, REPLICATION CLIENT ON *.* TO 'pro_minitor'@'10.10.%' IDENTIFIED BY PASSWORD '*F5C6445FC5185AEEC276904BE1D236AD4114CE90' </p>
  <p> 主从同步语句  CHANGE MASTER TO MASTER_HOST='10.255.53.157',MASTER_USER='repl',MASTER_PASSWORD='replmobile', MASTER_LOG_FILE='',master_log_pos= ;</p>
</el-dialog>
  <el-table   ref="multipleTable" border :data="(logg || [])" style="width: 100%" >
  <el-table-column prop="host" label="主机" > </el-table-column>
  <el-table-column prop="cmd" label="执行命令"></el-table-column>
    <el-table-column prop="cmd_status" label="执行状态" ></el-table-column>
    <el-table-column prop="cmd_error" label="执行状态" ></el-table-column>
    <el-table-column prop="cmd_result" label="执行结果"><template slot-scope="cmd_result"><pre>{{cmd_result.row.cmd_result}}</pre></template></el-table-column>
    <el-table-column prop="riqi" label="日期"></el-table-column>

</el-table>

</div>
</template>


<script>
  import { host_select2 } from '../../api/select'
  import { linux_cmd, linux_log } from '../../api/status'

  export default {
    name: 'mysql_cmd',
    inject: ['reload'],
    data: function () {
      return {
        host: '',
        list1: [{ key: 'ID' }, { key: 'USER' }, { key: 'HOST' }, { key: 'DB' }, { key: 'COMMAND' }, { key: 'TIME' }, { key: 'STATE' }, { key: 'INFO' }, { key: 'result' }],
        total: 1000,
        pagesize: 50,
        currentPage: 1,
        list2: [],
        yangshi: false,
        type_list: [{ 'type': 'master' }, { 'type': 'slave' }],
        type_list2: [{ 'type': 'linux_cmd' }, { 'type': 'mysql_cmd' }],
        select_aa: {
          cmd_type: '',
          host: [],
          cmd: ''
        },
        zhuangtai: '',
        dblist2: [],
        multipleSelection: [],
        editform: false,
        logg: []
      }
    },
    created: function () {
      linux_log().then((res) => {
        console.log(JSON.stringify(res.data))
        for (let i = 0, len = res.data.length; i < len; i++) {
          res.data[i].cmd_result = res.data[i].cmd_result.replace('[', '').replace(']', '').replace('"', '').replace(/'/g, '').replace(/,/g, '').replace(/[\\n]/g, '\n')
        }
        this.logg = res.data
        console.log(this.logg)
      })
    },
    methods: {
      selectAll () {
        this.selectedArray = []
        if (this.checked) {
          this.dblist2.map((item) => {
            this.selectedArray.push(item.name)
          })
        } else {
          this.selectedArray = []
        }
      },
      changeSelect (val) {
        if (val.length === this.dblist2.length) {
          this.checked = true
        } else {
          this.checked = false
        }
      },
      selectGet: function () {
        this.select_aa.type = 'slave'
        host_select2(this.select_aa.type).then((res) => {
          this.dblist2 = res.data
        })
          .catch(function (err) {
            alert(err)
          })
      },
      execute_cmd: function () {
        linux_cmd(this.select_aa).then((res) => {
          this.dblist2 = res.data
        })
          .catch(function (err) {
            alert(err)
          })
      },
      select_cmd: function () {
        this.editform = true
      }
    }
}
</script>
<style>
  .yangshi {
    background-color: #FF0000;
  }

.el-table .cell {
       white-space: pre-wrap;
  }
  .el-checkbox {
    text-align: right;
    width: 100%;
    padding-right: 10px;
  }
  pre {
    white-space: pre-wrap;
    word-wrap: break-word;
  }
</style>
