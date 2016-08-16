// require(['./views/Bar.vue'], function (MyComponent) {
//   // code here runs after MyComponent.vue is asynchronously loaded.
// })

module.exports = function(router){
  router.map({
    '/': {
      component: require('./views/layouts/main.vue'),
      subRoutes: {
        '/home': { name: 'home', component: require('./views/home.vue') },
        '/about': { name: 'about', component: require('./views/about.vue') },
        '/user': {
          name: 'user',
          component: require('./views/user/layout.vue'),
          auth: true,
          subRoutes: {
            '/list': {
              name: 'user_list', component: require('./views/user/list.vue')
            },
            '/:id': {
              name: 'user_show', component: require('./views/user/show.vue'), auth: false
            },
            '/signup': {
              name: 'user_signup', component: require('./views/user/signup.vue'), auth: false
            },
            '/edit_self': {
              name: 'user_edit_self', component: require('./views/user/edit_self.vue')
            },
            '/login': {
              name: 'user_login', component: require('./views/user/login.vue'), auth: false
            }
          }
        },
      }
    }
  })

  router.redirect({
    '/': "/home",//默认主页
    '*': "/home"//默认主页
  });

  router.beforeEach(function (transition) {
    if (transition.to.auth) {
      if (!login_info.jwt)//未登录
      {
        flash_view.next('请先登录', 'danger')
        sessionStorage.setItem('forwarding_url', transition.to.path)
        transition.redirect({name:'user_login'})
      }
    }
    // window.scrollTo(0, 0)
    return true
  })

  router.afterEach(function (transition) {
    transition.to.router.current_route = transition.to
  })
  // (rs) => {require(['./views/micropost/list.vue'], rs)}//异步加载组件
}
