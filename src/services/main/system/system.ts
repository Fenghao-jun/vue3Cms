import mRequestInstance from '@/services'
import { IDataResult } from '../../type'

export function getPageListData(url: string, pageInfo?: any) {
  return mRequestInstance.post<IDataResult<any>>({
    url: url,
    data: pageInfo
  })
}

export function deletedPageData(url: string) {
  return mRequestInstance.delete<IDataResult<any>>({
    url: url
  })
}

export function createPageData(url: string, data: any) {
  return mRequestInstance.post<IDataResult<any>>({
    url: url,
    data: data
  })
}

export function updatePageData(url: string, data: any) {
  return mRequestInstance.patch<IDataResult<any>>({
    url: url,
    data: data
  })
}
