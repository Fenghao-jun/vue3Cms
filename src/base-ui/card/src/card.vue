<template>
  <div class="hj-card">
    <el-card>
      <template #header>
        <slot name="title">
          {{ title }}
        </slot>
      </template>
      <div class="hj-card-body">
        <slot></slot>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
