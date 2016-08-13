module.exports = function(Vue){
  //全局混入
  var AppMixin = {
    computed: {
      is_logged: function () {
        return login_info.jwt
      },
      current_user: function () {
        return login_info.user
      },
      cuid: function () {
        return login_info.user.id
      },
      is_admin: function () {
        return login_info.user ? login_info.user.admin :false
      },
    },
    methods: {
      after_login(){
        let forwarding_url = sessionStorage.getItem('forwarding_url')
        if (forwarding_url)
        {
          sessionStorage.removeItem('forwarding_url')
          this.$route.router.go({ path: forwarding_url })
        }
        else
        {
          this.$route.router.go({ name:'home' })
        }
      },
      log_out(){
        login_info.log_out()
        flash_view.next('已登出')
        this.$route.router.go({name:'home'})
      }
    }
  }

  Vue.mixin(AppMixin)
}
