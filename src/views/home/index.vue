<template>
  <div>
    <search-bar @search="search">
      <el-form-item label="审批人">
        <el-input v-model="searchData.user" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="searchData.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
    </search-bar>
  </div>
</template>

<script>
import SearchBar from '@/components/SearchBar'

export default {
  name: 'Home',
  data () {
    return {
      searchData: {
        user: '',
        region: ''
      }
    }
  },
  methods: {
    search () {
      console.log('search click', this.searchData)
    }
  },
  components: {
    SearchBar
  }
}
</script>

<style scoped>

</style>
