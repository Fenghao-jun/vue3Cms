<template>
  <div class="hj-from">
    <slot name="header"></slot>
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in fromItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              v-if="!item.hidden"
              :label="item.label"
              :rules="item.rules"
              :style="itemStyle"
            >
              <template v-if="item.type === 'input'">
                <el-input
                  :placeholder="item.placeholder"
                  style="width: 100%"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handelValueChange($event, item.field)"
                />
              </template>
              <template v-if="item.type === 'password'">
                <el-input
                  type="password"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handelValueChange($event, item.field)"
                />
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  style="width: 100%"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handelValueChange($event, item.field)"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                    :label="option.label"
                  >
                  </el-option>
                </el-select>
              </template>
              <template v-else-if="item.type === 'datePicker'">
                <el-date-picker
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handelValueChange($event, item.field)"
                  v-bind="item.otherOptions"
                  style="width: 100%"
                />
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <slot name="footer"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch, computed } from 'vue'
import { IFromItem } from '../type/index'

export default defineComponent({
  props: {
    fromItems: {
      type: Array as PropType<IFromItem[]>,
      default: () => []
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    itemStyle: {
      type: Object,
      default: () => ({ padding: '10px 60px' })
    },
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6,
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24
      })
    },
    modelValue: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    //复制一遍值
    const fromData = ref({ ...props.modelValue })
    const fromOriginData = { ...props.modelValue }

    //如果使用计算属性，实际上set并不会触发，四舍五入也是修改了原本的属性，而不是通过事件传递去修改。所以此处使用watch监听变化，再触发事件修改
    watch(
      fromData,
      (nVal) => {
        console.log('nVal: ', nVal)
        emit('update:modelValue', nVal)
      },
      {
        deep: true
      }
    )

    const handleResetClick = () => {
      fromData.value = { ...fromOriginData }
    }

    const handelValueChange = (value: any, field: string) => {
      emit('update:modelValue', { ...props.modelValue, [field]: value })
    }

    // const fromData = computed({
    //   get() {
    //     return { ...props.modelValue }
    //   },
    //   set(nValue) {
    //     console.log('nValue: ', nValue)

    //     emit('update:modelValue', nValue)
    //   }
    // })
    return { fromData, handleResetClick, fromOriginData, handelValueChange }
  }
})
</script>

<style scoped>
.hj-from {
  padding-top: 22px;
}
</style>
