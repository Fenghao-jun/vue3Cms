<template>
  <div class="user">
    <page-search
      :searchFromConfig="searchFromConfig"
      @queryBtnClick="handleQueryClick"
      @resetBtnClick="handleResetClick"
    />
    <div class="content">
      <page-content
        ref="pageContentRef"
        :pageContentConfig="userPageContentConfig"
        pageName="users"
        @btnCreateClick="handleCreateClick"
        @btnUpdateClick="handleUpdateClick"
      />
    </div>
    <page-model
      :pageModelConfig="modelConfigRef"
      :defaultInfo="defaultInfo"
      ref="pageModelRef"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store'

import pageSearch from '@/components/page-search/index'
import pageContent from '@/components/page-content/index'
import pageModel from '@/components/page-model/index'

import {
  userPageContentConfig,
  searchFromConfig,
  pageModelConfig
} from './config'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModel } from '@/hooks/use-page-model'

export default defineComponent({
  name: 'user',
  components: {
    pageSearch,
    pageContent,
    pageModel
  },
  setup() {
    const { handleQueryClick, handleResetClick, pageContentRef } =
      usePageSearch()

    const handleCreateClickCb = () => {
      const fromItem = pageModelConfig.fromItems.find(
        (item) => item.type === 'password'
      )
      if (fromItem) {
        fromItem.hidden = false
      }
    }

    const handleUpdateClickCb = () => {
      const fromItem = pageModelConfig.fromItems.find(
        (item) => item.type === 'password'
      )
      if (fromItem) {
        fromItem.hidden = true
      }
    }

    const modelConfigRef = computed(() => {
      const store = useStore()
      console.log(store.state)
      const departmentConfig = pageModelConfig.fromItems.find(
        (item) => item.field === 'departmentId'
      )
      if (departmentConfig) {
        departmentConfig.options = store.state.entireDepartments.map((item) => {
          return {
            label: item.name,
            value: item.id
          }
        })
      }

      const roleConfig = pageModelConfig.fromItems.find(
        (item) => item.field === 'roleId'
      )
      if (roleConfig) {
        roleConfig.options = store.state.entireRoles.map((item) => {
          return {
            label: item.name,
            value: item.id
          }
        })
      }
      return pageModelConfig
    })

    const { pageModelRef, handleCreateClick, handleUpdateClick, defaultInfo } =
      usePageModel(handleCreateClickCb, handleUpdateClickCb)

    return {
      searchFromConfig,
      userPageContentConfig,
      modelConfigRef,
      handleQueryClick,
      handleResetClick,
      pageContentRef,
      pageModelRef,
      handleCreateClick,
      handleUpdateClick,
      defaultInfo
    }
  }
})
</script>

<style scoped></style>
