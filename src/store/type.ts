import { ILoginStore } from './login/type'
import { ISystemModule } from './main/system/type'
import { IDashboardState } from './main/analysis/type'
export interface IRootStore {
  name: string
  age: number
  entireDepartments: any[]
  entireRoles: any[]
  entireMenuList: any[]
}

export interface IRootStoreWithModule {
  login: ILoginStore
  system: ISystemModule
  dashboard: IDashboardState
}

export type IStoreType = IRootStore & IRootStoreWithModule
