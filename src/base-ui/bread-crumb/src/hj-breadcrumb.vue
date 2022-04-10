<!--
 * @Author: FatJun
 * @Date: 2022-03-20 21:36:25
 * @LastEditors: FatJun
 * @LastEditTime: 2022-03-21 09:20:44
 * @FilePath: /vue3-ts-cms/src/base-ui/bread-crumb/src/hj-breadcrumb.vue
 *
 * Copyright (c) 2022 by FatJun/Best, All Rights Reserved.
-->
<template>
  <div class="hj-breadcrumb">
    <el-breadcrumb separator="/">
      <template v-for="item in breadcrumbItems" :key="item.name">
        <el-breadcrumb-item :to="item.path">{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IBreadcrumb } from '../type'

export default defineComponent({
  props: {
    breadcrumbItems: {
      type: Array as PropType<IBreadcrumb[]>
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
