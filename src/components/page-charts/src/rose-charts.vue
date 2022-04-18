<template>
  <div class="rose-charts">
    <base-echarts :options="roseOptionComputed" />
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'

import baseEcharts from '@/base-ui/echarts'
import { IPieChartData } from '../types/type'
import { SeriesOption } from 'echarts'

const props = defineProps<{
  data: IPieChartData[]
}>()

const roseOptionComputed = computed(() => {
  const option = {
    legend: {
      top: 'bottom'
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    series: [
      {
        name: 'Nightingale Chart',
        type: 'pie',
        radius: [20, 80],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8
        },
        data: props.data
      }
    ] as SeriesOption[]
  }
  return option
})
</script>

<style lang="scss" scoped></style>
