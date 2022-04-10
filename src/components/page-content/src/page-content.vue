<template>
  <div class="page-content">
    <hj-table
      :listData="listData"
      :listCount="listCount"
      v-bind="pageContentConfig"
      v-model:pageInfo="pageInfo"
    >
      <!-- header部分插槽 -->
      <template #headerHandler>
        <el-button type="primary" v-if="hasCreate" @click="handleCreateClick"
          >增加用户</el-button
        >
        <el-button icon="el-icon-refresh"></el-button>
      </template>
      <!-- 表格部分 -->
      <template #status="{ row }">
        <el-tag>{{ row.enable === 1 ? '启用' : '停用' }}</el-tag>
      </template>
      <template #updateAt="{ row }">
        {{ $filters.formatTime(row.updateAt) }}
      </template>
      <template #createAt="{ row }">
        {{ $filters.formatTime(row.createAt) }}
      </template>
      <template #handle="{ row }">
        <div class="handle-btn">
          <el-button
            type="text"
            size="mini"
            v-if="hasUpdate"
            @click="handleUpdateClick(row)"
            >编辑</el-button
          >
          <el-button
            type="text"
            size="mini"
            v-if="hasDelete"
            @click="handleDeleted(row)"
            >删除</el-button
          >
        </div>
      </template>
      <!-- 插槽再封装 -->
      <template
        v-for="item in slotList"
        :key="item.key"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </hj-table>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  computed,
  ref,
  watchEffect,
  watch
} from 'vue'
import { IPageContent } from '../type/type'
import HjTable from '@/base-ui/table/index'
import { useStore } from '@/store'
import { usePermissions } from '../../../hooks/use-permission'

export default defineComponent({
  props: {
    pageContentConfig: {
      type: Object as PropType<IPageContent>,
      default: () => ({})
    },
    pageName: {
      type: String,
      required: true
    }
  },
  components: {
    HjTable
  },
  emits: ['btnCreateClick', 'btnUpdateClick'],
  setup(props, { emit }) {
    const store = useStore()
    const pageInfo = ref({
      pageSize: 5,
      currentPage: 1
    })

    const hasCreate = usePermissions(props.pageName, 'create')
    const hasUpdate = usePermissions(props.pageName, 'update')
    const hasDelete = usePermissions(props.pageName, 'delete')
    const hasQuery = usePermissions(props.pageName, 'query')

    //请求封装部分
    const getPageContent = (searchInfo: any = {}) => {
      if (!hasQuery) return
      store.dispatch('system/getPageListAction', {
        pageName: props.pageName,
        pageInfo: {
          offset:
            pageInfo.value.pageSize * pageInfo.value.currentPage -
            pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...searchInfo
        }
      })
    }
    //监听分页变化
    watch(pageInfo, () => getPageContent())
    getPageContent()

    const listData = computed(() =>
      store.getters['system/pageListData'](props.pageName)
    )

    const listCount = computed(() =>
      store.getters['system/pageListCount'](props.pageName)
    )

    //第二层封装
    const baseSlot = ['updateAt', 'createAt', 'handle']
    const slotList = props.pageContentConfig?.propList?.filter((item) => {
      //过滤掉基础的slot
      if (item.slotName && baseSlot.includes(item.slotName)) {
        return false
      } else {
        return true
      }
    })

    //删除
    const handleDeleted = (item: any) => {
      console.log('item: ', item)
      store.dispatch('system/deletePageDataAction', {
        pageName: props.pageName,
        pageInfo: item
      })
      console.log('321')
    }
    //增删事件
    const handleCreateClick = () => {
      emit('btnCreateClick')
    }
    const handleUpdateClick = (item: any) => {
      emit('btnUpdateClick', item)
    }

    return {
      listData,
      listCount,
      getPageContent,
      pageInfo,
      slotList,
      hasDelete,
      hasCreate,
      hasUpdate,
      handleDeleted,
      handleCreateClick,
      handleUpdateClick
    }
  }
})
</script>

<style scoped>
.page-content {
  margin-top: 10px;
  border-top: 20px solid #f5f5f5;
  border-radius: 5px;
}
</style>
