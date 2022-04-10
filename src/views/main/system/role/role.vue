<!--
 * @Author: FatJun
 * @Date: 2022-03-03 17:51:38
 * @LastEditors: FatJun
 * @LastEditTime: 2022-03-29 21:49:17
 * @FilePath: /vue3-ts-cms/src/views/main/system/role/role.vue
 *
 * Copyright (c) 2022 by FatJun/Best, All Rights Reserved.
-->
<template>
  <div class="role">
    <h2>role</h2>
    <page-search :searchFromConfig="searchFromConfig" />
    <page-content :pageContentConfig="rolePageContentConfig" pageName="role" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import pageContent from '@/components/page-content/index'
import { rolePageContentConfig, searchFromConfig } from './config'
import PageSearch from '@/components/page-search/src/page-search.vue'

export default defineComponent({
  name: 'role',
  components: {
    pageContent,
    PageSearch
  },
  setup() {
    return {
      rolePageContentConfig,
      searchFromConfig
    }
  }
})
</script>

<style scoped></style>
