<template>
  <nav class="navbar navbar-inverse navbar-fixed-top">
    <div class="container">
      <div class="navbar-header">
        <a class="navbar-brand" href="#">Vue Demo</a>
      </div>
      <div id="navbar" class="collapse navbar-collapse">
        <ul class="nav navbar-nav">
          <li><a v-link="{ name: 'index' }">首页</a></li>
          <li><a v-link="{ name: 'micropost_list' }">微博</a></li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="container" id="main">
    <router-view></router-view>
  </div>
</template>

<!-- <style src="./assets/css/app-base.css"></style> -->
<style>
  body {
    padding-top: 50px;
  }
  #main {
    padding-top: 1rem;
  }
</style>
