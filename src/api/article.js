import request from '@/utils/request'

/**
 * 获取所有文章
 */
export const getArticleList = (data) => {
  return request({
    url: '/article/list',
    params: data
  })
}
/**
 * 修改排序
 */
export const articleSort = (data) => {
  return request({
    url: '/article/sort',
    method: 'POST',
    data
  })
}
/**
 * 删除文章
 */
export const deleteArticle = (id) => {
  return request({
    url: `/article/delete/${id}`
  })
}
/**
 * 获取文章详情
 */
export const articleDetail = (id) => {
  return request({
    url: `/article/${id}`
  })
}
/**
 * 创建文章
 */
export const createArticle = (data) => {
  return request({
    url: '/article/create',
    method: 'POST',
    data
  })
}
