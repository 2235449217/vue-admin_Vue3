<template>
  <el-dialog
    :title="$t('msg.excel.roleDialogTitle')"
    :model-value="modelValue"
    @close="closed"
  >
    <el-tree
      ref="treeRef"
      :data="allPermission"
      show-checkbox
      check-strictly
      node-key="id"
      default-expand-all
      :props="defaultProps"
    >
    </el-tree>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.universal.cancel') }}</el-button>
        <el-button type="primary" @click="onConfirm">{{
          $t('msg.universal.confirm')
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'
// import { permissionList } from '@/api/permission'
import { watchSwitchLang } from '@/utils/i18n'
// import { rolePermission } from '@/api/role'
// import { distributePermission } from '@/api/role'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  roleId: {
    type: String,
    required: true
  }
})
const emits = defineEmits(['update:modelValue'])

/**
  确定按钮点击事件
 */
const i18n = useI18n()
const onConfirm = async () => {
  // await distributePermission({
  //   roleId: props.roleId,
  //   permissions: treeRef.value.getCheckedKeys()
  // })
  console.log(props.roleId, treeRef.value.getCheckedKeys())
  ElMessage.success(i18n.t('msg.role.updateRoleSuccess'))
  closed()
}

/**
 * 关闭
 */
const closed = () => {
  emits('update:modelValue', false)
}

// 获取所有权限
const allPermission = ref([])
const getPermissionList = async () => {
  // allPermission.value = await permissionList()
  allPermission.value = [
    {
      id: '1',
      permissionName: '员工管理',
      permissionMark: 'userManage',
      permissionDesc: '员工管理菜单',
      children: [
        {
          id: '1-1',
          permissionName: '分配角色',
          permissionMark: 'distributeRole',
          permissionDesc: '为员工分配角色'
        },
        {
          id: '1-2',
          permissionName: '导入员工',
          permissionMark: 'importUser',
          permissionDesc: '通过 excel 导入员工'
        },
        {
          id: '1-3',
          permissionName: '删除员工',
          permissionMark: 'removeUser',
          permissionDesc: '删除员工'
        }
      ]
    },
    {
      id: '2',
      permissionName: '角色列表',
      permissionMark: 'roleList',
      permissionDesc: '角色列表菜单',
      children: [
        {
          id: '2-1',
          permissionName: '分配权限',
          permissionMark: 'distributePermission',
          permissionDesc: '为角色分配权限'
        }
      ]
    },
    {
      id: '3',
      permissionName: '权限列表',
      permissionMark: 'permissionList',
      permissionDesc: '权限列表菜单',
      children: []
    },
    {
      id: '4',
      permissionName: '文章排名',
      permissionMark: 'articleRanking',
      permissionDesc: '文章排名菜单',
      children: []
    },
    {
      id: '5',
      permissionName: '创建文章',
      permissionMark: 'articleCreate',
      permissionDesc: '创建文章页面',
      children: []
    }
  ]
}
getPermissionList()

watchSwitchLang(getPermissionList)

const treeRef = ref(null)

// 属性结构配置
const defaultProps = {
  children: 'children',
  label: 'permissionName'
}
// 当前角色的权限
const getRolePermission = async () => {
  // const checkedKeys = await rolePermission(props.roleId)
  const checkedKeys = ['1', '1-1', '1-2', '1-3', '2', '2-1', '3', '4', '5']
  console.log(treeRef.value)
  treeRef.value.setCheckedKeys(checkedKeys)
}
watch(
  () => props.roleId,
  (val) => {
    console.log(val)
    if (val) {
      getRolePermission()
    }
  }
)
</script>
