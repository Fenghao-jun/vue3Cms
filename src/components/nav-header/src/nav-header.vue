<!--
 * @Author: FatJun
 * @Date: 2022-03-02 17:16:33
 * @LastEditors: FatJun
 * @LastEditTime: 2022-03-21 09:27:02
 * @FilePath: /vue3-ts-cms/src/components/nav-header/src/nav-header.vue
 *
 * Copyright (c) 2022 by FatJun/Best, All Rights Reserved.
-->
<template>
  <div class="nav-header">
    <i
      class="fold"
      :class="isFold ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
      @click="handelFolds"
    />
    <div class="contain">
      <!-- <div>面包屑</div> -->
      <hj-breadcrumb :breadcrumbItems="breadcrumbs" />
      <user-info />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'

import HjBreadcrumb, { IBreadcrumb } from '@/base-ui/bread-crumb/index'
import userInfo from './user-info.vue'

import { pathMapToBreadcrumb } from '@/utils/map-menu'

export default defineComponent({
  components: { userInfo, HjBreadcrumb },
  emits: ['fold-click'],
  setup(props, { emit }) {
    const isFold = ref(false)

    const handelFolds = () => {
      isFold.value = !isFold.value
      emit('fold-click', isFold.value)
    }

    const store = useStore()
    const route = useRoute()
    const breadcrumbs = computed(() => {
      const userMenus = store.state.login.userMenus
      const currentPath = route.path
      return pathMapToBreadcrumb(userMenus!, currentPath)
    })
    return {
      handelFolds,
      isFold,
      breadcrumbs
    }
  }
})
</script>

<style scoped>
.nav-header {
  display: flex;
  width: 100%;
}
.fold {
  font-size: 30px;
  text-align: center;
  cursor: pointer;
}
.contain {
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}
</style>
