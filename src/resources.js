module.exports = function(Vue){
  Vue.http.options.root = 'http://localhost:3000/api/v1'

  var userActions = {
    login: {method: 'POST', url: 'users/login'}
  }
  window.user_resource = Vue.resource('users{/id}', {}, userActions)
  window.micropost_resource = Vue.resource('microposts{/id}')


  Vue.http.interceptors.push((request, next) => {
    let jwt = login_info.jwt
    if (jwt) {
      request.headers['Authorization'] = `Token ${jwt}`
    }
    // continue to next interceptor
    next();
  });
}
