<template>
  <div class="user-manage-container">
    <!-- 导入导出 -->
    <el-card class="header">
      <div>
        <el-button
          type="primary"
          @click="onImportExcelClick"
          v-permission="['importUser']"
          >{{ $t('msg.excel.importExcel') }}</el-button
        >
        <el-button type="success" @click="onToExcelClick">{{
          $t('msg.excel.exportExcel')
        }}</el-button>
      </div>
    </el-card>
    <!-- table -->
    <el-card>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="#" type="index"></el-table-column>
        <!-- 姓名 -->
        <el-table-column
          :label="$t('msg.excel.name')"
          prop="username"
        ></el-table-column>
        <!-- 电话 -->
        <el-table-column
          :label="$t('msg.excel.mobile')"
          prop="mobile"
        ></el-table-column>
        <!-- 头像 -->
        <el-table-column :label="$t('msg.excel.mobile')" align="center">
          <template v-slot="{ row }">
            <el-image
              class="avatar"
              :src="row.avatar"
              :preview-src-list="[row.avatar]"
            ></el-image>
          </template>
        </el-table-column>
        <!-- 角色 -->
        <el-table-column :label="$t('msg.excel.role')">
          <template #default="{ row }">
            <div v-if="row.role && row.role.length > 0">
              <el-tag v-for="item in row.role" :key="item.id" size="small">
                {{ item.title }}
              </el-tag>
            </div>
            <div v-else>
              <el-tag size="small">{{ $t('msg.excel.defaultRole') }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <!-- 时间 -->
        <el-table-column :label="$t('msg.excel.openTime')">
          <template #default="{ row }"
            >{{ $filters.dateFilter(row.openTime) }}
          </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column
          :label="$t('msg.excel.action')"
          fixed="right"
          width="300"
        >
          <template #default="{ row }">
            <el-button
              type="primary"
              size="small"
              @click="onShowClick(row._id)"
              >{{ $t('msg.excel.show') }}</el-button
            >
            <el-button
              type="info"
              size="small"
              @click="onShowRoleClick(row)"
              v-permission="['distributeRole']"
              >{{ $t('msg.excel.showRole') }}</el-button
            >
            <el-button
              type="danger"
              size="small"
              @click="onRemoveClick(row)"
              v-permission="['removeUser']"
              >{{ $t('msg.excel.remove') }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-size="size"
        :page-sizes="[2, 5]"
        layout="total,sizes,prev,pager,next,jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <export-two-excel v-model="exportToExcelVisible"></export-two-excel>
    <roles-dialog
      v-model="roleDialogVisible"
      :userId="selectId"
      @updateRole="getListData"
    ></roles-dialog>
  </div>
</template>

<script setup>
import { onActivated, ref, watch } from 'vue'
import { watchSwitchLang } from '@/utils/i18n'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useI18n } from 'vue-i18n'
import ExportTwoExcel from './components/Export2Excel.vue'
import RolesDialog from './components/roles.vue'
// import { getUserManageList,deleteUser } from '@/api/user-manage'

const store = useStore()
const tableData = ref([])
const total = store.getters.total
const page = ref(1)
const size = ref(2)
console.log(page, size)
const getListData = async () => {
  // const result = await getUserManageList({
  //   page: page.value,
  //   sieze: size.value
  // })

  // const getData = {
  //   list: [
  //     {
  //       role: [
  //         {
  //           id: '1',
  //           title: '超级管理员'
  //         }
  //       ],
  //       _id: '612710a0ec87aa543c9c341d',
  //       id: '0',
  //       openTime: '1433088000000',
  //       username: '爱吃葡萄的皮皮',
  //       mobile: '188xxxx0001',
  //       avatar:
  //         'https://dgss0.bdstatic.com/6LZ1dD3d1sgCo2Kml5_Y_D3/sys/portrait/item/662ee5b08fe685a7e5ae87e5ae99e5a4a7e7be8ee5a5b3ga30a01000000?t=1668087111426'
  //     },
  //     {
  //       role: [
  //         {
  //           id: '2',
  //           title: '管理员'
  //         }
  //       ],
  //       _id: '612710a0ec87aa543c9c341e',
  //       id: '1',
  //       username: 'admin',
  //       openTime: '1559318400000',
  //       mobile: '188xxxx0002',
  //       avatar:
  //         'https://img4.sycdn.imooc.com/61110c2b0001152907400741-140-140.jpg'
  //     }
  //   ],
  //   total: 7,
  //   page: '1',
  //   size: '2'
  // }
  // 数据处理
  if (total > size.value) {
    tableData.value = store.getters.userTableInfos.slice(0, size.value)
  } else {
    tableData.value = store.getters.userTableInfos.slice(0, total)
  }
  // tableData.value = store.getters.userTableInfos
}
getListData()
// 监听语言变化 获取对应语言数据
watchSwitchLang(getListData)
//  改变size
const handleSizeChange = (currentSize) => {
  size.value = currentSize
  // 获取数据
  store.commit('userTableInfos/setSize', currentSize)
  getListData()
}
// 改变page
const handleCurrentChange = (currentPage) => {
  page.value = currentPage
  // 获取数据
  store.commit('userTableInfos/setPage', currentPage)
  getListData()
}

const router = useRouter()
// 导入按钮
const onImportExcelClick = () => {
  router.push('/user/import')
}

// 组件激活时获取最新数据
onActivated(getListData)

// 删除用户
const i18n = useI18n()
const onRemoveClick = async (row) => {
  console.log(row)
  ElMessageBox.confirm(
    i18n.t('msg.excel.dialogTitle1') +
      row.username +
      i18n.t('msg.excel.dialogTitle2'),
    {
      type: 'warning'
    }
  ).then(async () => {
    // await deleteUser(row._id)
    ElMessage.success(i18n.t('msg.excel.removeSuccess'))
    getListData()
  })
}

const exportToExcelVisible = ref(false)
// 导出按钮
const onToExcelClick = () => {
  exportToExcelVisible.value = true
}

// 查看用户详情
const onShowClick = (id) => {
  console.log(id)
  router.push(`/user/info/${id}`)
}
// 分配角色

const selectId = ref('')
const roleDialogVisible = ref(false)
const onShowRoleClick = (row) => {
  roleDialogVisible.value = true
  selectId.value = row._id
  console.log(selectId.value)
}
watch(roleDialogVisible, (val) => {
  if (!val) {
    selectId.value = ''
  }
})
</script>

<style lang="scss" scoped>
.user-manage-container {
  .header {
    margin-bottom: 22px;
    text-align: right;
  }
  :deep(.avatar) {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

  :deep(.el-tag) {
    margin-right: 6px;
  }

  .pagination {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
