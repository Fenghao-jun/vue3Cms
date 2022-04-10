import { IUserMenusResult } from '@/services/login/type'
import { IUserList } from '@/services/main/system/types'
export interface ISystemModule {
  [index: string]: any
  userList: IUserList[]
  userCount: number
  roleList: IRoleList[]
  roleCount: number
  goodsList: IGoodsList[]
  goodsCount: number
  menuList: IUserMenusResult[]
  menuCount: number
  test: any
}

export interface ISystemListDataParams {
  pageName: string
  pageInfo: any
}

export interface IListUrlConfig {
  [index: string]: string
}

export interface IRoleList {
  id: number
  name: string
  intro: string
  createAt: string
  updateAt: string
  menuList: IUserMenusResult[]
}

export interface IGoodsList {
  id: number
  name: string
  oldPrice: string
  newPrice: string
  desc: string
  status: number
  imgUrl: string
  inventoryCount: number
  saleCount: number
  favorCount: number
  address: string
  categoryId: number
  createAt: string
  updateAt: string
}
