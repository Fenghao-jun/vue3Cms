<!--
 * @Author: FatJun
 * @Date: 2022-03-10 14:51:04
 * @LastEditors: FatJun
 * @LastEditTime: 2022-03-14 10:01:00
 * @FilePath: /vue3-ts-cms/src/components/nav-header/src/user-info.vue
 *
 * Copyright (c) 2022 by FatJun/Best, All Rights Reserved.
-->
<template>
  <div class="user-info">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        />
        {{ name }}
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>退出登陆</el-dropdown-item>
          <el-dropdown-item divided>用户设置</el-dropdown-item>
          <el-dropdown-item>修改密码</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

export default defineComponent({
  setup() {
    const store = useStore()
    const name = computed(() => store.state.login.userInfo?.name)
    return {
      name
    }
  }
})
</script>

<style scoped>
.user-info {
  cursor: pointer;
}
.user-info > * {
  margin-right: 10px;
}
.el-dropdown-link {
  display: flex;
  align-items: center;
}
</style>
