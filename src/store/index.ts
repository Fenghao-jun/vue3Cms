/*
 * @Author: FatJun
 * @Date: 2021-12-21 10:30:54
 * @LastEditors: FatJun
 * @LastEditTime: 2022-04-07 17:05:00
 * @FilePath: /vue3-ts-cms/src/store/index.ts
 *
 * Copyright (c) 2022 by FatJun/Best, All Rights Reserved.
 */
import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { IRootStore } from './type'
import login from './login/login'
import system from './main/system/system'
import { IStoreType } from './type'
import { getPageListData } from '../services/main/system/system'

const store = createStore<IRootStore>({
  state() {
    return {
      name: '',
      age: 0,
      entireDepartments: [],
      entireRoles: []
    }
  },
  mutations: {
    changeEntireDepartments(state, payload: any[]) {
      state.entireDepartments = payload
    },
    changeEntireRoles(state, payload: any[]) {
      state.entireRoles = payload
    }
  },
  actions: {
    async getInitializeOptions({ commit }) {
      //部门数据
      const {
        data: { list: entireDepartments }
      } = await getPageListData('/department/list', {
        offset: 0,
        size: 100
      })
      //角色数据
      const {
        data: { list: entireRoles }
      } = await getPageListData('/role/list', {
        offset: 0,
        size: 100
      })
      console.log('list: ', entireDepartments)
      commit('changeEntireDepartments', entireDepartments)
      commit('changeEntireRoles', entireRoles)
    }
  },
  modules: {
    login,
    system
  }
})

export function reloadStore() {
  store.dispatch('login/reloadLocalUserInfo')
  store.dispatch('getInitializeOptions')
}
//重写一个useStore，让返回的store附带上类型
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
