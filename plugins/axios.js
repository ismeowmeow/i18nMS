import { Notification } from 'element-ui'
import { MessageBox } from 'element-ui'
import { utilCookies } from '../utils/cookies'
// import qs from 'qs'
import testApi from '../api/test'

// 错误提示
const errorNotice = message => {
  Notification.error({
    message,
    duration: 2000
  })
}
// 错误提示
const messageBox = (option) => {
  option.type === undefined && (option.type = 'warning')
  option.showClose === undefined && (option.showClose = true)
  option.showCancelButton === undefined && (option.showCancelButton = true)
  option.confirmFunc === undefined && (option.confirmFunc = () => {})
  option.cancelFunc === undefined && (option.cancelFunc = () => {})

  MessageBox({
    type: option.type,
    title: i18n.t('global.tip'),
    message: option.message,
    confirmButtonText: i18n.t('global.confirm'),
    showCancelButton: option.showCancelButton,
    showClose: option.showClose,
    cancelButtonText: i18n.t('global.cancel'),
    closeOnClickModal: false
  }).then(() => {
    option.confirmFunc()
  }).catch(err => {
    option.cancelFunc()
    console.log(`messageBox ${err}`)
  })
}

//环境变量
// const demoEnv = process.env.DEMO_ENV;
const baseURL = '/api';

export default ({app, $axios, redirect, store}, inject) => {
  $axios.defaults.timeout = 20000;
  $axios.defaults.baseURL = process.env.baseUrl
  
  // 添加公共请求头
  $axios.setHeader('FMS-SESSION-ID', utilCookies.getToken())
  $axios.setHeader('Accept-Language', app.i18n.locale)

  // 请求正常
  $axios.onRequest(config => {
    if (config.url) {
      return config
    }
    throw $axios.Cancel()
  });
  // 请求异常
  $axios.onRequestError(error => {
    errorNotice(error.message)
    return Promise.reject(error)
  })
  // 响应正常
  $axios.onResponse(response => {
    const code = response.data.code ? response.data.code : response.status

    // if (code !== undefined) {
    //   if (code === 1) {
        return response.data
    //   } else if (code === 20640 || code === 20641 || code === 20642) {
    //     messageBox({
    //       message: i18n.t('global.login_expired'),
    //       showClose: false,
    //       showCancelButton: false,
    //       confirmFunc: () => {
    //         utilCookies.removeToken()
    //         window.location.reload()
    //       }
    //     })
    //     return Promise.reject(response.data)
    //   } else if (code === 20644) {
    //     store.dispatch('user/setOriginalPwd', true)
    //     return Promise.reject(response.data)
    //   } else {
    //     console.error('code非1：', response)
    //     errorNotice(response.data.message)
    //     return Promise.reject(response.data)
    //   }
    // } else if (response.config.action === 'only data') {
    //   return response.data
    // } else {
    //   errorNotice(response.data)
    //   return Promise.reject(response.data)
    // }
  });
  // 响应异常
  $axios.onResponseError(error => {
    let message = ''
    if (!error.response) message = error.message
    errorNotice(message)
    return Promise.reject(error)
  })

  // 返回值异常
  $axios.onError(error => {
    console.log(error)
    const status = error.response.status
      if (status === 401) {
        message = i18n.t('global.login_expired')
        utilCookies.removeToken()
        window.location.reload()
      } else if (status === 403) {
        message = i18n.t('global.no_permissions')
      } else if (error.response.data && error.response.data.message) {
        message = error.response.data.message
      } else if (error.response.data && error.response.data instanceof Blob) {
        const reader = new FileReader()
        reader.addEventListener('loadend', e => {
          const text = e.srcElement.result
          message = JSON.parse(text).message
        })
        reader.readAsText(error.response.data)
      } else {
        message = `server response error code ${status}`
      }
  });

  // 全局注入 api 列表
  const apiRepository = {
    ...testApi($axios)
  }

  inject('api', apiRepository);
}