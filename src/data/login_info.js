module.exports = function(Vue){
  window.login_info = new Vue({
    data: {
      jwt: null,
      user: null,
      is_remember: false
    },
    created: function () {
      let session_jwt = sessionStorage.getItem("auth_jwt")
      if (session_jwt)
      {
        this.set_data(session_jwt)
      }
      else
      {
        let local_jwt = localStorage.getItem("auth_jwt")
        if (local_jwt)
        {
          this.set_data(local_jwt)
          this.is_remember = true
        }
      }
    },
    methods: {
      log_in: function (jwt, need_remember = false) {
        this.set_data(jwt)
        if (need_remember)
        {
          localStorage.setItem('auth_jwt', jwt)
          sessionStorage.removeItem("auth_jwt")
          this.is_remember = true
        }
        else
        {
          sessionStorage.setItem('auth_jwt', jwt)
          localStorage.removeItem("auth_jwt")
          this.is_remember = false
        }
      },
      set_data: function (jwt) {
        this.jwt = jwt
        this.user = utils.JwtDecode(jwt).payload//jwt解码获得用户信息
      },
      log_out: function() {
        this.jwt = null
        this.user = null
        sessionStorage.removeItem("auth_jwt")
        localStorage.removeItem("auth_jwt")
      }
    }
  })
}
