<template>
  <el-dialog
    :title="$t('msg.excel.roleDialogTitle')"
    :model-value="modelValue"
    @close="closed"
  >
    <el-checkbox-group v-model="userRoleTitleList">
      <el-checkbox
        v-for="item in allRoleList"
        :key="item.id"
        :label="item.title"
      ></el-checkbox>
    </el-checkbox-group>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.universal.cancel') }}</el-button>
        <el-button type="primary" @click="onConfirm">{{
          $t('msg.universal.confirm')
        }}</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'
// import { roleList } from '@/api/role'
import { watchSwitchLang } from '@/utils/i18n'
// import { updateRole } from '@/api/user-manage'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
// import { userRoles,updateRole } from '@/api/user-manage'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
})
const emits = defineEmits(['update:modelValue', 'updateRole'])
const closed = () => {
  emits('update:modelValue', false)
}
const i18n = useI18n()
const onConfirm = async () => {
  const roles = userRoleTitleList.value.map((title) => {
    return allRoleList.value.find((role) => role.title === title)
  })
  // await updateRole(props.id, roles)
  console.log(roles)
  ElMessage.success(i18n.t('msg.role.updateRoleSuccess'))
  // 更新列表
  emits('updateRole')
  closed()
}

// 所有角色
const allRoleList = ref([])
const getListData = async () => {
  // await roleList()
  allRoleList.value = [
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
getListData()
watchSwitchLang(getListData)

// 当前用户角色
const userRoleTitleList = ref([])
const getUserRoles = async () => {
  // await userRoles(props.id)
  userRoleTitleList.value = [
    {
      id: '2',
      title: '管理员'
    }
  ].map((item) => item.title)
}
watch(
  () => props.userId,
  (val) => {
    if (val) {
      getUserRoles()
    }
  }
)
</script>

<style lang="scss" scoped></style>
