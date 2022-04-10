<template>
  <div class="goods">
    <h2>goods</h2>
    <page-content :pageContentConfig="goodsPageContentConfig" pageName="goods">
      <template #oldPrice="{ row }"> ¥{{ row.newPrice }} </template>
      <template #newPrice="{ row }"> ¥{{ row.newPrice }} </template>
      <template #img="{ row }">
        <el-image
          style="width: 100px; height: 100px"
          :src="row.imgUrl"
          :preview-src-list="[row.imgUrl]"
        />
      </template>
    </page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import pageContent from '@/components/page-content/index'
import { goodsPageContentConfig } from './config'

export default defineComponent({
  name: 'goods',
  components: {
    pageContent
  },
  setup() {
    return {
      goodsPageContentConfig
    }
  }
})
</script>

<style scoped></style>
