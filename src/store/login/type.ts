/*
 * @Author: FatJun
 * @Date: 2022-02-13 23:42:47
 * @LastEditors: FatJun
 * @LastEditTime: 2022-04-05 12:00:32
 * @FilePath: /vue3-ts-cms/src/store/login/type.ts
 *
 * Copyright (c) 2022 by FatJun/Best, All Rights Reserved.
 */
/*
 * @Author: FatJun
 * @Date: 2022-02-13 23:42:47
 * @LastEditors: FatJun
 * @LastEditTime: 2022-02-15 10:48:16
 * @FilePath: /vue3-ts-cms/src/store/login/type.ts
 *
 * Copyright (c) 2022 by FatJun/Best, All Rights Reserved.
 */
import { IUserInfoResult, IUserMenusResult } from '@/services/login/type'
export interface ILoginStore {
  token: string
  name?: string
  userInfo: IUserInfoResult | undefined
  userMenus: IUserMenusResult[] | undefined
  permissions: string[]
}
