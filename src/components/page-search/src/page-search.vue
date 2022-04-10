<template>
  <div class="page-search">
    <hj-from v-bind="searchFromConfig" v-model="fromData" ref="fromRef">
      <template #header>
        <h1 class="form-header">高级检索</h1>
      </template>
      <template #footer>
        <div class="form-footer">
          <el-button icon="el-icon-refresh" @click="handleResetClick">
            重置
          </el-button>
          <el-button
            icon="el-icon-search"
            type="primary"
            @click="handleQueryClick"
            >搜索</el-button
          >
        </div>
      </template>
    </hj-from>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'
import HjFrom, { IFrom } from '@/base-ui/from/index'

export default defineComponent({
  props: {
    searchFromConfig: {
      type: Object as PropType<IFrom>,
      default: () => ({})
    }
  },
  components: {
    HjFrom
  },
  emits: ['resetBtnClick', 'queryBtnClick'],
  setup(props, { emit }) {
    //fromData内容根据传入的配置决定
    const fromItems = props.searchFromConfig.fromItems ?? []
    const fromOriginData: any = {}
    for (const item of fromItems) {
      fromOriginData[item.field] = ''
    }

    const fromData = ref(fromOriginData)

    const fromRef = ref()
    const handleResetClick = () => {
      fromData.value = fromOriginData
      emit('resetBtnClick')
      // for (const key in fromOriginData) {
      //   fromData.value[`${key}`] = fromOriginData[key]
      // }
      // fromRef.value.handleResetClick()
    }

    const handleQueryClick = () => {
      console.log('搜索')
      emit('queryBtnClick', fromData.value)
    }
    return {
      fromData,
      handleResetClick,
      handleQueryClick,
      fromRef,
      fromOriginData
    }
  }
})
</script>

<style scoped>
.form-header {
  color: red;
}
.form-footer {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
