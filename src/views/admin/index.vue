<template>
  <div>
    <h1>权限路由</h1>
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
