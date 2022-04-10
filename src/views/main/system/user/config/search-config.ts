/*
 * @Author: FatJun
 * @Date: 2022-03-20 17:37:14
 * @LastEditors: FatJun
 * @LastEditTime: 2022-03-31 16:57:02
 * @FilePath: /vue3-ts-cms/src/views/main/system/user/config/search-config.ts
 *
 * Copyright (c) 2022 by FatJun/Best, All Rights Reserved.
 */
import { IFrom } from '@/base-ui/from/type'
import { IUserList } from '../../../../../services/main/system/types'
export const searchFromConfig: IFrom<IUserList> = {
  fromItems: [
    {
      field: 'id',
      type: 'input',
      label: 'id',
      placeholder: '请输入id'
    },
    {
      field: 'name',
      type: 'input',
      label: '用户名',
      placeholder: '请输入用户名'
    },
    {
      field: 'realname',
      type: 'input',
      label: '真实姓名',
      placeholder: '请输入真实姓名'
    },
    {
      field: 'cellphone',
      type: 'input',
      label: '电话号码',
      placeholder: '请输入电话号码'
    },
    {
      field: 'enable',
      type: 'select',
      label: '用户状态',
      placeholder: '请选择用户状态',
      options: [
        { title: '启用', value: 1 },
        { title: '禁用', value: 0 }
      ]
    },
    {
      field: 'createAt',
      type: 'datePicker',
      label: '创建时间',
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
