/*
 * @Author: FatJun
 * @Date: 2021-12-21 10:30:54
 * @LastEditors: FatJun
 * @LastEditTime: 2022-03-20 11:17:18
 * @FilePath: /vue3-ts-cms/src/main.ts
 *
 * Copyright (c) 2022 by FatJun/Best, All Rights Reserved.
 */
import 'element-plus/lib/theme-chalk/base.css'
import './services/axios-demo'

import { createApp } from 'vue'
import { registerApp } from '@/global'
import { reloadStore } from './store'
import mRequestInstance from './services'
import 'normalize.css'
import '@/assets/css/index.less'

import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)
reloadStore()

app.use(store).use(router).use(registerApp).mount('#app')

// mRequestInstance.get({
//   url: 'top/mv',
//   method: 'GET',
//   //请求进行个性化拦截
//   interceptors: {
//     requestInterceptor(config) {
//       return config
//     },
//     responseInterceptor(config) {
//       return config
//     }
//   },
//   showLoading: true
// })

console.log(process.env.VUE_APP_NAME)
