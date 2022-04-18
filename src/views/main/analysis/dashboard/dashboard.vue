<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <hj-card title="分类商品数量(饼图)">
          <pie-charts :data="categoryCountComputed" />
        </hj-card>
      </el-col>
      <el-col :span="10">
        <hj-card title="不同城市商品销量"></hj-card>
      </el-col>
      <el-col :span="7">
        <hj-card title="分类商品数量(玫瑰图)">
          <rose-charts :data="categoryCountComputed" />
        </hj-card>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="dashboard-content">
      <el-col :span="12">
        <hj-card title="分类商品的销量"></hj-card>
      </el-col>
      <el-col :span="12">
        <hj-card title="分类商品的收藏">
          <line-charts v-bind="categoryFavorComputed" />
        </hj-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store'
import hjCard from '@/base-ui/card/index'
import type {
  ICategoryGoodsCount,
  ICategoryGoodsSale
} from '@/services/main/analysis'
import { pieCharts, roseCharts, lineCharts } from '@/components/page-charts'

export default defineComponent({
  name: 'dashboard',
  components: {
    hjCard,
    pieCharts,
    roseCharts,
    lineCharts
  },
  setup() {
    const store = useStore()
    store.dispatch('dashboard/getDashboardDataAction')
    const categoryCountComputed = computed(() => {
      return store.state.dashboard.categoryGoodsSale.map(
        (item: ICategoryGoodsSale) => {
          console.log('item: ', item)
          return { name: item.name, value: item.goodsCount }
        }
      )
    })

    const categoryFavorComputed = computed(() => {
      const xAxisData: string[] = []
      const data: number[] = []
      const favor = store.state.dashboard.categoryGoodsSale
      for (const item of favor) {
        xAxisData.push(item.name)
        data.push(item.goodsCount)
      }
      return {
        xAxisData,
        data
      }
    })

    return {
      categoryCountComputed,
      categoryFavorComputed
    }
  }
})
</script>

<style scoped>
.dashboard-content {
  margin-top: 10px;
}
</style>
