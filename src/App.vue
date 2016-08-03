<template>
<header-view></header-view>
  <div class="container">
    <flash-view></flash-view>
    <router-view></router-view>
    <footer-view></footer-view>
  </div>
</template>

<script>
  export default {
    components:{
      "headerView": require('./views/_header.vue'),
      "flashView": require('./views/_flash.vue'),
      "footerView": require('./views/_footer.vue')
    }
  }
</script>
