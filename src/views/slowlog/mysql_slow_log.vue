<template>
<div>
    <el-form id="slowlog" ref="slowlog" :model="slowlog" label-width="80px"  >
  <el-form-item style="margin-bottom: 10px; width: 50%" label="主机名:" prop="string">
   <el-select @click.native=selectGet v-model="slowlog.hostname" style="width: 100%">
            <el-option v-for="(item,index) in dblist2" :key="index" :label="item.host" :value="item.host"></el-option>
          </el-select>
   </el-form-item>
      <el-form-item style="margin-bottom: 10px; width: 50%" label="数据库名:" prop="string">
    <el-input  v-model="slowlog.db" style="width: 100%">
          </el-input>
      </el-form-item>
    <el-form-item style="margin-bottom: 10px; width: 50%" label="输入时间:" prop="string">
<el-date-picker type="datetime"  v-model="slowlog.start_time" placeholder="选择开始时间" value-format="yyyy-MM-dd HH:mm:ss"    style="width: 100%;"></el-date-picker>
    </el-form-item>
          <el-form-item style="margin-bottom: 10px; width: 50%" label="输入时间:" prop="string">
<el-date-picker type="datetime"  v-model="slowlog.end_time" placeholder="选择结束时间" value-format="yyyy-MM-dd HH:mm:ss"    style="width: 100%;"></el-date-picker>
    </el-form-item>
    <el-button type="primary" @click='tijiao' >查询</el-button>
  </el-form>
  <el-table  :data="(jieguo || [])" style="width: 100%; margin-top: 20px" width=100% ref="multipleTable" :default-sort = '{prop:ts_cnt,order:descending}'>
    <el-table-column prop="checksum" label="checksum值"></el-table-column>
    <el-table-column prop="db_max" label="数据库"></el-table-column>
    <el-table-column prop="user_max" label="程序用户"></el-table-column>
    <el-table-column prop="fingerprint" label="指模"  :show-overflow-tooltip=true></el-table-column>
    <el-table-column prop="sample" label="具体实例sql" width="410px"></el-table-column>
    <el-table-column prop="ts_cnt" label="执行次数"  sortable></el-table-column>
    <el-table-column prop="Query_time_sum" label="执行总时间"></el-table-column>
    <el-table-column prop="Query_time_max" label="执行最大时间" sortable></el-table-column>
    <el-table-column prop="Lock_time_max" label="锁定时间"></el-table-column>
    <el-table-column prop="Rows_sent_max" label="最大扫描行数" ></el-table-column>
    <el-table-column prop="Rows_examined_max" label="最大返回结果行数" sortable></el-table-column>
    <el-table-column prop="last_seen" label="最近执行时间"></el-table-column>
  </el-table>

</div>

</template>
<script>
  import { slow_log } from '../../api/status'
  import { host_select1 } from '../../api/select'

  export default
{
    name: 'mysql_slow_log',
    data: function () {
      return {
        jieguo: [],
        dblist2: [],
        chuliforms: false,
        chakanforms: false,
        detailData: [],
        slowlog: {
          hostname: '',
          db: '',
          start_time: '',
          end_time: ''
        },
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
    methods: {
      selectGet: function () {
        host_select1().then((res) => {
          this.dblist2 = res.data
        })
          .catch(function (err) {
            alert(err)
          })
      },
      tijiao: function () {
        slow_log(this.slowlog.hostname, this.slowlog.db, this.slowlog.start_time, this.slowlog.end_time).then((res) => {
          this.jieguo = res['data']
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
</style>
