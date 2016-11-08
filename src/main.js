'use strict'

import Vue from 'vue'
import Router from 'vue-router'
import Mixin from './mixin'
import ComponentsMap from './components'
import Routes from './routes'
import Filters from './filters'
import axios from 'axios'
require('bootstrap-loader');
window.utils = require('./libs/utils')

Mixin(Vue)//加载混入

Vue.use(Router)
window.router = new Router({ routes: Routes })
router.beforeEach(function (to, from, next) {
  if (to.matched.some(record => record.meta.auth)) {
    if (!login_info.jwt)//未登录
    {
      flash_view.next('请先登录', 'danger')
      sessionStorage.setItem('forwarding_url', transition.to.path)
      next({name: 'user_login'})
    }
    else { next() }
  }
  else { next() }
})

window.axios = axios
axios.defaults.baseURL = 'http://localhost:3000/api/v1'
axios.interceptors.request.use((config) => {
  let jwt = login_info.jwt
  if (jwt) {
    config.headers['Authorization'] = `Token ${jwt}`
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});
axios.interceptors.response.use((response) => {
  return response;
}, function (error) {
  let response = error.response
  switch(response.status)
  {
    case 0://服务器未响应
      flash_view.now('服务器未响应, 请稍后刷新重试', 'danger')
      break
    case 200: break
    case 201: break//添加成功
    case 204: break
    case 401://未登录
      flash_view.next(response.data, 'danger')
      sessionStorage.setItem('forwarding_url', router.currentRoute.path)
      router.push({name:'user_login'})
      break
    case 403://没有权限访问
      flash_view.next(response.data, 'danger')
      router.push({name:'home'})
      break
    case 422: break
    default:
      alert(response.status)
      alert(response.statusText)
      alert(response.data)
  }
  return Promise.reject(error);
});

Object.keys(Filters).forEach(k => Vue.filter(k, Filters[k]));

ComponentsMap(Vue)//加载组件

var app = new Vue({ el: '#app', router: router })
