module.exports = function(Vue){
  //全局混入
  var AppMixin = {
    computed: {
      is_logged: function () {
        return login_info.jwt
      }
    },
    methods: {
    }
  }

  Vue.mixin(AppMixin)
}
