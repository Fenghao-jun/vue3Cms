/*
 * @Author: FatJun
 * @Date: 2022-03-03 17:49:54
 * @LastEditors: FatJun
 * @LastEditTime: 2022-03-03 17:50:55
 * @FilePath: /vue3-ts-cms/src/router/main/system/user/user.ts
 *
 * Copyright (c) 2022 by FatJun/Best, All Rights Reserved.
 */
const user = () => import('@/views/main/system/user/user.vue')

export default {
  path: '/main/system/user',
  name: 'user',
  component: user,
  children: []
}
