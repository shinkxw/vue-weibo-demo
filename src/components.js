module.exports = function(Vue){
  //复用页面
  Vue.component('errorMessageView', require('./views/shared/error_message.vue'))

  //组件
  Vue.component('gravatar', require('./components/gravatar.vue'))
  Vue.component('fieldInput', require('./components/field_input.vue'))

  //实例
  require('./data/login_info.js')(Vue)
}
