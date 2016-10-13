'use strict'

import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import Resources from './resources'
import Mixin from './mixin'
import ComponentsMap from './components'
import Routes from './routes'
import RouterConfig from './router_config'
import Filters from './filters'
require('bootstrap-loader');
window.utils = require('./libs/utils')

Mixin(Vue)//加载混入

Vue.use(Router)
window.router = new Router({ routes: Routes })
RouterConfig(router)

Vue.use(VueResource)
Resources(Vue, router)

Object.keys(Filters).forEach(k => Vue.filter(k, Filters[k]));

ComponentsMap(Vue)//加载组件
window.eventHub = new Vue()//事件中心

var app = new Vue({ el: '#app', router: router })
