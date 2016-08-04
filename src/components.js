module.exports = function(Vue){
  //shared views
  Vue.component('errorMessageView', require('./views/shared/error_message.vue'))

  //components
  Vue.component('fieldInput', require('./components/field_input.vue'))

}
