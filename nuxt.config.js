module.exports = {
  // html
  head: {
    title: 'jsonMaker',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '一个json制造器' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
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
  loading: { color: '#3B8070' },
  // 插件
  plugins:[
    '~/plugins/element-ui'
  ],
  // webpack配置
  build: {
    extend (config, { isDev, isClient }) {
      // eslint
      if (isDev && isClient) {
        config.module.rules.push(
          {
            enforce: 'pre',
            test: /\.(js|vue)$/,
            loader: 'eslint-loader',
            exclude: /(node_modules)/
          }
        )
      }
      // scss
      config.module.rules.push(
        {
          test: /\.pug$/,
          loader:'pug-plain-loader'
        },
        {
          test: /\.scss$/,
          use: ['vue-style-loader','css-loader','sass-loader','postcss-loader']
        }
      )
    },
    // postcss配置
    postcss: [
      require('autoprefixer')()
    ]
  }
}
