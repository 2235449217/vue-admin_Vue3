import { createStore } from 'vuex'
import user from './modules/user'
import app from './modules/app'
import getters from './getters'
import userTableInfos from './modules/userTableInfos'
import theme from './modules/theme.js'
import permission from './modules/permission.js'

export default createStore({
  getters,
  modules: {
    user,
    app,
    theme,
    userTableInfos,
    permission
  }
})
