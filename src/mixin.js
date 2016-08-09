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
    },
    methods: {
      flash(message, type = 'info'){
        utils.flash(message, type)
      },
      after_login(){
        let forwarding_url = sessionStorage.getItem('forwarding_url')
        if (forwarding_url)
        {
          sessionStorage.removeItem('forwarding_url')
          this.$route.router.go({ path: forwarding_url })
        }
        else
        {
          this.$route.router.go({ name:'user_show', params: { id: this.cuid } })
        }
      },
      log_out(){
        login_info.log_out()
        this.flash('已登出')
        this.$route.router.go({name:'index'})
      }
    }
  }

  Vue.mixin(AppMixin)
}
