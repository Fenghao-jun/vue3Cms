/*
 * @Author: FatJun
 * @Date: 2022-03-03 17:51:53
 * @LastEditors: FatJun
 * @LastEditTime: 2022-03-03 17:51:53
 * @FilePath: /vue3-ts-cms/src/router/main/system/role/role.ts
 *
 * Copyright (c) 2022 by FatJun/Best, All Rights Reserved.
 */
const role = () => import('@/views/main/system/role/role.vue')

export default {
  path: '/main/system/role',
  name: 'role',
  component: role,
  children: []
}
