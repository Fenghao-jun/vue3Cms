import {
  ICategoryGoodsCount,
  IAddressGoodsSale,
  ICategoryGoodsFavor,
  ICategoryGoodsSale
} from '@/services/main/analysis'
export interface IDashboardState {
  categoryGoodsCount: ICategoryGoodsCount[]
  categoryGoodsSale: ICategoryGoodsSale[]
  categoryGoodsFavor: ICategoryGoodsFavor[]
  addressGoodsSale: IAddressGoodsSale[]
}
