<template>
  <div class="page-model">
    <el-dialog
      v-model="centerDialogVisible"
      title="Warning"
      width="30%"
      center
      destroy-on-close
    >
      <hj-from v-bind="pageModelConfig" v-model="fromData"></hj-from>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="centerDialogVisible = false"
            >确定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, PropType } from 'vue'
import HjFrom, { IFrom } from '@/base-ui/from/index'

export default defineComponent({
  components: {
    HjFrom
  },
  props: {
    pageModelConfig: {
      type: Object as PropType<IFrom>,
      default: () => ({})
    },
    defaultInfo: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const centerDialogVisible = ref(false)
    const fromData = ref<{ [index: string]: any }>({})

    watch(
      () => props.defaultInfo,
      (nValue) => {
        console.log('nValue: ', nValue)
        fromData.value = nValue
      }
    )

    return {
      centerDialogVisible,
      fromData
    }
  }
})
</script>

<style scoped></style>
