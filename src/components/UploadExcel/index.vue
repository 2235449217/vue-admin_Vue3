<template>
  <div class="upload-excel">
    <div class="btn-upload">
      <el-button :loading="loading" type="primary" @click="handleUpload">{{
        $t('msg.uploadExcel.upload')
      }}</el-button>
    </div>
    <input
      type="file"
      ref="excelUploadInput"
      class="excel-upload-input"
      accept=".xlsx, .xls"
      @change="handleChange"
    />
    <!-- https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_Drag_and_Drop_API -->
    <div
      class="drop"
      @drop.stop.prevent="handleDrop"
      @dragover.stop.prevent="handleDragover"
      @dragenter.stop.prevent="handleDragover"
    >
      <i class="el-icon-upload"></i>
      <span>{{ $t('msg.uploadExcel.drop') }}</span>
    </div>
  </div>
</template>
<script setup>
import XLSX from 'xlsx'
import { getHeaderRow, isExcel } from './utils'
import { ref, defineProps } from 'vue'
import { ElMessage } from 'element-plus'

const props = defineProps({
  // 上传之前的回调
  beforeUpload: Function,

  // 上传成功的回调
  onSuccess: Function
})
const loading = ref(false)
const excelUploadInput = ref(null)
const handleUpload = () => {
  excelUploadInput.value.click()
}
// input change事件
const handleChange = (e) => {
  console.log(e)
  const files = e.target.files
  const rawFile = files[0]
  if (!rawFile) {
    return
  }
  console.log(rawFile)
  upload(rawFile)
}
// 上传事件
const upload = (rawFile) => {
  // 将input的值赋为空
  excelUploadInput.value.value = null
  // 没有指定回调 直接解析文件
  if (!props.beforeUpload) {
    readerData(rawFile)
    return
  }
  // 如果指定上传前的回调 返回true才会解析文件
  const before = props.beforeUpload()
  if (before) {
    readerData(rawFile)
  }
}
// 异步解析数据
const readerData = (rawFile) => {
  loading.value = true
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    // 该事件在读取操作完成时触发  e:ProgressEvent事件对象
    reader.onload = (e) => {
      // 1. 获取解析到的数据
      const data = e.target.result
      // 2. 利用 XLSX 对数据进行解析
      const workbook = XLSX.read(data, { type: 'array' })
      // 3. 获取第一张表格名称
      const firstSheetName = workbook.SheetNames[0]
      // 4. 只读取 Sheet1（第一张表格）的数据
      const worksheet = workbook.Sheets[firstSheetName]
      // 5. 解析数据表头
      const header = getHeaderRow(worksheet)
      // 6. 解析数据体
      const results = XLSX.utils.sheet_to_json(worksheet)
      // 7. 传入解析之后的数据
      generateData({ header, results })
      // 8. loading 处理
      loading.value = false
      // 9. 异步完成
      resolve()
    }
    // 开始读取指定文件
    reader.readAsArrayBuffer(rawFile)
  })
}
// 触发上传成功的回调
const generateData = (excelData) => {
  props.onSuccess && props.onSuccess(excelData)
}
// 拖拽上传 当元素或选中的文本在可释放目标上被释放时触发
const handleDrop = (e) => {
  // 上传中
  if (loading.value) {
    return
  }
  // 包含数据传输中可用的所有本地文件的列表。如果拖动操作不涉及拖动文件，则此属性为空列表。
  const files = e.dataTransfer.files
  if (files.length !== 1) {
    ElMessage.error('必须选择一个文件')
    return
  }
  const rawFile = files[0]
  // 判断文件格式
  if (!isExcel(rawFile)) {
    ElMessage.error('文件格式错误')
    return
  }
  upload(rawFile)
}
// 当元素或选中的文本被拖到一个可释放目标上时触发 && 当拖拽元素或选中的文本到一个可释放目标时触发
const handleDragover = (e) => {
  e.dataTransfer.dropEffect = 'copy'
}
</script>
<script>
// 使用普通的 <script> 来声明选项
export default {
  inheritAttrs: false
}
</script>
<style lang="scss" scoped>
.upload-excel {
  display: flex;
  justify-content: center;
  margin-top: 100px;
  .excel-upload-input {
    display: none;
    z-index: -9999;
  }
  .btn-upload,
  .drop {
    border: 1px dashed #bbb;
    width: 350px;
    height: 160px;
    text-align: center;
    line-height: 160px;
  }
  .drop {
    line-height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #bbb;
    i {
      font-size: 60px;
      display: block;
    }
  }
}
</style>
