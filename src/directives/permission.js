import store from '@/store'

function checkPermission(el, binding) {
  // 获取对应权限
  const { value } = binding
  // 获取当前用户的所有功能权限
  const points = store.getters.userInfo.permission.points
  if (value && value instanceof Array) {
    const hasPermission = points.some((point) => {
      return value.includes(point)
    })
    // 匹配失败
    if (!hasPermission) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  } else {
    throw new Error('必须为数组')
  }
}
export default {
  // 绑定元素的父组件被挂载后调用
  mounted(el, binding) {
    checkPermission(el, binding)
  },
  // 在包含组件的VNode及其子组件的VNode更新后调用
  update(el, binding) {
    checkPermission(el, binding)
  }
}
