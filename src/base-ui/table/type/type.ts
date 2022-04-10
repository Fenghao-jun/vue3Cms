import { TableColumnCtx } from 'element-plus/lib/el-table/src/table-column/defaults'

export type TableColumn<T = any> = Partial<ITableColumn<T>>[]

interface ITableColumn<T = any> extends Omit<TableColumnCtx<T>, 'prop'> {
  prop?: keyof T
  slotName?: string
}

export interface ITableProps {
  title?: string
  propList?: TableColumn
  showIndexColumn?: boolean
  showSelectColumn?: boolean
}
