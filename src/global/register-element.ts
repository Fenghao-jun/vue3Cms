/*
 * @Author: FatJun
 * @Date: 2022-01-01 21:40:35
 * @LastEditors: FatJun
 * @LastEditTime: 2022-04-12 00:21:43
 * @FilePath: /vue3-ts-cms/src/global/register-element.ts
 *
 * Copyright (c) 2022 by FatJun/Best, All Rights Reserved.
 */
import 'element-plus/lib/theme-chalk/base.css'
import type { App } from 'vue'
import {
  ElButton,
  ElAlert,
  ElInput,
  ElRadio,
  ElForm,
  ElFormItem,
  ElSelectV2,
  ElTabs,
  ElTabPane,
  ElCheckbox,
  ElLink,
  ElContainer,
  ElAside,
  ElHeader,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElSubmenu,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElAvatar,
  ElRow,
  ElCol,
  ElDatePicker,
  ElSelect,
  ElOption,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElTable,
  ElTableColumn,
  ElTag,
  ElPagination,
  ElImage,
  ElDialog,
  ElTree
} from 'element-plus'

const components = [
  ElFormItem,
  ElInput,
  ElAlert,
  ElButton,
  ElRadio,
  ElForm,
  ElSelectV2,
  ElTabs,
  ElTabPane,
  ElCheckbox,
  ElLink,
  ElContainer,
  ElAside,
  ElHeader,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElSubmenu,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElAvatar,
  ElRow,
  ElCol,
  ElDatePicker,
  ElSelect,
  ElOption,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElTable,
  ElTableColumn,
  ElTag,
  ElPagination,
  ElImage,
  ElDialog,
  ElTree
]

export function registerEl(app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}
