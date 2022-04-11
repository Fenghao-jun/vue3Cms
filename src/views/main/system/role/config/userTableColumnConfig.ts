import type { TableColumn } from '@/base-ui/table'
import { IPageContent } from '@/components/page-content/type/type'
import { IRoleList } from '@/store/main/system/type'

export const roleTableColumns: TableColumn<IRoleList> = [
  {
    prop: 'name',
    label: '角色',
    minWidth: '100px',
    align: 'center'
  },
  {
    prop: 'intro',
    label: '角色描述',
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

export const rolePageContentConfig: IPageContent = {
  propList: roleTableColumns,
  showIndexColumn: true,
  showSelectColumn: true
}
