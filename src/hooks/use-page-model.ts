import pageModel from '@/components/page-model/index'
import { ref } from 'vue'

type handleCbFn = (data?: any) => void

export function usePageModel(createCb?: handleCbFn, updateCb?: handleCbFn) {
  const pageModelRef = ref<InstanceType<typeof pageModel>>()
  const defaultInfo = ref<any>({})
  const handleCreateClick = () => {
    defaultInfo.value = {}
    if (pageModelRef.value) {
      pageModelRef.value.centerDialogVisible = true
    }
    //回调
    createCb && createCb()
  }
  const handleUpdateClick = (item: any) => {
    defaultInfo.value = { ...item }
    console.log('defaultInfo: ', defaultInfo)
    if (pageModelRef.value) {
      pageModelRef.value.centerDialogVisible = true
    }
    //回调
    updateCb && updateCb(item)
  }

  return {
    pageModelRef,
    defaultInfo,
    handleCreateClick,
    handleUpdateClick
  }
}
