import { ref } from 'vue'
import pageContent from '@/components/page-content'

export function usePageSearch() {
  const pageContentRef = ref<InstanceType<typeof pageContent>>()

  const handleResetClick = () => {
    pageContentRef.value?.getPageContent()
  }

  const handleQueryClick = (queryInfo: any) => {
    console.log('queryInfo: ', queryInfo)

    pageContentRef.value?.getPageContent(queryInfo)
  }

  return {
    pageContentRef,
    handleQueryClick,
    handleResetClick
  }
}
