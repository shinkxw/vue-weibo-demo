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
        return login_info.user ? login_info.user.id : null
      },
      is_admin: function () {
        return login_info.user ? login_info.user.admin : false
      },
    },
    methods: {
      after_login(){
        let forwarding_url = sessionStorage.getItem('forwarding_url')
        if (forwarding_url)
        {
          sessionStorage.removeItem('forwarding_url')
          router.push({ path: forwarding_url })
        }
        else
        {
          router.push({ name:'home' })
        }
      },
      log_out(){
        login_info.log_out()
        flash_view.next('已登出')
        router.push({name:'home'})
      }
    }
  }

  Vue.mixin(AppMixin)
}
