/*
 * @Author: FatJun
 * @Date: 2022-02-14 16:12:51
 * @LastEditors: FatJun
 * @LastEditTime: 2022-04-05 13:02:45
 * @FilePath: /vue3-ts-cms/src/services/login/type.ts
 *
 * Copyright (c) 2022 by FatJun/Best, All Rights Reserved.
 */
//登陆部分
export interface IAccount {
  name: string
  password: string
}

export interface IAccountResult {
  id: number
  name: string
  token: string
}

export interface IUserInfoResult {
  id: number
  name: string
  realname: string
  cellphone: number
  enable: number
  createAt: string
  updateAt: string
  role: IUserInfoRole
  department: IUserInfoDepartment
}
//用户角色
interface IUserInfoDepartment {
  id: number
  name: string
  parentId?: any
  createAt: string
  updateAt: string
  leader: string
}

interface IUserInfoRole {
  id: number
  name: string
  intro: string
  createAt: string
  updateAt: string
}

//用户菜单
export interface IUserMenusResult {
  id: number
  name: string
  type: 1
  url: string
  icon: string
  sort: number
  children: IUserChildrenMenus[]
}

export interface IUserChildrenMenus {
  id: number
  url: string
  name: string
  sort: number
  type: 2
  children?: undefined | IUserChildrenMenusPermission[]
  parentId: number
}
export interface IUserChildrenMenusPermission {
  id: number
  url: null
  name: string
  sort: null
  type: 3
  createAt: string
  updateAt: string
  parentId: number
  permission: string
}
