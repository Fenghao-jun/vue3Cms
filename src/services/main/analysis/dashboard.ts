import mRequestInstance from '@/services'
import { IDataResult } from '../../type'
import {
  ICategoryGoodsCount,
  ICategoryGoodsSale,
  ICategoryGoodsFavor,
  IAddressGoodsSale
} from './type'
enum DashboardAPI {
  categoryGoodsCount = '/goods/category/count',
  categoryGoodsSale = '/goods/category/sale',
  categoryGoodsFavor = '/goods/category/favor',
  addressGoodsSale = '/goods/address/sale'
}

export function getCategoryGoodsCount() {
  return mRequestInstance.get<IDataResult<Array<ICategoryGoodsCount>>>({
    url: DashboardAPI.addressGoodsSale
  })
}
export function getCategoryGoodsSale() {
  return mRequestInstance.get<IDataResult<Array<ICategoryGoodsSale>>>({
    url: DashboardAPI.categoryGoodsSale
  })
}
export function getCategoryGoodsFavor() {
  return mRequestInstance.get<IDataResult<Array<ICategoryGoodsFavor>>>({
    url: DashboardAPI.categoryGoodsFavor
  })
}
export function getAddressGoodsSale() {
  return mRequestInstance.get<IDataResult<Array<IAddressGoodsSale>>>({
    url: DashboardAPI.addressGoodsSale
  })
}
