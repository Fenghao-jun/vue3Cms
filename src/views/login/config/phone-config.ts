import { FormRulesMap } from 'element-plus/lib/el-form/src/form.type'

export const rules: FormRulesMap = {
  phone: [
    { trigger: 'blur', pattern: /^1[3|4|5|8][0-9]\d{4,8}$/, required: true }
  ]
}
