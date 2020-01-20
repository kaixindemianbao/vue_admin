<template>
  <div>
<el-row>工单提交</el-row>
<el-row>1 工单提交分为DML和DDL两种格式,请大家对上线sql进行拆解分类提交</el-row>
<el-row>2 工单内容提交的最后一条sql请不要加;,否则验证不能通过</el-row>
<el-row>3 如果验证仅仅提示failure但是没有其他内容,是因为关键字检测触发的问题,如有疑问请联系DBA进行</el-row>
    <el-row>4 特殊需求,比如清理表等操作请走天兔平台提工单</el-row>
    <el-row>语法规范</el-row>
    <el-row>1 所有列都需要添加comment说明</el-row>
    <el-row> 2 主键必须是无符号类型的自增ID</el-row>
    <el-row> 3 insert语句必须携带值对应的列</el-row>
    <el-row>4 所有index建立必须以idx_开头</el-row>
    <el-row>数据查询</el-row>
    <el-row>1 sql填充区确保一条sql占据一行,否则会无法验证通过</el-row>
    <el-row>2 csv下载功能必须确保点击sql查询后确定按钮加载状态消失方可下载</el-row>
    </div>
  </template>
<script>
  export default {
    name: 'shuoming'
  }
</script>

<style scoped>

</style>
