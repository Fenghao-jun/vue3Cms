<template>
  <div class="dashboard">
    <h2>dashboard</h2>
    <div ref="divRef" :style="{ height: '400px', width: '700px' }"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import * as eCharts from 'echarts'

export default defineComponent({
  name: 'dashboard',
  setup() {
    const divRef = ref<HTMLDivElement>()
    onMounted(() => {
      //初始化
      const eChartsInstance = eCharts.init(divRef.value!, 'dark')
      // 指定图表的配置项和数据
      const option = {
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      }
      //更新数据
      eChartsInstance.setOption(option)
    })
    return { divRef }
  }
})
</script>

<style scoped></style>
