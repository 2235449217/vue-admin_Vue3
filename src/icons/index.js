import svgIcon from '@/components/SvgIcon'
// 导入所有svg图标
const svgRequire = require.context('./svg', false, /\.svg$/)
svgRequire.keys().forEach((svgIcon) => {
  svgRequire(svgIcon)
})
// 完成SvgIcon的全局注册
export default (app) => {
  app.component('svg-icon', svgIcon)
}
