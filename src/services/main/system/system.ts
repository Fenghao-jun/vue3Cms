import mRequestInstance from '@/services'
import { IDataResult } from '../../type'
import { IUserListResData } from './types'

export function getPageListData(url: string, pageInfo: any) {
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
