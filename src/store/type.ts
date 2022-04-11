import { ILoginStore } from './login/type'
import { ISystemModule } from './main/system/type'
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
}

export type IStoreType = IRootStore & IRootStoreWithModule
