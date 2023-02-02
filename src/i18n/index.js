import { createI18n } from 'vue-i18n'
import zhLocale from './lang/zh'
import enLocale from './lang/en'
import store from '@/store'
const messages = {
  en: {
    msg: {
      ...enLocale
    }
  },
  zh: {
    msg: {
      ...zhLocale
    }
  }
}

const i18n = createI18n({
  // composition API
  legacy: false,
  // 全局使用t函数
  globalInjection: true,
  locale: store.getters.language,
  messages
})

export default i18n
