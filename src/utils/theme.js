import formula from '@/constant/formula.json'
import rgbHex from 'rgb-hex'
import axios from 'axios'
import color from 'css-color-function'

// 把生成的样式表写入style
export const writeNewStyle = (elNewStyle) => {
  const style = document.createElement('style')
  style.innerText = elNewStyle
  document.head.appendChild(style)
}

/*
 *根据主题色 生成最新的样式表
 */
export const generateNewStyle = async (parimaryColor) => {
  // 1. 根据主色生成色值表
  const colors = generateColors(parimaryColor)

  // 2. 获取当前默认样式表，并且把需要替换的色值打上标记
  let cssText = await getOriginalStyle()

  // 3. 遍历生成的色值表，在默认样式表全局替换
  Object.keys(colors).forEach((key) => {
    cssText = cssText.replace(
      new RegExp('(:|\\s+)' + key, 'g'),
      '$1' + colors[key]
    )
  })
  // console.log(cssText)
  return cssText
}

export const generateColors = (primary) => {
  if (!primary) {
    return
  }
  const colors = {
    primary
  }

  Object.keys(formula).forEach((key) => {
    // console.log(formula[key])
    const value = formula[key].replace(/primary/g, primary)
    // 转化rgb颜色为十六进制
    // console.log(value)
    colors[key] = '#' + rgbHex(color.convert(value))
  })
  // console.log(colors)

  return colors
}

// 获取当前element-plus的默认样式表
const getOriginalStyle = async () => {
  const version = require('element-plus/package.json').version
  const url = `https://unpkg.com/element-plus@${version}/dist/index.css`
  const { data } = await axios(url)
  // console.log(data)
  return getStyleTemplate(data)
}

// 把需要替换的色值打上标记
const getStyleTemplate = (data) => {
  // element-plus 默认色值
  const colorMap = {
    '#3a8ee6': 'shade-1',
    '#409eff': 'primary',
    '#53a8ff': 'light-1',
    '#66b1ff': 'light-2',
    '#79bbff': 'light-3',
    '#8cc5ff': 'light-4',
    '#a0cfff': 'light-5',
    '#b3d8ff': 'light-6',
    '#c6e2ff': 'light-7',
    '#d9ecff': 'light-8',
    '#ecf5ff': 'light-9',
    '#337ecc': 'primary'
  }
  Object.keys(colorMap).forEach((key) => {
    const value = colorMap[key]
    data = data.replace(new RegExp(key, 'ig'), value)
  })
  return data
}
