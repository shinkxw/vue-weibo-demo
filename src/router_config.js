module.exports = function(router){
  router.beforeEach(function (to, from, next) {
    if (to.matched.some(record => record.meta.auth)) {
      if (!login_info.jwt)//未登录
      {
        flash_view.next('请先登录', 'danger')
        sessionStorage.setItem('forwarding_url', transition.to.path)
        next({name: 'user_login'})
      }
      else
      {
        next()
      }
    }
    else
    {
      next()
    }
  })
}
