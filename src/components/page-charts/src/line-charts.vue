<template>
  <div class="lint-charts">
    <base-echarts :options="lineOptionsComputed" />
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import * as echarts from 'echarts'
import baseEcharts from '@/base-ui/echarts'

const props = defineProps<{
  xAxisData: any
  data: any
}>()

const lineOptionsComputed = computed(() => {
  const options = {
    xAxis: {
      data: props.xAxisData,
      axisLabel: {
        inside: true,
        color: '#fff'
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      z: 10
    },
    yAxis: {
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#999'
      }
    },
    dataZoom: [
      {
        type: 'inside'
      }
    ],
    series: [
      {
        type: 'bar',
        showBackground: true,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#83bff6' },
            { offset: 0.5, color: '#188df0' },
            { offset: 1, color: '#188df0' }
          ])
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#2378f7' },
              { offset: 0.7, color: '#2378f7' },
              { offset: 1, color: '#83bff6' }
            ])
          }
        },
        data: props.data
      }
    ] as echarts.SeriesOption
  }
  return options
})
</script>

<style lang="scss" scoped></style>
