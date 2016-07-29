// require(['./views/Bar.vue'], function (MyComponent) {
//   // code here runs after MyComponent.vue is asynchronously loaded.
// })

module.exports = function(router){
  router.map({
    '/index': {
      name: 'index', component: require('./views/index.vue')
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

  // (rs) => {require(['./views/micropost/list.vue'], rs)}//异步加载组件

  // router.beforeEach(function () {
  //   window.scrollTo(0, 0)
  // })

  // router.redirect({
  //   '*': '/news/1'
  // })
}
