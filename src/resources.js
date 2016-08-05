module.exports = function(Vue){
  Vue.http.options.root = 'http://localhost:3000/api/v1'

  window.user_resource = Vue.resource('users{/id}', {}, userActions)
  window.micropost_resource = Vue.resource('microposts{/id}')
}
