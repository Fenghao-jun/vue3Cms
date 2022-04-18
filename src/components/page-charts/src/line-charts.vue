<template>
  <div class="line-charts">
    <base-echarts :options="lineOptionComputed" />
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import baseEcharts from '@/base-ui/echarts'
import { EChartsOption } from 'echarts'

interface ILineChartsProps {
  xAxisData: any[]
  data: any[]
  title: string
}
const props = defineProps<ILineChartsProps>()

const lineOptionComputed = computed(() => {
  const options: EChartsOption = {
    title: {
      text: props.title
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {},
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: props.xAxisData
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: props.title,
        type: 'line',
        stack: 'Total',
        data: props.data,
        smooth: true
      }
    ]
  }
  return options
})
</script>

<style lang="scss" scoped></style>
