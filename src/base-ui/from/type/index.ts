/*
 * @Author: FatJun
 * @Date: 2022-03-20 12:35:01
 * @LastEditors: FatJun
 * @LastEditTime: 2022-04-07 09:59:43
 * @FilePath: /vue3-ts-cms/src/base-ui/from/type/index.ts
 *
 * Copyright (c) 2022 by FatJun/Best, All Rights Reserved.
 */
type FromItemType = 'select' | 'input' | 'datePicker' | 'password'
// import {} from 'e'

export interface IFromItem<T = any> {
  field: keyof T
  label: string
  rules?: any[]
  placeholder?: string
  type: FromItemType
  //为选项时必传
  options?: any[]
  //组件其他的选项
  otherOptions?: any
  //是否隐藏当前组件
  hidden?: boolean
}

export interface IFrom<T = any> {
  fromItems: IFromItem<T>[]
  labelWidth?: string
  itemStyle?: any
  colLayout?: any
}
