/*
 * @Author: FatJun
 * @Date: 2022-01-04 10:18:01
 * @LastEditors: FatJun
 * @LastEditTime: 2022-04-10 15:06:22
 * @FilePath: /vue3-ts-cms/src/services/index.ts
 *
 * Copyright (c) 2022 by FatJun/Best, All Rights Reserved.
 */
import MRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'
import LocalCache from '@/utils/cache'

const mRequestInstance = new MRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  //实例进行个性化拦截
  interceptors: {
    requestInterceptor(config) {
      const token = LocalCache.getLocal('token')
      if (token) {
        if (config.headers !== undefined) {
          config.headers.Authorization = `Bearer ${token}`
        }
      }
      return config
    },
    requestInterceptorCatch(config) {
      return config
    },
    responseInterceptor(config) {
      return config
    },
    responseInterceptorCatch(config) {
      return config
    }
  }
})

export default mRequestInstance
