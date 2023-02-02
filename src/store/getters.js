import { generateColors } from '@/utils/theme'
import { getItem } from '@/utils/storage'
import { MAIN_COLOR } from '@/constant'
// 快捷访问
const getters = {
  token: (state) => state.user.token,
  hashUserInfo: (state) => {
    return JSON.stringify(state.user.userInfo) !== '{}'
  },
  userInfo: (state) => state.user.userInfo,
  cssVar: (state) => ({
    ...state.theme.variables,
    ...generateColors(getItem(MAIN_COLOR))
  }),
  sidebarOpened: (state) => state.app.sidebarOpened,
  mainColor: (state) => state.theme.mainColor,
  language: (state) => state.app.language,
  tagsViewList: (state) => state.app.tagsViewList,
  userTableInfos: (state) => state.userTableInfos.list,
  total: (state) => state.userTableInfos.total,
  page: (state) => state.userTableInfos.page,
  size: (state) => state.userTableInfos.size
}
export default getters
