<template>
  <el-dialog
    :title="$t('msg.excel.title')"
    :model-value="modelValue"
    @close="closed"
    width="30%"
  >
    <el-input
      :placeholder="$t('msg.excel.placeholder')"
      v-model="excelName"
    ></el-input>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.excel.close') }}</el-button>
        <el-button @click="onConfirm" type="primary" :loading="loading">{{
          $t('msg.excel.confirm')
        }}</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { watchSwitchLang } from '@/utils/i18n'
import { useStore } from 'vuex'
import { USER_RELATIONS } from './Export2ExcelConstants'
// import getUserManageAllList from '@/api/user-manage'

defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})
const emits = defineEmits(['pdate:modelValue'])
// 导出文件名
const i18n = useI18n()
let exportDefaultName = i18n.t('msg.excel.defaultName')
const excelName = ref('')
watchSwitchLang(() => {
  exportDefaultName = i18n.t('msg.excel.defaultName')
  excelName.value = exportDefaultName
})

const closed = () => {
  emits('update:modelValue', false)
}
const store = useStore()
const loading = ref(false)
const onConfirm = async () => {
  loading.value = true
  // await getUserManageAllList()
  const allUser = store.getters.userTableInfos
  console.log(allUser)
  // 导入工具包
  const excel = await import('@/utils/Export2Excel')
  const data = formatJson(USER_RELATIONS, allUser)
  excel.export_json_to_excel({
    // 表头
    header: Object.keys(USER_RELATIONS),
    // 数据
    data,
    // 文件名称
    filename: excelName.value || exportDefaultName
    // 是否自动列宽
    // 文件类型
  })
  closed()
}
const formatJson = (headers, rows) => {
  return rows.map((item) => {
    return Object.keys(headers).map((key) => {
      if (headers[key] === 'role') {
        const roles = item[headers[key]]
        return JSON.stringify(roles.map((role) => role.title))
      }
      return item[headers[key]]
    })
  })
}
</script>

<style lang="scss" scoped></style>
