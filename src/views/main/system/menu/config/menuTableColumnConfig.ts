import type { TableColumn } from '@/base-ui/table'
import { IPageContent } from '@/components/page-content/type/type'
import { IUserChildrenMenusPermission } from '@/services/login/type'

export const menuTableColumns: TableColumn<IUserChildrenMenusPermission> = [
  {
    prop: 'name',
    label: '菜单名称',
    minWidth: '100px',
    align: 'center'
  },
  {
    prop: 'type',
    label: '类型',
    minWidth: '100px',
    align: 'center',
    slotName: 'status'
  },
  {
    prop: 'url',
    label: '菜单url',
    minWidth: '100px',
    align: 'center'
  },

  {
    prop: 'permission',
    label: '按钮权限',
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

export const menuPageContentConfig: IPageContent = {
  propList: menuTableColumns,
  treeConfig: {
    rowKey: 'id',
    treeProps: {
      children: 'children'
    }
  }
}
