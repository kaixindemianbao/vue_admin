<template>
  <el-card class="search-bar">
    <el-form :inline="true" class="search-bar-form" size="small">
      <slot></slot>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" icon="el-icon-search">查询</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: 'SearchBar',
  methods: {
    onSubmit () {
      this.$emit('search')
    }
  }
}
</script>

<style lang="scss">
.search-bar {
  display: inline-block;

  .search-bar-form .el-form-item {
    margin-bottom: 0;
  }
}
</style>
