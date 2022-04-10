import { IFrom } from '@/base-ui/from'
import { IRoleList } from '@/store/main/system/type'

export const rolePageModelConfig: IFrom<IRoleList> = {
  fromItems: [
    {
      field: 'name',
      label: '角色名称',
      type: 'input',
      placeholder: '请输入角色名称'
    },
    {
      field: 'intro',
      label: '角色描述',
      type: 'input',
      placeholder: '请输入角色描述'
    }
  ],
  colLayout: {
    span: 24
  },
  itemStyle: {}
}
