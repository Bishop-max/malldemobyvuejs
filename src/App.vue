<template>
  <div id="app">
    <!-- keep-alive exclude中的组件要指定name属性 -->
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
		<MainTabBar></MainTabBar>
  </div>
</template>

<script>
import MainTabBar from '@/components/content/mainTabbar/MainTabBar'

export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>

<style scoped>
 @import url("assets/css/base.css");
</style>
