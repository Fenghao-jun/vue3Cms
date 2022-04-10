<template>
  <div class="login-account">
    <el-form :rules="rules" :model="account" ref="elFormRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input show-password v-model="account.password" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { rules } from '../config/account-config'
import { ElForm } from 'element-plus'
import LocalCache from '@/utils/cache'

export default defineComponent({
  setup() {
    const account = reactive({
      name: LocalCache.getLocal('name'),
      password: LocalCache.getLocal('password')
    })
    const store = useStore()

    const elFormRef = ref<InstanceType<typeof ElForm>>()
    const loginAccount = (isKeepPassWord: boolean) => {
      elFormRef.value?.validate((valid) => {
        if (valid) {
          //是否需要记住密码
          if (isKeepPassWord) {
            console.log('需要记密码')
            LocalCache.setLocal('name', account.name)
            LocalCache.setLocal('password', account.password)
          } else {
            LocalCache.deletedLocal('name')
            LocalCache.deletedLocal('password')
          }
          store.dispatch('login/accountLoginAction', { ...account })
          console.log('正在登陆')
        } else {
          console.log('验证不通过')
        }
      })
    }
    return {
      account,
      rules,
      loginAccount,
      elFormRef
    }
  }
})
</script>

<style scoped></style>
