<template>
  <div class="pic-charts">
    <base-echarts :options="optionComputed" />
  </div>
</template>

<script lang="ts" setup>
import baseEcharts from '@/base-ui/echarts'
import { computed, defineProps } from 'vue'
import { EChartsOption } from 'echarts'
import { IPieChartData } from '../types/type'

const props = defineProps<{
  data: IPieChartData[]
}>()

const optionComputed = computed(() => {
  const options: EChartsOption = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: props.data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }

  return options
})
</script>

<style scoped></style>
