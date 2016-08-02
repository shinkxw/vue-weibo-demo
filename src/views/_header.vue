<template>
  <header class="navbar navbar-fixed-top navbar-inverse">
    <div class="container">
      <a id="logo" v-link="{ name: 'index' }">Vue Weibo Demo</a>
      <nav>
        <ul class="nav navbar-nav navbar-right">
          <li><a v-link="{ name: 'index' }">主页</a></li>
          <li><a v-link="{ name: 'index' }">帮助</a></li>
          <li><a v-link="{ name: 'index' }">登录</a></li>
        </ul>
      </nav>
    </div>
  </header>
</template>
