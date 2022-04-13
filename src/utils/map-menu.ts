/*
 * @Author: FatJun
 * @Date: 2022-03-04 16:54:52
 * @LastEditors: FatJun
 * @LastEditTime: 2022-04-13 11:31:50
 * @FilePath: /vue3-ts-cms/src/utils/map-menu.ts
 *
 * Copyright (c) 2022 by FatJun/Best, All Rights Reserved.
 */
import { RouteRecordRaw } from 'vue-router'
import { IUserMenusResult, IUserChildrenMenus } from '@/services/login/type'
import { IBreadcrumb } from '@/base-ui/bread-crumb'
import { IUserChildrenMenusPermission } from '../services/login/type'

type userMenusRow =
  | Array<IUserChildrenMenus>
  | Array<IUserMenusResult>
  | Array<IUserChildrenMenusPermission>

let firstMenu: any

export function mapMenuToRoute(
  userMenu: Array<IUserMenusResult>
): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  //加载全部路由
  const allRoutes: RouteRecordRaw[] = []
  //webpack函数
  //地址、是否deep递归查找、filter的正则
  const routerFilePath = require.context('../router/main', true, /\.ts/)
  routerFilePath.keys().forEach((item) => {
    //获取到对应地址，但是地址是对应着上面的'../router/main',需要需要拼接
    const path = require('../router/main' + item.split('.')[1])
    allRoutes.push(path.default)
  })

  /**
   * @description: 递归寻找二级菜单
   * @param {userMenusRow} menus
   * @return {*}
   */
  const _recuseGetRoute = (menus: userMenusRow) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) {
          routes.push(route)
        }
        if (!firstMenu) {
          firstMenu = menu
        }
      } else if (menu.type === 1) {
        _recuseGetRoute(menu.children ?? [])
      }
    }
  }

  _recuseGetRoute(userMenu)

  return routes
}

/**
 * @description: 匹配到当前路由地址的名字并返回数组
 * @param {userMenusRow} userMenus 全部菜单数据
 * @param {string} currentPath 当前路由地址
 * @return {Array<IBreadcrumb>} 面包屑数组
 */
export function pathMapToBreadcrumb(
  userMenus: userMenusRow,
  currentPath: string
): Array<IBreadcrumb> {
  const breadcrumbPath: Array<IBreadcrumb> = []
  pathMapToMenu(userMenus, currentPath, breadcrumbPath)
  return breadcrumbPath
}

export function pathMapToMenu(
  userMenus: userMenusRow,
  currentPath: string,
  breadcrumbPath?: Array<IBreadcrumb>
): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(
        menu.children ?? [],
        currentPath
      ) as IUserMenusResult
      //判断是否有值，有就返回
      if (findMenu) {
        if (breadcrumbPath) {
          breadcrumbPath.push({ name: menu.name })
          breadcrumbPath.push({ name: findMenu.name })
        }
        return findMenu
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}

export function mapMenusToPermissions(userMenus: userMenusRow) {
  const permissions: string[] = []

  //由于这里传入的类型中，按钮选项的类型已被确定为3，所以for循环中我们直接判断menu的type是否为3，不是3就是菜单
  const _recuseGetPermissions = (menus: userMenusRow) => {
    for (const menu of menus) {
      if (menu.type !== 3) {
        _recuseGetPermissions(menu.children ?? [])
      } else {
        permissions.push(menu.permission)
      }
    }
  }

  _recuseGetPermissions(userMenus)

  return permissions
}

export function getMenuLeaf(userMenus: userMenusRow) {
  const menuLeaf: number[] = []

  const _recuseGetLeaf = (menus: any) => {
    for (const menu of menus) {
      if (menu.children) {
        _recuseGetLeaf(menu.children)
      } else {
        menuLeaf.push(menu.id)
      }
    }
  }

  _recuseGetLeaf(userMenus)

  return menuLeaf
}

export { firstMenu }
