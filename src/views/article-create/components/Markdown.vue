<template>
  <div class="markdown-container">
    <div id="markdown-box"></div>
    <div class="bottom">
      <el-button type="primary" @click="onSubmitClick">{{
        $t('msg.article.commit')
      }}</el-button>
    </div>
  </div>
</template>

<script setup>
import MKEditor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/i18n/zh-cn'
import { useStore } from 'vuex'
import { onMounted, defineProps, defineEmits, watch } from 'vue'
import { watchSwitchLang } from '@/utils/i18n'
import { commitArticle } from './commit'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  detail: {
    type: Object
  }
})
const emits = defineEmits(['onSuccess'])
let mkEditor
let el
const store = useStore()
const initEditor = () => {
  mkEditor = new MKEditor({
    el,
    height: '500px',
    previewStyle: 'vertical',
    language: store.getters.language === 'zh' ? 'zh-CN' : 'en'
  })
  mkEditor.getMarkdown()
}

onMounted(() => {
  el = document.querySelector('#markdown-box')
  initEditor()
  // console.log('我初始化了')
  watch(
    () => props.detail,
    (val) => {
      if (val && val.content) {
        mkEditor.setHTML(val.content)
      }
    },
    {
      immediate: true
    }
  )
})
const onSubmitClick = () => {
  commitArticle({
    title: props.title,
    content: mkEditor.getHTML()
  })
  mkEditor.reset()
  emits('onSuccess')
}
watchSwitchLang(() => {
  if (!el) {
    return
  }
  const htmlStr = mkEditor.getHTML()
  mkEditor.destroy()
  initEditor()
  mkEditor.setHTML(htmlStr)
})
</script>

<style lang="scss" scoped>
.markdown-container {
  .bottom {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
