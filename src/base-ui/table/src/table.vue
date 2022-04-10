<template>
  <div class="hj-table">
    <div class="header">
      <slot name="header">
        <!-- 标题部分 -->
        <div class="title">{{ title }}</div>
        <!-- 操作部分 -->
        <div class="handler">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>
    <el-table :data="listData" style="width: 100%" border v-bind="treeConfig">
      <el-table-column
        v-if="showSelectColumn"
        type="selection"
        width="80"
        align="center"
      />
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        width="80"
        label="序号"
        align="center"
      />
      <template v-for="column in propList" :key="column.prop">
        <el-table-column v-bind="column">
          <template #default="scope">
            <!--             利有动态具名插槽为每个列预留插槽，不使用时显示默认值-->
            <slot :name="column.slotName" :row="scope.row">
              {{ scope.row[column.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer">
      <slot name="footer">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageInfo.currentPage"
          :page-sizes="pageSizes"
          :page-size="pageInfo.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listCount"
        >
        </el-pagination>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { TableColumn } from '../type/type'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    title: {
      type: String,
      default: ''
    },
    propList: {
      type: Array as PropType<TableColumn>,
      default: () => []
    },
    listData: {
      type: Array,
      default: () => []
    },
    pageInfo: {
      type: Object,
      default: () => ({ pageSize: 10, currentPage: 0 })
    },
    listCount: {
      type: Number,
      default: 0
    },
    showIndexColumn: {
      type: Boolean,
      default: false
    },
    showSelectColumn: {
      type: Boolean,
      default: false
    },
    treeConfig: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['update:pageInfo'],
  setup(props, { emit }) {
    const handleSizeChange = (size: number) => {
      emit('update:pageInfo', { ...props.pageInfo, pageSize: size })
    }
    const handleCurrentChange = (currentPage: number) => {
      emit('update:pageInfo', { ...props.pageInfo, currentPage: currentPage })
    }
    let pageSizes: number[] = []

    for (let i = 0; i < 4; i++) {
      pageSizes.push(props.pageInfo.pageSize + i * 10)
    }
    return {
      handleSizeChange,
      handleCurrentChange,
      pageSizes
    }
  }
})

// export default
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  height: 40px;
}
.title {
  font-size: 20px;
  font-weight: 700;
}
.handler {
  align-items: center;
}
.footer {
  text-align: right;
  margin-top: 10px;
}
</style>
