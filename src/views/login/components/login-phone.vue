<template>
  <div class="login-phone">
    <el-form :model="account" :rules="rules">
      <el-form-item label="手机" prop="phone">
        <el-input v-model="account.phone" />
      </el-form-item>
      <el-form-item label="验证码">
        <div class="auth-code-box">
          <el-input v-model="account.authCode" />
          <el-button type="primary">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useStore } from 'vuex'
import { rules } from '../config/phone-config'

export default defineComponent({
  setup() {
    const account = reactive({
      phone: '',
      authCode: ''
    })
    const store = useStore()

    const loginPhone = () => {
      console.log('phone')
      store.dispatch('login/phoneLoginAction')
    }
    return {
      account,
      rules,
      loginPhone
    }
  }
})
</script>

<style scoped>
.auth-code-box {
  display: flex;
}
.el-button {
  margin-left: 8px;
}
</style>
