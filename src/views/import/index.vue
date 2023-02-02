<template>
  <upload-excel :onSuccess="onSuccess"></upload-excel>
</template>

<script setup>
import UploadExcel from '@/components/UploadExcel'
import { USER_RELATIONS, formatDate } from './utils'
// import { UserBatchImport } from '@/api/user-manage'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()

const i18n = useI18n()
const router = useRouter()
// 解析数据成功的回调
const onSuccess = async ({ header, results }) => {
  const updateData = generateData(results)
  // await UserBatchImport(updateData)
  console.log(updateData)
  store.commit('userTableInfos/addInfo', updateData)
  console.log(store.getters.userTableInfos)
  ElMessage.success({
    type: 'success',
    message: results.length + i18n.t('msg.excel.importSuccess')
  })
  router.push('/user/manage')
}

// 筛选数据
const generateData = (results) => {
  const arr = []
  results.forEach((item) => {
    const userInfo = {}

    Object.keys(item).forEach((key) => {
      if (USER_RELATIONS[key] === 'openTime') {
        userInfo[USER_RELATIONS[key]] = formatDate(item[key])
        return
      }
      userInfo[USER_RELATIONS[key]] = item[key]
    })
    arr.push(userInfo)
  })
  return arr
}
</script>

<style lang="scss" scoped></style>
