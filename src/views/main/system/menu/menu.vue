<template>
  <div class="menu">
    <page-content
      :pageContentConfig="menuPageContentConfig"
      pageName="menu"
    ></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import pageContent from '@/components/page-content/index'

import { menuPageContentConfig } from './config/menuTableColumnConfig'

export default defineComponent({
  name: 'menu',
  components: {
    pageContent
  },
  setup() {
    return {
      menuPageContentConfig
    }
  }
})
</script>

<style scoped></style>
