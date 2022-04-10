<!--
 * @Author: FatJun
 * @Date: 2022-02-15 10:11:23
 * @LastEditors: FatJun
 * @LastEditTime: 2022-03-20 10:48:12
 * @FilePath: /vue3-ts-cms/src/views/main/main.vue
 *
 * Copyright (c) 2022 by FatJun/Best, All Rights Reserved.
-->
<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isCollapse ? '60px' : '200px'">
        <nav-menu :collapse="isCollapse" />
      </el-aside>
      <el-container class="page">
        <el-header class="page-header">
          <nav-header @fold-click="handleCollapse" />
        </el-header>
        <el-main class="page-content">
          <div class="page-info">
            <router-view />
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import navMenu from '@/components/nav-menu'
import navHeader from '../../components/nav-header/index'

export default defineComponent({
  components: { navMenu, navHeader },
  setup() {
    const isCollapse = ref(false)
    const handleCollapse = (isCollapseValue: boolean) => {
      console.log('isCollapseValue: ', isCollapseValue)
      isCollapse.value = isCollapseValue
    }

    return {
      isCollapse,
      handleCollapse
    }
  }
})
</script>

<style scoped lang="less">
.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.main-content,
.page {
  height: 100%;
}

.page-content {
  height: calc(100% - 48px);

  .page-info {
    background-color: #fff;
    border-radius: 5px;
  }
}

.el-header,
.el-footer {
  display: flex;
  color: #333;
  text-align: center;
  align-items: center;
}

.el-header {
  height: 48px !important;
}

.el-aside {
  overflow-x: hidden;
  overflow-y: auto;
  line-height: 200px;
  text-align: left;
  cursor: pointer;
  // background-color: #001529;
  background-color: aqua;
  transition: width 0.3s linear;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */

  &::-webkit-scrollbar {
    display: none;
  }
}

.el-main {
  color: #333;
  text-align: center;
  background-color: #f0f2f5;
}
.page-info {
  background-color: #fff;
  border-radius: 5px;
}
</style>
