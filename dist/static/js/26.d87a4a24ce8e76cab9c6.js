webpackJsonp([26],{kg1C:function(t,e,l){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=l("G87+"),r={name:"Sql_log",border:!0,inject:["reload"],data:function(){return{logg:[]}},created:function(){var t=this;Object(a.l)().then(function(e){t.logg=e.data})}},n={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("el-table",{ref:"multipleTable",staticStyle:{width:"50%"},attrs:{data:this.logg,border:""}},[e("el-table-column",{attrs:{prop:"user",label:"姓名"}}),this._v(" "),e("el-table-column",{attrs:{prop:"db",label:"数据库"}}),this._v(" "),e("el-table-column",{attrs:{prop:"comment_sql",label:"具体sql"}}),this._v(" "),e("el-table-column",{attrs:{prop:"riqi",label:"日期"}})],1)],1)},staticRenderFns:[]},o=l("VU/8")(r,n,!1,null,null,null);e.default=o.exports}});