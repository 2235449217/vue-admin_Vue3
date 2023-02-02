<template>
  <div class="article-create">
    <el-card>
      <el-input
        class="title-input"
        :placeholder="$t('msg.article.titlePlaceholder')"
        v-model="title"
        maxlength="20"
        clearable
      >
      </el-input>
      <el-tabs v-model="activeName">
        <el-tab-pane :label="$t('msg.article.markdown')" name="markdown">
          <markdown
            :title="title"
            @onSuccess="onSuccess"
            :detail="detail"
          ></markdown>
        </el-tab-pane>
        <el-tab-pane :label="$t('msg.article.richText')" name="editor">
          <editor
            :title="title"
            @onSuccess="onSuccess"
            :detail="detail"
          ></editor>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup>
import Editor from './components/Editor.vue'
import Markdown from './components/Markdown.vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const activeName = ref('markdown')
const title = ref('')
// 处理编辑相关
const route = useRoute()
const articleId = route.params.id
const detail = ref({})
const getArticleDetail = async () => {
  detail.value = {
    _id: '612afcf2ba2d4031d04d1bff',
    ranking: 1,
    author: '皮皮',
    title: '爱吃葡萄的皮皮',
    desc: '我是爱吃葡萄的皮皮',
    content: '<h3>爱吃葡萄的皮皮啊</h3>',
    publicDate: '1630207218610',
    __v: 0
  }
  // 标题赋值
  title.value = detail.value.title
}
if (articleId) {
  console.log('我获取数据了')
  getArticleDetail()
}
const onSuccess = () => {
  title.value = ''
}
</script>

<style lang="scss" scoped>
.title-input {
  margin-bottom: 20px;
}
</style>
