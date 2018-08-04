module.exports = {
  // html
  head: {
    title: 'JsonMaker一个JSON制造器',
    meta: [
      { charset: 'utf-8' },
      { name: 'author', content: 'Qymh' },
      { name: 'keywords', content: 'Json,JSON,JsonMaker'},
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { 
        hid: 'description',
        name: 'description',
        content: 'JsonMaker用户制造JSON,一个全栈项目,前端基于Nuxt Vuex Pug Scss Axios element-ui 后端基于 Node Express mongoose mongodb jsonwebtoken' 
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  // 全局css
  css: [
    // reset css
    '~/assets/style/normalize.css',
    // common css
    '~/assets/style/common.css',
    // element-ui css
    'element-ui/lib/theme-chalk/index.css'
  ],
  // 加载颜色
  loading: { color: '#409EFF' },
  // 插件
  plugins: [
    // element-ui
    { src: '~/plugins/element-ui' },
    // widget
    { src: '~/plugins/widget' }
  ],
  // webpack配置
  build: {
    extend(config, { isDev, isClient }) {
      // eslint
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      config.module.rules.push(
        // pug
        {
          test: /\.pug$/,
          loader: 'pug-plain-loader'
        },
        // scss
        {
          test: /\.scss$/,
          use: [
            'vue-style-loader',
            'css-loader',
            'sass-loader',
            'postcss-loader'
          ]
        }
      )
    },
    // postcss配置
    postcss: [require('autoprefixer')()],
    // 公用库
    vendor: [
      'axios',
      'element-ui'
    ]
  },
  router: {
    // 认证中间件
    middleware: 'authenticate'
  }
}
