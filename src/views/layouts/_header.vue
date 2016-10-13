<template>
  <header class="navbar navbar-fixed-top navbar-inverse">
    <div class="container">
      <router-link id="logo" :to="{ name: 'home' }">Vue Weibo Demo</router-link>
      <nav>
        <ul class="nav navbar-nav navbar-right">
          <li><router-link :to="{ name: 'home' }">主页</router-link></li>
          <template v-if="is_logged">
            <li><router-link :to="{ name: 'user_list' }">用户</router-link></li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                账户 <b class="caret"></b>
              </a>
              <ul class="dropdown-menu">
                <li>
                  <router-link :to="{ name: 'user_show', params: { id: cuid } }">
                    个人信息
                  </router-link>
                </li>
                <li><router-link :to="{ name: 'user_edit_self' }">设置</router-link></li>
                <li class="divider"></li>
                <li> <a href="#" @click="log_out">登出</a></li>
              </ul>
            </li>
          </template>
          <li v-else><router-link :to="{ name: 'user_login' }">登录</router-link></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
  .dropdown-menu {
    right: inherit !important;
  }
</style>
