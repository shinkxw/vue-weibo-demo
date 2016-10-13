module.exports = [
  { path: '/', component: require('./views/layouts/main.vue'),
    children: [
      { path: '', redirect: { name: 'home' }},
      { path: 'home', name: 'home', component: require('./views/home.vue') },
      { path: 'about', name: 'about', component: require('./views/about.vue') },
      { path: 'user', name: 'user', component: require('./views/user/layout.vue'),
        children: [
          {
            path: 'list', name: 'user_list',
            component: require('./views/user/list.vue'),
            meta: { auth: true }
          },
          {
            path: 'signup', name: 'user_signup',
            component: require('./views/user/signup.vue'),
            meta: { auth: false }
          },
          {
            path: 'edit_self', name: 'user_edit_self',
            component: require('./views/user/edit_self.vue'),
            meta: { auth: true }
          },
          {
            path: 'login', name: 'user_login',
            component: require('./views/user/login.vue'),
            meta: { auth: false }
          },
          {
            path: ':id', name: 'user_show',
            component: require('./views/user/show.vue'),
            meta: { auth: false }
          },
          {
            path: ':id/following', name: 'user_following',
            component: require('./views/user/show_follow.vue'),
            meta: { auth: true }
          },
          {
            path: ':id/followers', name: 'user_followers',
            component: require('./views/user/show_follow.vue'),
            meta: { auth: true }
          }
        ]
      }
    ]
  },
  { path: '*', redirect: { name: 'home' }}
]
