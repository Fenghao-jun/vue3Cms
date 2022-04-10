import { TableColumn } from '../../../base-ui/table/type/type'
import { ElTable } from 'element-plus'
type ElTable = InstanceType<typeof ElTable>

export interface IPageContent {
  title?: string
  propList?: TableColumn
  showIndexColumn?: boolean
  showSelectColumn?: boolean
  treeConfig?: ITreeProps
}

interface ITreeProps {
  rowKey?: ElTable['rowKey']
  treeProps: Partial<ElTable['treeProps']>
}
