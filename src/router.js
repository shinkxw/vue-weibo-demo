// require(['./views/Bar.vue'], function (MyComponent) {
//   // code here runs after MyComponent.vue is asynchronously loaded.
// })

module.exports = function(router){
  router.map({
    '/index': {
      name: 'index', component: require('./views/index.vue')
    },
    '/contact': {
      name: 'contact', component: require('./views/contact.vue')
    },
    '/user': {
      name: 'user',
      component: require('./views/user/main.vue'),
      subRoutes: {
        '/:id': {
          name: 'user_show', component: require('./views/user/show.vue')
        },
        '/signup': {
          name: 'user_signup', component: require('./views/user/signup.vue')
        },
      }
    },
    '/micropost': {
      name: 'micropost',
      component: require('./views/micropost/main.vue'),
      subRoutes: {
        '/list': {
          name: 'micropost_list', component: require('./views/micropost/list.vue')
        },
        '/:id': {
          name: 'micropost_show', component: require('./views/micropost/show.vue')
        },
        '/new': {
          name: 'micropost_new',  component: require('./views/micropost/new.vue')
        },
        '/edit/:id': {
          name: 'micropost_edit', component: require('./views/micropost/edit.vue')
        }
      }
    }
  })

  router.redirect({
    '*': "/index"//默认主页
  });

  // (rs) => {require(['./views/micropost/list.vue'], rs)}//异步加载组件

  // router.beforeEach(function () {
  //   window.scrollTo(0, 0)
  // })
}
