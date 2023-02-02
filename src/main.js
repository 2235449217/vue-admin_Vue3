import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import installElementPlus from './plugins/element'
// 初始化样式表
import '@/styles/index.scss'
// 导入svg
import installIcons from '@/icons'
// 路由鉴权
import './permission'
// 导入i18n
import i18n from './i18n'
// 全局属性
import installFilter from '@/filters/index'
// 打印
import installDirective from '@/directives/index'

const app = createApp(App)
installElementPlus(app)
installIcons(app)
installFilter(app)
installDirective(app)
app.use(store).use(router).use(i18n).mount('#app')
