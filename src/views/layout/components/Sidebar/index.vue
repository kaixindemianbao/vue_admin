<template>
  <scroll-bar>
    <div class="logo">
      <img src="static/logo.png" width="36" height="36">
      <transition name="el-fade-in">
        <h4 v-show="!isCollapse">Admin template</h4>
      </transition>
    </div>
    <el-menu mode="vertical" unique-opened :default-active="$route.path" :collapse="isCollapse" background-color="#3d454d" text-color="#d6d7d9" active-text-color="#6495ED">
      <sidebar-item :routes="permission_routers"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/ScrollBar'

export default {
  components: { SidebarItem, ScrollBar },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    isCollapse () {
      return !this.sidebar.opened
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.logo {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: #fff;
  > img {
    margin: 15px 15px 20px;
  }
  h4 {
    width: 82px;
    overflow: hidden;
    white-space: nowrap;
  }
}
</style>
