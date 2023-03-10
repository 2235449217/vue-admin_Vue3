import request from '@/utils/request'

// 获取用户列表数据
export const getUserManageList = (data) => {
  return request({
    url: '/user-manage/list',
    params: data
  })
}
// 获取所有用户列表数据
export const getUserManageAllList = () => {
  return request({
    url: '/user-manage/all-list'
  })
}

// 批量上传
export const UserBatchImport = (data) => {
  return request({
    url: '/user-manage/batch/import',
    method: 'POST',
    data
  })
}
// 删除
export const deleteUser = (id) => {
  return request({
    url: `/user-manage/delete/${id}`
  })
}
// 获取用户详情
export const userDetail = (id) => {
  return request({
    url: `/user-manage/detail/${id}`
  })
}

/**
 * 获取指定用户的角色
 */
export const userRoles = (id) => {
  return request({
    url: `/user-manage/role/${id}`
  })
}
/**
 * 为用户分配角色
 */

export const updateRole = (id, roles) => {
  return request({
    url: `/user-manage/update-role/${id}`,
    method: 'POST',
    data: {
      roles
    }
  })
}
