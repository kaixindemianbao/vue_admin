webpackJsonp([13],{AGFi:function(t,e,l){(t.exports=l("FZ+f")(!1)).push([t.i,"\n.yangshi[data-v-407cff0c] {\n  background-color: #DAA520;\n}\n.yangshi1[data-v-407cff0c] {\n  background-color: #EE1000;\n}\n.yangshi2[data-v-407cff0c] {\n  background-color: #00BFFF;\n}\n",""])},CsUU:function(t,e,l){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=l("hR3u"),o=l("G87+"),s={name:"mysql_slow_log",data:function(){return{jieguo:[],dblist2:[],chuliforms:!1,chakanforms:!1,detailData:[],slowlog:{hostname:"",db:"",start_time:"",end_time:""},xianshi3:!1,sql_result:[],sql_rollback:[],xianshi4:!1,caozuo:"订单处理",total:1,pagesize:10,currentPage:1,btnChangeEnable:!0,yonghuming:"",zhuangtai:!1,jinggao:!1,detail:[]}},methods:{selectGet:function(){var t=this;Object(o.f)().then(function(e){t.dblist2=e.data}).catch(function(t){alert(t)})},tijiao:function(){var t=this;Object(a.i)(this.slowlog.hostname,this.slowlog.db,this.slowlog.start_time,this.slowlog.end_time).then(function(e){t.jieguo=e.data}).catch(function(t){alert(t)})}}},n={render:function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",[l("el-form",{ref:"slowlog",attrs:{id:"slowlog",model:t.slowlog,"label-width":"80px"}},[l("el-form-item",{staticStyle:{"margin-bottom":"10px",width:"50%"},attrs:{label:"主机名:",prop:"string"}},[l("el-select",{staticStyle:{width:"100%"},nativeOn:{click:function(e){return t.selectGet(e)}},model:{value:t.slowlog.hostname,callback:function(e){t.$set(t.slowlog,"hostname",e)},expression:"slowlog.hostname"}},t._l(t.dblist2,function(t,e){return l("el-option",{key:e,attrs:{label:t.host,value:t.host}})}),1)],1),t._v(" "),l("el-form-item",{staticStyle:{"margin-bottom":"10px",width:"50%"},attrs:{label:"数据库名:",prop:"string"}},[l("el-input",{staticStyle:{width:"100%"},model:{value:t.slowlog.db,callback:function(e){t.$set(t.slowlog,"db",e)},expression:"slowlog.db"}})],1),t._v(" "),l("el-form-item",{staticStyle:{"margin-bottom":"10px",width:"50%"},attrs:{label:"输入时间:",prop:"string"}},[l("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"datetime",placeholder:"选择开始时间","value-format":"yyyy-MM-dd HH:mm:ss"},model:{value:t.slowlog.start_time,callback:function(e){t.$set(t.slowlog,"start_time",e)},expression:"slowlog.start_time"}})],1),t._v(" "),l("el-form-item",{staticStyle:{"margin-bottom":"10px",width:"50%"},attrs:{label:"输入时间:",prop:"string"}},[l("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"datetime",placeholder:"选择结束时间","value-format":"yyyy-MM-dd HH:mm:ss"},model:{value:t.slowlog.end_time,callback:function(e){t.$set(t.slowlog,"end_time",e)},expression:"slowlog.end_time"}})],1),t._v(" "),l("el-button",{attrs:{type:"primary"},on:{click:t.tijiao}},[t._v("查询")])],1),t._v(" "),l("el-table",{ref:"multipleTable",staticStyle:{width:"100%","margin-top":"20px"},attrs:{data:t.jieguo||[],width:"100%","default-sort":{prop:t.ts_cnt,order:t.descending}}},[l("el-table-column",{attrs:{prop:"checksum",label:"checksum值"}}),t._v(" "),l("el-table-column",{attrs:{prop:"db_max",label:"数据库"}}),t._v(" "),l("el-table-column",{attrs:{prop:"user_max",label:"程序用户"}}),t._v(" "),l("el-table-column",{attrs:{prop:"fingerprint",label:"指模","show-overflow-tooltip":!0}}),t._v(" "),l("el-table-column",{attrs:{prop:"sample",label:"具体实例sql",width:"410px"}}),t._v(" "),l("el-table-column",{attrs:{prop:"ts_cnt",label:"执行次数",sortable:""}}),t._v(" "),l("el-table-column",{attrs:{prop:"Query_time_sum",label:"执行总时间"}}),t._v(" "),l("el-table-column",{attrs:{prop:"Query_time_max",label:"执行最大时间",sortable:""}}),t._v(" "),l("el-table-column",{attrs:{prop:"Lock_time_max",label:"锁定时间"}}),t._v(" "),l("el-table-column",{attrs:{prop:"Rows_sent_max",label:"最大扫描行数"}}),t._v(" "),l("el-table-column",{attrs:{prop:"Rows_examined_max",label:"最大返回结果行数",sortable:""}}),t._v(" "),l("el-table-column",{attrs:{prop:"last_seen",label:"最近执行时间"}})],1)],1)},staticRenderFns:[]};var i=l("VU/8")(s,n,!1,function(t){l("hCNJ")},"data-v-407cff0c",null);e.default=i.exports},hCNJ:function(t,e,l){var a=l("AGFi");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);l("rjj0")("2042f98c",a,!0,{})}});