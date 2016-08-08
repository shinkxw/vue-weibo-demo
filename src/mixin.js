module.exports = function(Vue){
  //全局混入
  var AppMixin = {
    computed: {
      is_logged: function () {
        return login_info.jwt
      }
    },
    methods: {
      log_out(){
        login_info.log_out()
        this.flash('已登出')
        this.$route.router.go({name:'index'})
      }
    }
  }

  Vue.mixin(AppMixin)
}
