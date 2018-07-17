const isDev = process.env.NODE_ENV === 'development'

// app
export const APPCONFIG = {
  isDebug: true
}

// cookie 设置
export const COOKIECONFIG = {
  expiresDay: 7
}

// server 设置
export const SERVERCONFIG = {
  domain: isDev ? 'http://127.0.0.1:5766' : '',
  timeout: 10000
}
