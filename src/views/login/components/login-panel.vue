<!--
 * @Author: FatJun
 * @Date: 2022-02-09 12:01:02
 * @LastEditors: FatJun
 * @LastEditTime: 2022-03-27 00:46:35
 * @FilePath: /vue3-ts-cms/src/views/login/components/login-panel.vue
 *
 * Copyright (c) 2022 by FatJun/Best, All Rights Reserved.
-->
<template>
  <div class="login-panel">
    <h2 class="title">后台管理系统</h2>
    <el-tabs type="border-card" stretch v-model="currentPane">
      <el-tab-pane name="account">
        <template #label>
          <span><i class="el-icon-user-solid"></i> 账号登陆</span>
        </template>
        <login-account ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span><i class="el-icon-mobile-phone"></i> 手机登陆</span>
        </template>
        <login-phone ref="phoneRef" />
      </el-tab-pane>
    </el-tabs>

    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>

    <el-button type="primary" class="login-button" @click="login">
      立即登陆
    </el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'
type test = InstanceType<typeof LoginAccount>

export default defineComponent({
  components: {
    LoginAccount,
    LoginPhone
  },
  setup() {
    const isKeepPassword = ref(true)
    const currentPane = ref('account')

    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const phoneRef = ref<InstanceType<typeof LoginPhone>>()

    const login = () => {
      if (currentPane.value === 'account') {
        accountRef.value?.loginAccount(isKeepPassword.value)
      } else {
        phoneRef.value?.loginPhone()
      }
    }
    return {
      isKeepPassword,
      accountRef,
      phoneRef,
      login,
      currentPane
    }
  }
})
</script>

<style scoped lang="less">
.el-tabs {
  width: 320px;
}
.title {
  text-align: center;
}

.account-control {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}

.login-button {
  width: 100%;
  margin-top: 10px;
}
</style>
