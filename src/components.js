module.exports = function(Vue){
  //shared views
  Vue.component('errorMessagesView', require('./views/shared/error_messages.vue'))

  //components
  Vue.component('fieldInput', require('./components/field_input.vue'))

}
