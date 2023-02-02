// import { login,getUserInfo } from '@/api/sys'
// import { getUserInfo } from '@/api/sys'
// import md5 from 'md5'
import { setItem, getItem, removeAllItem } from '@/utils/storage'
import { TOKEN } from '@/constant'
import router, { resetRoute } from '@/router'
import { setTimeStamp } from '@/utils/auth'

export default {
  namespaced: true,
  state: () => ({
    token: getItem(TOKEN) || '',
    userInfo: {}
  }),
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem(TOKEN, token)
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
      console.log(state.userInfo)
    }
  },
  actions: {
    // 登录请求
    login(context, userInfo) {
      this.commit('user/setToken', '我是token')
      console.log('我存token了')
      setTimeStamp()
      router.push('/')
      // const { username, password } = userInfo
      // return new Promise((resolve, reject) => {
      //   login({
      //     username,
      //     password: md5(password)
      //   })
      //     .then((data) => {
      //       // this.commit('user/setToken',data.token);
      //       this.commit('user/setToken', '我是token')
      //       resolve()
      //     })
      //     .catch((err) => {
      //       reject(err)
      //     })
      // })
    },
    getUserInfo(context) {
      const res = {
        role: [
          {
            id: '1',
            title: '超级管理员'
          }
        ],
        _id: '612710a0ec87aa543c9c341d',
        id: '0',
        username: '爱吃葡萄的皮皮',
        title: '张大漂亮',
        avatar:
          'https://dgss0.bdstatic.com/6LZ1dD3d1sgCo2Kml5_Y_D3/sys/portrait/item/662ee5b08fe685a7e5ae87e5ae99e5a4a7e7be8ee5a5b3ga30a01000000?t=1668087111426',
        permission: {
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
      }
      // const res = await getUserInfo()
      this.commit('user/setUserInfo', res)
      return res
    },
    logout() {
      resetRoute()
      this.commit('user/setToken', '')
      this.commit('user/setUserInfo', {})
      removeAllItem()
      // TODO:处理权限相关配置
      router.push('/login')
    }
  }
}
