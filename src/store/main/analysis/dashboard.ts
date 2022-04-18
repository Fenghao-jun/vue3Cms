import { Module } from 'vuex'
import { IDashboardState } from './type'
import { IRootStore } from '../../type'

import {
  getAddressGoodsSale,
  getCategoryGoodsCount,
  getCategoryGoodsFavor,
  getCategoryGoodsSale,
  ICategoryGoodsCount,
  ICategoryGoodsSale,
  ICategoryGoodsFavor,
  IAddressGoodsSale
} from '@/services/main/analysis'
const dashboard: Module<IDashboardState, IRootStore> = {
  namespaced: true,
  state: {
    categoryGoodsCount: [],
    categoryGoodsFavor: [],
    categoryGoodsSale: [],
    addressGoodsSale: []
  },
  mutations: {
    changeCategoryGoodsCount(state, list: ICategoryGoodsCount[]) {
      state.categoryGoodsCount = list
    },
    changeCategoryGoodsSale(state, list: ICategoryGoodsSale[]) {
      state.categoryGoodsSale = list
    },
    changeCategoryGoodsFavor(state, list: ICategoryGoodsFavor[]) {
      state.categoryGoodsFavor = list
    },

    changeAddressGoodsSale(state, list: IAddressGoodsSale[]) {
      state.addressGoodsSale = list
    }
  },
  actions: {
    async getDashboardDataAction({ commit }) {
      const { data: categoryGoodsCount } = await getCategoryGoodsCount()
      commit('changeCategoryGoodsCount', categoryGoodsCount)
      const { data: categoryGoodsSale } = await getCategoryGoodsSale()
      commit('changeCategoryGoodsSale', categoryGoodsSale)
      const { data: categoryGoodsFavor } = await getCategoryGoodsFavor()
      commit('changeCategoryGoodsFavor', categoryGoodsFavor)

      const { data: addressGoodsSale } = await getAddressGoodsSale()
      commit('changeAddressGoodsSale', addressGoodsSale)
    }
  }
}

export default dashboard
