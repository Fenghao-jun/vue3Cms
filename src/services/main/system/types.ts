export interface IUserListResData {
  list: IUserList[]
  totalCount: number
}

export interface IUserList {
  id: number
  name: string
  realname: string
  cellphone: number
  enable: number
  departmentId: number
  roleId: number
  createAt: string
  updateAt: string
  password: string
}
