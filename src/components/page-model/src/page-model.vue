<template>
  <div class="page-model">
    <el-dialog
      v-model="centerDialogVisible"
      title="Warning"
      width="30%"
      center
      destroy-on-close
    >
      <hj-from v-bind="pageModelConfig" v-model="fromData"> </hj-from>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, PropType } from 'vue'
import { useStore } from '@/store'

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
    },
    pageName: {
      type: String,
      required: true
    }
  },
  setup(props) {
    //!监听数据相关
    const centerDialogVisible = ref(false)
    const fromData: any = ref<{ [index: string]: any }>({})
    watch(
      () => props.defaultInfo,
      (nValue: any) => {
        console.log('nValue: ', nValue)
        // fromData.value = nValue
        for (const item of props.pageModelConfig.fromItems) {
          console.log(item)
          fromData.value[`${item.field as string}`] =
            nValue[`${item.field as string}`]
        }
      }
    )

    //!请求相关
    const store = useStore()
    const handleConfirmClick = () => {
      if (Object.keys(props.defaultInfo).length) {
        console.log('当前是修改，因为有id')
        store.dispatch('system/updatePageData', {
          pageName: props.pageName,
          pageInfo: { ...fromData.value, id: props.defaultInfo.id }
        })
      } else {
        console.log('当前是新增，因为没有id')
        store.dispatch('system/createPageDataAction', {
          pageName: props.pageName,
          pageInfo: { ...fromData.value }
        })
      }
      centerDialogVisible.value = false
    }
    //!第二层封装

    return {
      centerDialogVisible,
      fromData,
      handleConfirmClick
    }
  }
})
</script>

<style scoped></style>
