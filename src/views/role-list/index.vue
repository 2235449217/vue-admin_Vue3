<template>
  <div>
    <el-card>
      <el-table :data="allRoles" border style="width: 100%">
        <el-table-column
          type="index"
          :label="$t('msg.role.index')"
          width="120"
        ></el-table-column>
        <el-table-column
          :label="$t('msg.role.name')"
          prop="title"
        ></el-table-column>
        <el-table-column
          :label="$t('msg.role.desc')"
          prop="describe"
        ></el-table-column>
        <el-table-column
          :label="$t('msg.role.action')"
          width="200"
          #default="{ row }"
        >
          <el-button
            type="primary"
            size="small"
            @click="onDistributePermissionClick(row)"
            v-permission="['distributePermission']"
            >{{ $t('msg.role.assignPermissions') }}</el-button
          >
        </el-table-column>
      </el-table>
    </el-card>

    <distribute-permission
      v-model="distributePermissionVisible"
      :roleId="selectRoleId"
    ></distribute-permission>
  </div>
</template>

<script setup>
// import { roleList } from '@/api/role'
import { ref } from 'vue'
import { watchSwitchLang } from '@/utils/i18n'
import DistributePermission from './components/DistributePermission.vue'

const allRoles = ref([])

const getRoleList = async () => {
  // await roleList()
  allRoles.value = [
    {
      id: '1',
      title: '超级管理员',
      describe: '唯一账号，可以操作系统所有功能'
    },
    {
      id: '2',
      title: '管理员',
      describe: '由超管指定，可以为多个，协助超管管理系统'
    },
    {
      id: '3',
      title: '人事经理',
      describe: '主管人事相关业务'
    },
    {
      id: '4',
      title: '销售经理',
      describe: '主管销售相关业务'
    },
    {
      id: '5',
      title: '保安队长',
      describe: '主管安保相关业务'
    },
    {
      id: '6',
      title: '员工',
      describe: '普通员工'
    }
  ]
}
getRoleList()
watchSwitchLang(getRoleList)

/**
 * 分配权限
 */
const selectRoleId = ref('')
const distributePermissionVisible = ref(false)
const onDistributePermissionClick = (row) => {
  distributePermissionVisible.value = true
  selectRoleId.value = row.id
}
</script>

<style lang="scss" scoped></style>
