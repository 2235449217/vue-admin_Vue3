import router from '@/router'
import store from '@/store'

const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
  // 用户已登录 不进login
  // 用户未登录 只进login
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      if (!store.getters.hashUserInfo) {
        store.dispatch('user/getUserInfo')
        const permission = {
          menus: [
            'userManage',
            'roleList',
            'permissionList',
            'articleRanking',
            'articleCreate'
          ],
          points: [
            'distributeRole',
            'importUser',
            'removeUser',
            'distributePermission'
          ]
        }
        // 处理用户权限
        const filterRoutes = await store.dispatch(
          'permission/filterRoutes',
          permission.menus
        )
        console.log(filterRoutes)
        // 利用 addRoute 循环添加
        filterRoutes.forEach((item) => {
          router.addRoute(item)
        })
        // store.dispatch('user/getUserInfo')
        // 添加完动态路由之后，需要在进行一次主动跳转
        return next(to.path)
      }
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})
