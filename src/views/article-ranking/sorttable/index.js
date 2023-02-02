import Sortable from 'sortablejs'
import { ref } from 'vue'
// import { articleSort } from '@/api/article'
import { ElMessage } from 'element-plus'
import i18n from '@/i18n'

export const tableRef = ref(null)

export const initSorttable = (tableData, callback) => {
  const el = tableRef.value.$el.querySelectorAll('.el-table__body > tbody')[0]
  console.log(el)
  // 拖拽元素 配置对象
  Sortable.create(el, {
    // 拖拽时类名
    ghostClass: 'sortable-ghost',
    // 拖拽结束方法
    onEnd(event) {
      const { newIndex, oldIndex } = event
      console.log(newIndex, oldIndex)
      // articleSort({
      //   initRanking: tableData[oldIndex].value.ranking,
      //   finalRanking: tableData[newIndex].value.ranking
      // })
      // tableData.value = []
      // callback && callback()
      ElMessage.success(i18n.global.t('msg.article.sortSuccess'))
    }
  })
}
