module.exports = function(Vue){
  window.login_info = new Vue({
    data: {
      jwt: null,
      user: null
    },
    created: function () {
      let auth_jwt = sessionStorage.getItem("auth_jwt")
      if (auth_jwt)
      {
        this.set_data(auth_jwt)
      }
    },
    methods: {
      log_in: function (jwt) {
        this.set_data(jwt)
        sessionStorage.setItem('auth_jwt', jwt)//存储jwt
      },
      set_data: function (jwt) {
        this.jwt = jwt
        this.user = utils.JwtDecode(jwt).payload//jwt解码获得用户信息
      },
      log_out: function() {
        this.jwt = null
        this.user = null
        sessionStorage.removeItem("auth_jwt")
        // localStorage.removeItem("auth_jwt")
      }
    }
  })
}
