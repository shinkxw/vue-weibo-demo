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
        sessionStorage.setItem('alert_message', message)
        sessionStorage.setItem('alert_info', type)
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
