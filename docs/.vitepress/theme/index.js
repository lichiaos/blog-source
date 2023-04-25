// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    // 注册一个全局组件
    app.component('MyGlobalComponent', /* ... */)
  }
}
