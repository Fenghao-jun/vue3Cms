import pageModel from '@/components/page-model/index'
import { Ref, ref } from 'vue'

type handleCbFn = (data?: any) => void

/**
 * @description: 搭配组件 page-model 使用
 * @param {handleCbFn} createCb 新建功能时需要使用的回调函数
 * @param {handleCbFn} updateCb 修改功能时需要使用的回调函数
 * @return {*}
 */
export function usePageModel(createCb?: handleCbFn, updateCb?: handleCbFn) {
  const pageModelRef = ref<InstanceType<typeof pageModel>>()
  const defaultInfo = ref<any>({})
  //创建时的处理
  const handleCreateClick = () => {
    defaultInfo.value = {}
    if (pageModelRef.value) {
      pageModelRef.value.centerDialogVisible = true
    }
    //回调
    createCb && createCb()
  }
  //更新时的处理
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
