<template>
  <div>
    <header-view></header-view>
    <div class="container">
      <flash-view ref="flash"></flash-view>
      <router-view></router-view>
      <footer-view></footer-view>
    </div>
  </div>
</template>

<script>
  export default {
    watch: {
      '$route': 'flash_refresh'
    },
    methods: {
      flash_refresh() {
        this.$refs.flash.refresh()//刷新组件数据
      },
    },
    components:{
      "headerView": require('./_header.vue'),
      "flashView": require('./_flash.vue'),
      "footerView": require('./_footer.vue')
    }
  }
</script>
