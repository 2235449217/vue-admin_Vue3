<template>
  <div class="article-ranking-container">
    <el-card class="header">
      <div class="dynamic-box">
        <span class="title">{{ $t('msg.article.dynamicTitle') }}</span>
        <el-checkbox-group v-model="selectDynamicLabel">
          <el-checkbox
            v-for="(item, index) in dynamicData"
            :label="item.label"
            :key="index"
          >
            {{ item.label }}
          </el-checkbox>
        </el-checkbox-group>
      </div>
    </el-card>
    <el-card>
      <el-table ref="tableRef" :data="tableData" border>
        <el-table-column
          v-for="(item, index) in tableColumns"
          :key="index"
          :label="item.label"
          :prop="item.prop"
        >
          <template v-if="item.prop === 'publicDate'" #default="{ row }">
            {{ $filters.relativeTime(row.publicDate) }}
          </template>
          <template v-else-if="item.prop === 'action'" #default="{ row }">
            <el-button type="primary" size="small" @click="onShowClick(row)">
              {{ $t('msg.article.show') }}
            </el-button>
            <el-button type="danger" size="small" @click="onRemoveClick(row)">
              {{ $t('msg.article.remove') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[5, 10, 50, 100, 200]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      />
    </el-card>
  </div>
</template>

<script setup>
// import { getArticleList,deleteArticle } from '@/api/article'
import { watchSwitchLang } from '@/utils/i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, onActivated, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { dynamicData, selectDynamicLabel, tableColumns } from './dynamic'
import { tableRef, initSorttable } from './sorttable/index'

const tableData = ref([])
const page = ref(1)
const size = ref(10)
const total = ref(0)

const getListData = async () => {
  // tableData.value = await getArticleList({
  //   page: page.value,
  //   size: size.value
  // })
  const data = {
    list: [
      {
        _id: '612a198d218e733440da07e6',
        ranking: 1,
        title: 'ESLint + Git Hooks',
        author: 'Sunday',
        publicDate: '1629099597000',
        desc: '????????????'
      },
      {
        _id: '612a198d218e733440da07ec',
        ranking: 2,
        title: 'Tags View',
        author: 'Sunday',
        publicDate: '1629099597000',
        desc: '????????????????????????'
      },
      {
        _id: '612a198d218e733440da07e4',
        ranking: 3,
        title: 'Element-Plus',
        author: 'Sunday',
        publicDate: '1629099597000',
        desc: '?????? Vue 3.0 ?????????????????????'
      },
      {
        _id: '612a198d218e733440da07ea',
        ranking: 4,
        title: '?????????',
        author: 'Sunday',
        publicDate: '1629099597000',
        desc: '??????????????????????????? Menu ??????'
      },
      {
        _id: '612a198d218e733440da07eb',
        ranking: 5,
        title: '???????????????',
        author: 'Sunday',
        publicDate: '1629099597000',
        desc: '??????????????????????????????'
      },
      {
        _id: '612a198d218e733440da07e8',
        ranking: 6,
        title: '????????????',
        author: 'Sunday',
        publicDate: '1629099597000',
        desc: '?????????????????????????????????????????????????????????'
      },
      {
        _id: '612a198d218e733440da07e5',
        ranking: 7,
        title: 'vue-element-admin',
        author: 'Sunday',
        publicDate: '1629099597000',
        desc: '????????????????????????'
      },
      {
        _id: '612a198d218e733440da07e3',
        ranking: 8,
        title: 'Vue3 + ?????????',
        author: 'Sunday',
        publicDate: '1629099597000',
        desc: '?????????????????????vue3?????????????????????'
      },
      {
        _id: '612a198d218e733440da07e9',
        ranking: 9,
        title: '????????????',
        author: 'Sunday',
        publicDate: '1629099597000',
        desc: '????????????????????????'
      },
      {
        _id: '612a198d218e733440da07e7',
        ranking: 10,
        title: '????????????',
        author: 'Sunday',
        publicDate: '1629099597000',
        desc: '????????????'
      }
    ],
    total: 20,
    page: '1',
    size: '10'
  }
  tableData.value = data.list
  total.value = data.total
}
getListData()
watchSwitchLang(getListData)
onActivated(getListData)

const router = useRouter()
// ????????????
const onShowClick = (row) => {
  router.push(`/article/${row._id}`)
}
const i18n = useI18n()
// ????????????
const onRemoveClick = (row) => {
  ElMessageBox.confirm(
    i18n.t('msg.article.dialogTitle1') +
      row.title +
      i18n.t('msg.article.dialogTitle2'),
    {
      type: 'warning'
    }
  ).then(() => {
    // ????????????????????????
    ElMessage.success(i18n.t('msg.article.removeSuccess'))
    getListData()
  })
}
// size??????
const handleSizeChange = (currentSize) => {
  size.value = currentSize
}
// page??????
const handleCurrentChange = (currentPage) => {
  page.value = currentPage
}
// ?????????sortable
onMounted(() => {
  initSorttable(tableData, getListData)
})
</script>

<style lang="scss" scoped>
.article-ranking-container {
  .header {
    margin-bottom: 20px;
    .dynamic-box {
      display: flex;
      align-items: center;
      .title {
        margin-right: 20px;
        font-size: 14px;
        font-weight: bold;
      }
    }
  }

  :deep(.el-table__row) {
    cursor: pointer;
  }

  .pagination {
    margin-top: 20px;
    text-align: center;
  }
}
:deep(.sortable-ghost) {
  opacity: 0.6;
  color: #fff !important;
  background: #304156 !important;
}
</style>
