<template>
  <header class="navbar navbar-fixed-top navbar-inverse">
    <div class="container">
      <a id="logo" v-link="{ name: 'index' }">Vue Weibo Demo</a>
      <nav>
        <ul class="nav navbar-nav navbar-right">
          <li><a v-link="{ name: 'index' }">主页</a></li>
          <template v-if="is_logged">
            <li><a v-link="{ name: 'user_list' }">用户</a></li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                账户 <b class="caret"></b>
              </a>
              <ul class="dropdown-menu">
                <li><a v-link="{ name: 'user_show', params: { id: cuid } }">个人信息</a></li>
                <li><a v-link="{ name: 'user_edit_self' }">设置</a></li>
                <li class="divider"></li>
                <li> <a href="#" @click="log_out">登出</a></li>
              </ul>
            </li>
          </template>
          <li v-else><a v-link="{ name: 'user_login' }">登录</a></li>
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
