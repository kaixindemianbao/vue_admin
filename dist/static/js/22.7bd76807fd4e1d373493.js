webpackJsonp([22],{pMdt:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("woOf"),r=a.n(l),o=a("QB0O"),n={name:"user_managed",inject:["reload"],data:function(){return{user:[],reload:this.reload,addForms:!1,editForms:!1,editForm:{username:"",password:"",department:"",email:"",real_name:"",auth_group:""},addsForm:{username:"",password:"",department:"",email:"",real_name:"",auth_group:""},group:"",auth_grouplist:[{label:"研发"},{label:"研发组长"},{label:"DBA"}]}},created:function(){var e=this;Object(o.q)().then(function(t){e.user=t.data})},methods:{current_change:function(e){this.currentPage=e},handleSelectionChange:function(e){this.multipleSelection=e},Row_Delete:function(e){var t=this;Object(o.n)(e.username).then(function(e){console.log("删除成功"),t.reload()})},group_list:function(){var e=this;Object(o.p)().then(function(t){e.group=t.data,console.log(e.group)})},Row_ADD:function(){var e=this;Object(o.m)(this.addsForm).then(function(t){console.log(e.addsForm),e.reload()})},Row_Edit:function(e){this.editForms=!0,this.id=e.id;var t=e;this.editForm=r()({},t)},user_editd:function(e){var t=this;Object(o.o)(this.editForm).then(function(e){t.reload()})}}},i={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:e.user,border:""}},[a("el-table-column",{attrs:{prop:"username",label:"姓名"}}),e._v(" "),a("el-table-column",{attrs:{prop:"department",label:"部门"}}),e._v(" "),a("el-table-column",{attrs:{prop:"email",label:"邮件"}}),e._v(" "),a("el-table-column",{attrs:{prop:"real_name",label:"真实姓名"}}),e._v(" "),a("el-table-column",{attrs:{prop:"auth_group",label:"权限组"}}),e._v(" "),a("el-table-column",{scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"small",type:"danger"},on:{click:function(a){return e.Row_Delete(t.row)}}},[e._v("删除")]),e._v(" "),a("el-button",{attrs:{size:"small",type:"danger"},on:{click:function(a){return e.Row_Edit(t.row)}}},[e._v("编辑")])]}}])}),e._v(" "),a("el-table-column")],1),e._v(" "),a("el-dialog",{staticClass:"dialog-wrap",attrs:{title:"编辑用户信息",visible:e.editForms,"append-to-body":!1},on:{"update:visible":function(t){e.editForms=t}}},[a("el-form",{ref:"editForm",attrs:{id:"#editForm",model:e.editForm}},[a("el-form-item",{attrs:{label:"姓名",prop:"username"}},[a("el-input",{attrs:{readonly:""},model:{value:e.editForm.username,callback:function(t){e.$set(e.editForm,"username",t)},expression:"editForm.username"}})],1),e._v(" "),a("el-form-item",{staticStyle:{"margin-bottom":"10px",width:"50%"},attrs:{label:"业务组:",prop:"string"}},[a("el-select",{staticStyle:{width:"100%"},nativeOn:{click:function(t){return e.group_list(t)}},model:{value:e.editForm.department,callback:function(t){e.$set(e.editForm,"department",t)},expression:"editForm.department"}},e._l(e.group,function(e,t){return a("el-option",{key:t,attrs:{label:e.department,value:e.department}})}),1)],1),e._v(" "),a("el-form-item",{attrs:{label:"邮箱",prop:"email"}},[a("el-input",{model:{value:e.editForm.email,callback:function(t){e.$set(e.editForm,"email",t)},expression:"editForm.email"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"真实姓名",prop:"real_name"}},[a("el-input",{model:{value:e.editForm.real_name,callback:function(t){e.$set(e.editForm,"real_name",t)},expression:"editForm.real_name"}})],1),e._v(" "),a("el-select",{staticStyle:{width:"100%"},model:{value:e.editForm.auth_group,callback:function(t){e.$set(e.editForm,"auth_group",t)},expression:"editForm.auth_group"}},e._l(e.auth_grouplist,function(e,t){return a("el-option",{key:t,attrs:{label:e.index,value:e.label}})}),1),e._v(" "),a("el-button",{on:{click:function(t){e.user_editd(),e.editForms=!1}}},[e._v("确定")]),e._v(" "),a("el-button",{on:{click:function(t){e.editForms=!1}}},[e._v("取消")])],1)],1),e._v(" "),a("el-button",{attrs:{type:"danger",size:"small"},on:{click:function(t){e.addForms=!0}}},[e._v("新增用户")]),e._v(" "),a("el-dialog",{staticClass:"dialog-wrap",attrs:{title:"新增用户信息",visible:e.addForms,"append-to-body":!1},on:{"update:visible":function(t){e.addForms=t}}},[a("el-form",{ref:"addsForm",attrs:{id:"#addsForm",model:e.addsForm}},[a("el-form-item",{attrs:{label:"姓名",prop:"username"}},[a("el-input",{model:{value:e.addsForm.username,callback:function(t){e.$set(e.addsForm,"username",t)},expression:"addsForm.username"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"密码",prop:"password"}},[a("el-input",{model:{value:e.addsForm.password,callback:function(t){e.$set(e.addsForm,"password",t)},expression:"addsForm.password"}})],1),e._v(" "),a("el-form-item",{staticStyle:{"margin-bottom":"10px",width:"50%"},attrs:{label:"业务组:",prop:"string"}},[a("el-select",{staticStyle:{width:"100%"},nativeOn:{click:function(t){return e.group_list(t)}},model:{value:e.addsForm.department,callback:function(t){e.$set(e.addsForm,"department",t)},expression:"addsForm.department"}},e._l(e.group,function(e,t){return a("el-option",{key:t,attrs:{label:e.department,value:e.department}})}),1)],1),e._v(" "),a("el-form-item",{attrs:{label:"邮箱",prop:"email"}},[a("el-input",{model:{value:e.addsForm.email,callback:function(t){e.$set(e.addsForm,"email",t)},expression:"addsForm.email"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"真实姓名",prop:"real_name"}},[a("el-input",{model:{value:e.addsForm.real_name,callback:function(t){e.$set(e.addsForm,"real_name",t)},expression:"addsForm.real_name"}})],1),e._v(" "),a("el-button",{on:{click:function(t){e.Row_ADD(),e.addForms=!1}}},[e._v("确定")]),e._v(" "),a("el-button",{on:{click:function(t){e.addForms=!1}}},[e._v("取消")])],1)],1)],1)},staticRenderFns:[]},s=a("VU/8")(n,i,!1,null,null,null);t.default=s.exports}});