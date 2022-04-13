<!--
 * @Author: FatJun
 * @Date: 2022-03-03 17:51:38
 * @LastEditors: FatJun
 * @LastEditTime: 2022-04-13 11:36:00
 * @FilePath: /vue3-ts-cms/src/views/main/system/role/role.vue
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
      :otherInfo="otherInfo"
      pageName="role"
    >
      <el-tree
        @check="handleCheckChange"
        ref="treeRef"
        :data="treeData"
        show-checkbox
        node-key="id"
        :props="{ children: 'children', label: 'name' }"
      />
    </page-model>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, nextTick } from 'vue'
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
import { ElTree } from 'element-plus'
import { getMenuLeaf } from '@/utils/map-menu'

export default defineComponent({
  name: 'role',
  components: {
    pageContent,
    PageSearch,
    pageModel
  },
  setup() {
    const treeRef = ref<InstanceType<typeof ElTree>>()
    const otherInfo = ref({})
    const handleCreateCb = () => {
      nextTick(() => {
        console.log('treeRef: ', treeRef)
      })
    }
    const handleCheckChange = (currentNode: any, treeStateObj: any) => {
      const { checkedKeys, halfCheckedKeys } = treeStateObj
      otherInfo.value = {
        menuList: [...checkedKeys, ...halfCheckedKeys]
      }
    }

    const handleUpdateCb = (item: any) => {
      console.log('item: ', item)
      const { menuList } = item
      //递归获取所有勾选的子节点进行设置
      const menuLeaf = getMenuLeaf(menuList)
      nextTick(() => {
        if (treeRef.value) {
          treeRef.value.setCheckedKeys(menuLeaf, false)
        }
      })
    }

    const { pageModelRef, defaultInfo, handleCreateClick, handleUpdateClick } =
      usePageModel(handleCreateCb, handleUpdateCb)

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
      treeData,
      treeRef,
      handleCheckChange,
      otherInfo
    }
  }
})
</script>

<style scoped></style>
