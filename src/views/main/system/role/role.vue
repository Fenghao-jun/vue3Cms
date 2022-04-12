<!--
 * @Author: FatJun
 * @Date: 2022-03-03 17:51:38
 * @LastEditors: FatJun
 * @LastEditTime: 2022-04-10 22:39:00
 * @FilePath: \vue3Cms\src\views\main\system\role\role.vue
 *
 * Copyright (c) 2022 by FatJun/Best, All Rights Reserved.
-->
<template>
  <div class="role">
    <page-search :searchFromConfig="searchFromConfig" />
    <page-content
      :pageContentConfig="rolePageContentConfig"
      pageName="role"
      @btnCreateClick="handleCreateClick"
      @btnUpdateClick="handleUpdateClick"
    />
    <page-model
      ref="pageModelRef"
      :pageModelConfig="rolePageModelConfig"
      :defaultInfo="defaultInfo"
      pageName="role"
    >
      <el-tree
        :data="treeData"
        show-checkbox
        node-key="id"
        :props="{ children: 'children', label: 'name' }"
      />
    </page-model>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

import pageContent from '@/components/page-content/'
import PageSearch from '@/components/page-search/'
import pageModel from '@/components/page-model/'

import {
  rolePageContentConfig,
  searchFromConfig,
  rolePageModelConfig
} from './config'

import { usePageModel } from '@/hooks'

export default defineComponent({
  name: 'role',
  components: {
    pageContent,
    PageSearch,
    pageModel
  },
  setup() {
    const { pageModelRef, defaultInfo, handleCreateClick, handleUpdateClick } =
      usePageModel()

    const store = useStore()
    const treeData = computed(() => store.state.entireMenuList)

    return {
      rolePageContentConfig,
      searchFromConfig,
      rolePageModelConfig,
      pageModelRef,
      defaultInfo,
      handleCreateClick,
      handleUpdateClick,
      treeData
    }
  }
})
</script>

<style scoped></style>
