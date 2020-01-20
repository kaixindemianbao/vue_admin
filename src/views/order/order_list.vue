<template>
<div>
  <el-table :data="(list1 || []).slice((currentPage-1)*pagesize,currentPage*pagesize)"  border style="width: 100%; margin-top: 20px" width=100% ref="multipleTable">
      <el-table-column prop="order_id"  label="工单ID">
                  </el-table-column>
      <el-table-column prop="order_title" label="工单内容">
                  </el-table-column>
      <el-table-column prop="order_user" label="提交用户">
                  </el-table-column>
      <el-table-column prop="order_sql_db" label="数据库">
                  </el-table-column>
      <el-table-column  prop="order_status" label="工单状态">
                  </el-table-column>
      <el-table-column prop="order_time" label="提交时间">
                  </el-table-column>
    <el-table-column  label="查看">
          <template slot-scope="scope">
        <el-button @click="chakan(scope.row)">sql查看</el-button></template>
                  </el-table-column>
  </el-table>
     <el-dialog  title="查看订单" :visible.sync="chakanforms"  :append-to-body=false class="dialog-wrap"  >
      <el-table :data="detail" :ref="detail" border style="width: 100%; margin-top: 20px" width=100% ref="multipleTable">
      <el-table-column prop="order_sql_text" label="具体sql"><template slot-scope="scope"><pre>{{scope.row.order_sql_text}}</pre></template>
      </el-table-column>
        <el-button @click="chakanforms = false">取消</el-button>
      </el-table>
      </el-dialog>
</div>
</template>
<script>
  import { auth_order } from '../../api/select'
  export default {
    name: 'order',
    inject: ['reload'],
    data: function () {
      return {
        list1: [],
        chuliforms: false,
        chakanforms: false,
        detailData: [],
        xianshi3: false,
        sql_result: [],
        sql_rollback: [],
        xianshi4: false,
        caozuo: '订单处理',
        total: 1,
        pagesize: 10,
        currentPage: 1,
        btnChangeEnable: true,
        yonghuming: '',
        zhuangtai: false,
        jinggao: false,
        detail: []

      }
    },
    created () {
      auth_order().then((res) => {
        this.list1 = res.data['result']
        this.total = res.data['count']
        console.log(this.total)
      })
    },
    methods: {
      chakan: function (row) {
        this.chakanforms = true
        this.detail = [row]
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
