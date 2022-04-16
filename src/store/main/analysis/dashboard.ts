import { Module } from 'vuex'
import { IDashboardState } from './type'
import { IRootStore } from '../../type'
const dashboard: Module<IDashboardState, IRootStore> = {
  state: {
    analysisData: []
  }
}

export default dashboard
