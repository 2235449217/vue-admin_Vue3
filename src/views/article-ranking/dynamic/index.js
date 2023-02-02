import DynamicData from './DynamicData'
import { watchSwitchLang } from '@/utils/i18n'
import { ref, watch } from 'vue'

// 动态列数据
export const dynamicData = ref(DynamicData())
// 默认被勾选的列的label
export const selectDynamicLabel = ref([])
// 监听语言变化
watchSwitchLang(() => {
  dynamicData.value = DynamicData()
  initSelectDynamicLabel()
})
// 默认全部勾选
const initSelectDynamicLabel = () => {
  selectDynamicLabel.value = dynamicData.value.map((item) => item.label)
}
initSelectDynamicLabel()

// table列数据
export const tableColumns = ref([])
// 监听选中标签变化 动态改变列数据
watch(
  selectDynamicLabel,
  (val) => {
    tableColumns.value = []
    tableColumns.value = dynamicData.value.filter((item) => {
      return val.includes(item.label)
    })
    // const selectData = dynamicData.value.filter((item) => {
    //   return val.includes(item.label)
    // })
    // tableColumns.value.push(...selectData)
  },
  {
    immediate: true
  }
)
