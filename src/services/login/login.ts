/*
 * @Author: FatJun
 * @Date: 2022-02-14 16:12:47
 * @LastEditors: FatJun
 * @LastEditTime: 2022-02-15 09:59:42
 * @FilePath: /vue3-ts-cms/src/services/login/login.ts
 *
 * Copyright (c) 2022 by FatJun/Best, All Rights Reserved.
 */
import mRequestInstance from '..'
import type { IAccount, IAccountResult, IUserMenusResult } from './type'
import { IDataResult } from '../type'
import { IUserInfoResult } from './type'
enum LoginApi {
  AccountLogin = 'login',
  UserInfo = 'users/',
  UserMenus = 'role/'
}

export function loginAccountRequest(data: IAccount) {
  return mRequestInstance.post<IDataResult<IAccountResult>>({
    url: LoginApi.AccountLogin,
    showLoading: true,
    data
  })
}

export function requestUserInfoById(id: number) {
  return mRequestInstance.get<IDataResult<IUserInfoResult>>({
    url: LoginApi.UserInfo + id,
    showLoading: false
  })
}

export function requestUserMenusById(id: number) {
  return mRequestInstance.get<IDataResult<IUserMenusResult>>({
    url: LoginApi.UserMenus + id + '/menu',
    showLoading: false
  })
}
