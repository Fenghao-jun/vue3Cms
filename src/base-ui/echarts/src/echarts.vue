<template>
  <div class="base-echarts">
    <div ref="divRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, withDefaults, onMounted, watchEffect } from 'vue'
import * as echarts from 'echarts'
import useEcharts from '../hooks/useEcharts'

const props = withDefaults(
  defineProps<{
    width?: string
    height?: string
    options: echarts.EChartsOption
  }>(),
  {
    width: '100%',
    height: '360px'
  }
)

const divRef = ref<HTMLDivElement>()

onMounted(() => {
  const { setOptions } = useEcharts(divRef.value!)
  watchEffect(() => {
    setOptions(props.options)
  })
})
</script>

<style scoped></style>
