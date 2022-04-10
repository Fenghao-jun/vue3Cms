import type { TableColumn } from '@/base-ui/table'
import { IPageContent } from '@/components/page-content/type/type'
import { IUserList } from '@/services/main/system/types'
import { IGoodsList } from '../../../../../store/main/system/type'

export const goodsTableColumns: TableColumn<IGoodsList> = [
  {
    prop: 'name',
    label: '名称',
    minWidth: '100px',
    align: 'center',
    showOverflowTooltip: true
  },
  {
    prop: 'imgUrl',
    label: '图片',
    minWidth: '100px',
    align: 'center',
    slotName: 'img'
  },
  {
    prop: 'oldPrice',
    label: '原价格',
    minWidth: '100px',
    align: 'center',
    slotName: 'oldPrice'
  },
  {
    prop: 'newPrice',
    label: '价格',
    minWidth: '100px',
    align: 'center',
    slotName: 'newPrice'
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

export const goodsPageContentConfig: IPageContent = {
  propList: goodsTableColumns,
  showIndexColumn: true,
  showSelectColumn: true
}
