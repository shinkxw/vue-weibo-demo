<template>
  <header-view></header-view>
  <div class="container">
    <flash-view v-ref:flash></flash-view>
    <router-view></router-view>
    <footer-view></footer-view>
  </div>
</template>

<script>
  export default {
    route:{
      data(transition) {
        this.$refs.flash.flash()//刷新组件数据
        return {}
      }
    },
    components:{
      "headerView": require('./_header.vue'),
      "flashView": require('./_flash.vue'),
      "footerView": require('./_footer.vue')
    }
  }
</script>
