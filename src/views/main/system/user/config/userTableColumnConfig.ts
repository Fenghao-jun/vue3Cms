import type { TableColumn } from '@/base-ui/table'
import { IPageContent } from '@/components/page-content/type/type'
import { IUserList } from '@/services/main/system/types'

export const userTableColumns: TableColumn<IUserList> = [
  {
    prop: 'name',
    label: '名称',
    minWidth: '100px',
    align: 'center'
  },
  {
    prop: 'realname',
    label: '真实名称',
    minWidth: '100px',
    align: 'center'
  },
  {
    prop: 'enable',
    label: '状态',
    minWidth: '100px',
    align: 'center',
    slotName: 'status'
  },
  {
    prop: 'cellphone',
    label: '电话',
    minWidth: '100px',
    align: 'center'
  },
  {
    prop: 'createAt',
    label: '创建时间',
    minWidth: '100px',
    align: 'center',
    slotName: 'createAt'
  },
  {
    prop: 'updateAt',
    label: '更新时间',
    minWidth: '100px',
    align: 'center',
    slotName: 'updateAt'
  },
  {
    label: '操作',
    minWidth: '100px',
    align: 'center',
    slotName: 'handle'
  }
]

export function getPageContentConfig(): IPageContent {
  return {
    propList: userTableColumns
  }
}

export const userPageContentConfig: IPageContent = {
  propList: userTableColumns
}
