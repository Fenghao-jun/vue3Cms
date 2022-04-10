/*
 * @Author: OBKoro1
 * @Date: 2022-02-13 23:42:43
 * @LastEditors: FatJun
 * @LastEditTime: 2022-04-05 23:48:25
 * @FilePath: /vue3-ts-cms/src/store/login/login.ts
 *
 * Copyright (c) 2022 by 用户/公司名, All Rights Reserved.
 */
import router from '@/router'
import type { Module } from 'vuex'
import type { IRootStore } from '../type'
import type { ILoginStore } from './type'
import type { IAccount } from '@/services/login/type'
import {
  loginAccountRequest,
  requestUserInfoById,
  requestUserMenusById
} from '@/services/login/login'
import localCache from '@/utils/cache'
import { mapMenuToRoute } from '@/utils/map-menu'
import { IUserInfoResult, IUserMenusResult } from '../../services/login/type'
import { mapMenusToPermissions } from '../../utils/map-menu'

const store: Module<ILoginStore, IRootStore> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: undefined,
      userMenus: undefined,
      permissions: []
    }
  },
  getters: {},
  mutations: {
    /**
     * @description:
     * @param {*} state
     * @param {string} token
     * @return {*}
     */
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, payload: IUserInfoResult) {
      state.userInfo = payload
    },
    changeUserMenus(state, payload: IUserMenusResult[]) {
      state.userMenus = payload
      const routers = mapMenuToRoute(payload)
      routers.forEach((route) => {
        router.addRoute('main', route)
      })
      // 获取用户按钮权限
      const permissions = mapMenusToPermissions(payload)
      console.log('permissions: ', permissions)
      state.permissions = permissions
    }
  },
  actions: {
    /**
     * @description: 账号登陆逻辑
     * @param {*} param1
     * @param {IAccount} payload
     * @return {*}
     */
    async accountLoginAction({ commit, dispatch }, payload: IAccount) {
      console.log('accountLoginAction: ', payload)
      //登陆
      const accountRes = await loginAccountRequest(payload)
      const { id, token } = accountRes.data
      localCache.setLocal('token', token)
      commit('changeToken', token)

      //获取选项
      dispatch('getInitializeOptions', null, { root: true })

      //获取用户信息
      const userInfoRes = await requestUserInfoById(id)
      const userInfo = userInfoRes.data
      localCache.setLocal('userInfo', userInfo)
      commit('changeUserInfo', userInfo)
      //获取用户菜单
      const userMenusRes = await requestUserMenusById(userInfo.role.id)
      const userMenus = userMenusRes.data
      localCache.setLocal('userMenus', userMenus)
      commit('changeUserMenus', userMenus)
      //跳转
      router.push('/main')
    },
    /**
     * @description: 手机登陆逻辑
     * @param {*} param1
     * @param {any} payload
     * @return {*}
     */
    phoneLoginAction({ commit }, payload: any) {
      console.log('phoneLoginAction: ', payload)
    },
    reloadLocalUserInfo({ commit, dispatch }) {
      const token = localCache.getLocal('token')
      if (token) {
        commit('changeToken', token)
        dispatch('getInitializeOptions', null, { root: true })
      }
      const userInfo = localCache.getLocal('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localCache.getLocal('userMenus')
      if (token) {
        commit('changeUserMenus', userMenus)
      }
    }
  }
}

export default store
