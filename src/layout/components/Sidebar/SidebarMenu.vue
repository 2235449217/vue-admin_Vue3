<template>
  <!-- 一级 menu 菜单 -->
  <el-menu
    :collapse="!$store.getters.sidebarOpened"
    :default-active="activeMenu"
    :background-color="$store.getters.cssVar.menuBg"
    :text-color="$store.getters.cssVar.menuText"
    :active-text-color="$store.getters.cssVar.menuActiveText"
    router
  >
    <Sidebar-item
      v-for="item in routes"
      :key="item.path"
      :route="item"
    ></Sidebar-item>
  </el-menu>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { filterRouters, generateMenus } from '@/utils/route'
import SidebarItem from './SidebarItem.vue'

const router = useRouter()
console.log(router.getRoutes())
const routes = computed(() => {
  const filterRoutes = filterRouters(router.getRoutes())
  console.log(filterRoutes)
  console.log(generateMenus(filterRoutes))
  return generateMenus(filterRoutes)
})
// console.log(JSON.stringify(routes.value))
const route = useRoute()
const activeMenu = computed(() => {
  const { path } = route
  // console.log('我在这里啊')
  return path
})
</script>
<style scoped lang="scss"></style>
