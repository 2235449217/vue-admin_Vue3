// import { createArticle } from '@/api/article'
import { ElMessage } from 'element-plus'
import i18n from '@/i18n'

const t = i18n.global.t

export const commitArticle = async (data) => {
  // const res = await createArticle(data)
  console.log(data)
  ElMessage.success(t('msg.article.createSuccess'))
}
