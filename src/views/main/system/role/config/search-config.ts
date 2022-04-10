import { IFrom } from '@/base-ui/from/type'
import { IRoleList } from '@/store/main/system/type'
export const searchFromConfig: IFrom<IRoleList> = {
  fromItems: [
    {
      field: 'name',
      label: '角色名称',
      rules: [],
      type: 'input',
      placeholder: '角色'
    },
    {
      field: 'intro',
      label: '权限',
      rules: [],
      type: 'input',
      placeholder: '权限'
    },
    {
      field: 'createAt',
      label: '创建日期',
      type: 'datePicker',
      otherOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange'
      }
    },
    {
      field: 'updateAt',
      label: '更新日期',
      type: 'datePicker',
      otherOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange'
      }
    }
  ],
  itemStyle: {
    padding: '10px 40px'
  },
  labelWidth: '100px'
}
