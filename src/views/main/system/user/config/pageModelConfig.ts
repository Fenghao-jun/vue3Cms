import { IFrom } from '@/base-ui/from'
import { IUserList } from '@/services/main/system/types'
export const pageModelConfig: IFrom<IUserList> = {
  fromItems: [
    {
      field: 'name',
      label: '姓名',
      type: 'input',
      placeholder: '请输入姓名'
    },
    {
      field: 'realname',
      label: '真实姓名',
      type: 'input',
      placeholder: '请输入真实姓名'
    },
    {
      field: 'password',
      label: '密码',
      type: 'password',
      placeholder: '请输入密码',
      hidden: false
    },
    {
      field: 'cellphone',
      label: '电话',
      type: 'input',
      placeholder: '请输入电话'
    },
    {
      field: 'departmentId',
      label: '部门',
      type: 'select',
      options: []
    },
    {
      field: 'roleId',
      label: '角色',
      type: 'select',
      options: []
    }
  ],
  colLayout: {
    span: 24
  },
  itemStyle: {}
}
