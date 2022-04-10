import { Module } from 'vuex'
import {
  ISystemModule,
  ISystemListDataParams,
  IListUrlConfig,
  IRoleList
} from './type'
import { IRootStore } from '../../type'
import {
  getPageListData,
  deletedPageData
} from '../../../services/main/system/system'
import { IUserList } from '../../../services/main/system/types'
import { IGoodsList } from './type'
import {
  IUserChildrenMenus,
  IUserMenusResult
} from '../../../services/login/type'

const listUrlConfigMap: IListUrlConfig = {
  users: '/users/list',
  role: '/role/list',
  goods: '/goods/list',
  menu: '/menu/list'
}
const systemModule: Module<ISystemModule, IRootStore> = {
  namespaced: true,
  state() {
    return {
      userList: [],
      userCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0,
      test: undefined
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return state[`${pageName}List`]
      }
    },
    pageListCount(state) {
      return (pageName: string) => {
        return state[`${pageName}Count`]
      }
    }
  },
  mutations: {
    changeUsersList(state, payload: IUserList[]) {
      state.usersList = payload
    },
    changeUsersCount(state, payload: number) {
      state.usersCount = payload
    },
    changeRoleList(state, payload: IRoleList[]) {
      state.roleList = payload
    },
    changeRoleCount(state, payload: number) {
      state.roleCount = payload
    },
    changeGoodsList(state, payload: IGoodsList[]) {
      state.goodsList = payload
    },
    changeGoodsCount(state, payload: number) {
      state.goodsCount = payload
    },
    changeMenuList(state, payload: IUserMenusResult[]) {
      state.menuList = payload
    },
    changeMenuCount(state, payload: number) {
      state.menuCount = payload
    },
    changePageInfo(state, { name, value }) {
      //!这种写法如果在模块中使用到getter将会使getter的数据是无法响应式
      state[name] = value
    }
  },
  actions: {
    /**
     * @description: 请求页面数据
     * @param {*} param1
     * @param {ISystemListDataParams} payload
     * @return {*}
     */
    async getPageListAction({ commit }, payload: ISystemListDataParams) {
      const { pageName, pageInfo } = payload

      const pageListRes = await getPageListData(
        listUrlConfigMap[pageName],
        pageInfo
      )

      const changePageName =
        pageName.slice(0, 1).toUpperCase() + pageName.slice(1)
      const { list, totalCount } = pageListRes.data

      commit(`change${changePageName}List`, list)
      commit(`change${changePageName}Count`, totalCount)

      //!不能使用这种方式来修改数据，否则getter中的响应式将无法得到更新，从而无法获取到更新后的数据
      // commit('changePageInfo', { name: `${pageName}List`, value: list })
      // commit('changePageInfo', {
      //   name: `${changePageName}Count`,
      //   value: totalCount
      // })
    },
    /**
     * @description: 删除页面数据
     * @param {*} param1
     * @param {ISystemListDataParams} payload
     * @return {*}
     */
    async deletePageDataAction({ dispatch }, payload: ISystemListDataParams) {
      const { pageName, pageInfo } = payload
      const { id } = pageInfo
      const pageUrl = `/${pageName}/${id}`
      const res = await deletedPageData(pageUrl)
      console.log('res: ', res)
      //!成功后重新请求页面数据
      dispatch('getPageListAction', {
        pageName,
        pageInfo: {
          offset: 0,
          size: 5
        }
      })
    }
  }
}

export default systemModule
