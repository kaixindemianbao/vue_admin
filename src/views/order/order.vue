<template>
<div>
  <el-table :data="(list1 )"  border style="width: 100%; margin-top: 20px" width=100% ref="multipleTable">
      <el-table-column prop="order_id"  label="工单ID">
                  </el-table-column>
      <el-table-column prop="order_title" label="工单内容">
                  </el-table-column>
      <el-table-column prop="order_user" label="提交用户">
                  </el-table-column>
      <el-table-column prop="order_sql_db" label="数据库">
                  </el-table-column>
    <el-table-column  prop="order_sql_backup" label="工单状态">
                  </el-table-column>
      <el-table-column  prop="order_status" label="工单状态">
                  </el-table-column>
      <el-table-column prop="order_time" label="提交时间">
                  </el-table-column>
    <el-table-column  label="查看">
          <template slot-scope="scope">
        <el-button @click="chakan(scope.row)">sql查看</el-button></template>
                  </el-table-column>
      <el-table-column  label="操作1">
          <template slot-scope="scope">
        <el-button  :class=chuli1(scope.row.order_opeation)  @click='handleClick(scope.row.order_id,scope.row.order_opeation)'>{{scope.row.order_opeation}}</el-button>           </template>
                  </el-table-column>
      <el-table-column  label="操作2">
          <template slot-scope="scope">
        <el-button @click="handleClick2(scope.row.order_id)">结果查看</el-button></template>
                  </el-table-column>
        <el-table-column  label="操作3">
          <template slot-scope="scope">
        <el-button @click="handleClick(scope.row.order_id,scope.row.order_opeation)">sql回滚</el-button></template>
                  </el-table-column>

</el-table>
        <el-pagination class="fy" layout="prev, pager, next"  @current-change="current_change" :total=total background></el-pagination>
      <el-dialog  title="查看订单" :visible.sync="chakanforms"  :append-to-body=false class="dialog-wrap"  >
      <el-table :data="detail" :ref="detail" border style=" margin-top: 20px" ref="multipleTable">
        <el-table-column prop="order_sql_text"label="具体sql"><template slot-scope="scope"><pre>{{scope.row.order_sql_text}}</pre></template>
      </el-table-column>
        <el-button @click="chakanforms = false">取消</el-button>
      </el-table>
      </el-dialog>

  <el-dialog  title="查看结果" :visible.sync="rstform"  :append-to-body=false class="dialog-wrap"  >
 <el-table   ref="multipleTable" :data="cep_result" style="width: 100%" >
      <el-table-column  v-for="(item,index) in list" :key="index" :label="item.label" :width="item.width">
        <template slot-scope="scope">
          <span>{{scope.row[item.label]}}</span>
   </template>
      </el-table-column>
    </el-table>
</el-dialog>
  <el-dialog  title="回滚语句" :visible.sync="chuliforms"  :append-to-body=false class="dialog-wrap"  >
      <el-table :data="detailData" :ref="detailData" border style="width: 100%; margin-top: 20px" width=100% ref="multipleTable">
      <el-table-column prop="order_id"  label="工单ID">
                  </el-table-column>
      <el-table-column prop="order_title" label="工单内容">
      </el-table-column>
        <el-table-column prop="order_sql_host" label="数据库服务器">
        </el-table-column>
      <el-table-column prop="order_sql_db" label="数据库">
      </el-table-column>
      <el-table-column prop="order_sql_text" label="具体的sql语句" :show-overflow-tooltip=true><template slot-scope="scope"><pre>{{scope.row.order_sql_text}}</pre></template>
                  </el-table-column>
         <el-table-column prop="order_user" label="提交者">
                  </el-table-column>
        <el-table-column prop="order_opeation" label="状态"></el-table-column>

      </el-table>
    <el-table  v-if=xianshi3 :data="sql_result||[]" style="width: 100%" >
      <el-table-column  v-for="(item,index) in list" :key="index" :label="item.label" :width="item.width">
        <template slot-scope="scope">
          <span>{{scope.row[item.label]}}</span>
   </template>
      </el-table-column>
    </el-table>
    <el-button :disabled="btnChangeEnable" @click='inception_go(detailData)' :loading="zhuangtai">执行工单</el-button>
    <el-button @click='inception_notgo(detailData)'>驳回工单</el-button>
        <el-button @click="chuliforms = false">取消</el-button>
  </el-dialog>
</div>
</template>
<script>
  import { show_order, show_order_list, op_order, op_order_reject, inception_result } from '../../api/order'
  export default
{
    name: 'order',
    inject: ['reload'],
    data: function () {
      return {
        list1: [],
        chuliforms: false,
        chakanforms: false,
        detailData: [],
        list: [{ label: 'ID' }, { label: 'stage' }, { label: 'errlevel' }, { label: 'stagestatus' }, { label: 'errormessage' }, { label: 'sql' }, { label: 'affected_rows' }, { label: 'sequence' }, { label: 'execute_time' }, { label: 'SQLSHA1' }],
        xianshi3: false,
        sql_result: [],
        sql_rollback: [],
        xianshi4: false,
        caozuo: '订单处理',
        total: 10,
        rstform: false,
        pagesize: 10,
        currentPage: 1,
        btnChangeEnable: true,
        yonghuming: '',
        zhuangtai: false,
        jinggao: false,
        xianshi5: false,
        detail: [],
        resultforms: false,
        cep_result: []
      }
    },
    // created () {
    //  show_order().then((res) => {
    //    this.list1 = res.data['result']
    //    this.total = res.data['count']
    //  console.log(this.total)
    // })
    // },
    created () {
      this.current_change(1)
    },
    methods: {
      handleClick (id, opeation) {
        show_order_list(id, opeation).then((res) => {
          this.detailData = res.data['result']
          this.chuliforms = true
          if (res.data.status === '工单已驳回') {
            this.btnChangeEnable = true
            this.xianshi3 = false
          } else {
            this.btnChangeEnable = false
          }
        })
      },
      handleClick2 (id) {
        this.rstform = true
        inception_result(id).then((res) => {
          this.cep_result = res.data['result']
          console.log(this.cep_result)
        })
      },
      chuli: function (row) {
        console.log(row)
        if (row === '处理事务成功') {
          console.log('test2')
          return true
        } else {
          console.log('test3')
          return false
        }
      },
      chuli1: function (row) {
        if (row === '回滚事务') {
          return 'yangshi'
        } else if (row === '工单已驳回') {
          return 'yangshi1'
        } else {
          return 'yangshi2'
        }
      },
      current_change: function (currentPage) {
        this.currentPage = currentPage
        console.log(this.currentPage)
        show_order(this.currentPage).then((res) => {
          this.list1 = res.data['results']
          this.total = res.data['count']
        })
      },
      inception_go: function (row) {
        this.zhuangtai = true
        op_order(row).then((res) => {
          this.zhuangtai = false
          this.sql_result = res.data['inception_result']
          this.sql_rollback = res.data['inception_sql']
          this.xianshi3 = true
          this.caozuo = '结果查看'
          this.reload()
        })
          .catch(function (err) {
            alert(err)
          })
      },
      chakan: function (row) {
        this.chakanforms = true
        this.detail = [row]
      },
      inception_notgo: function (row) {
        console.log(row)
        op_order_reject(row[0].order_id).then((res) => {
          this.chuliforms = false
          this.caozuo = '工单已拒绝'
          this.reload()
        })
          .catch(function (err) {
            alert(err)
          })
      }
    }
  }
</script>

<style scoped>

   .yangshi {
    background-color: #DAA520;
  }
  .yangshi1 {
    background-color: #EE1000;
  }
    .yangshi2 {
    background-color: #00BFFF;
  }
  pre {
    white-space: pre-wrap;
    word-wrap: break-word;
  }
</style>
