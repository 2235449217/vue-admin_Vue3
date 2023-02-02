export default {
  namespaced: true,
  state: () => ({
    list: [
      {
        role: [
          {
            id: '1',
            title: '超级管理员'
          }
        ],
        _id: '612710a0ec87aa543c9c341d',
        id: '0',
        openTime: '1433088000000',
        username: '爱吃葡萄的皮皮',
        mobile: '188xxxx0001',
        avatar:
          'https://dgss0.bdstatic.com/6LZ1dD3d1sgCo2Kml5_Y_D3/sys/portrait/item/662ee5b08fe685a7e5ae87e5ae99e5a4a7e7be8ee5a5b3ga30a01000000?t=1668087111426'
      },
      {
        role: [
          {
            id: '2',
            title: '管理员'
          }
        ],
        _id: '612710a0ec87aa543c9c341e',
        id: '1',
        username: 'admin',
        openTime: '1559318400000',
        mobile: '188xxxx0002',
        avatar:
          'https://img4.sycdn.imooc.com/61110c2b0001152907400741-140-140.jpg'
      },
      {
        role: [
          {
            id: '1',
            title: '超级管理员'
          }
        ],
        _id: '612710a0ec87aa543c9c341d',
        id: '0',
        openTime: '1433088000000',
        username: '张小漂亮',
        mobile: '188xxxx0001',
        avatar:
          'https://dgss0.bdstatic.com/6LZ1dD3d1sgCo2Kml5_Y_D3/sys/portrait/item/662ee5b08fe685a7e5ae87e5ae99e5a4a7e7be8ee5a5b3ga30a01000000?t=1668087111426'
      },
      {
        role: [
          {
            id: '2',
            title: '管理员'
          }
        ],
        _id: '612710a0ec87aa543c9c341e',
        id: '1',
        username: '张大漂亮',
        openTime: '1559318400000',
        mobile: '188xxxx0002',
        avatar:
          'https://img4.sycdn.imooc.com/61110c2b0001152907400741-140-140.jpg'
      }
    ],
    total: 4,
    page: 1,
    size: 2
  }),
  mutations: {
    setPage(state, page) {
      state.page = page
    },
    setSize(state, size) {
      state.size = size
    },
    setTotal(state, total) {
      state.total = total
    },
    addInfo(state, updateData) {
      state.list.push(...updateData)
    }
  }
}
