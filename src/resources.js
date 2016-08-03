module.exports = function(Vue){
  let root_path = 'http://localhost:3000/api/v1/'
  window.user_resource = Vue.resource(root_path + 'users{/id}')
  window.micropost_resource = Vue.resource(root_path + 'microposts{/id}')
}
