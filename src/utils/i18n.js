import i18n from '@/i18n'
import { watch } from 'vue'
import store from '@/store'

export function generateTitle(title) {
  // console.log('我执行了')
  return i18n.global.t('msg.route.' + title)
}
// 监听语言变化
export function watchSwitchLang(...cbs) {
  watch(
    () => store.getters.language,
    () => {
      cbs.forEach((cb) => cb())
    }
  )
}
