<template>
<header-view></header-view>
  <div class="container">
    <router-view></router-view>
    <footer-view></footer-view>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        microposts: []
      }
    },
    route:{
      data: function (transition) {
        return {
          microposts: micropost_resource.get().then((res) => { return res.json() })
        }
      }
    },
    methods:{
      deleteMicropost(mid, index){
        if (confirm('此操作将不可恢复，确定要删除吗？'))
        {
          micropost_resource.delete({id: mid}).then((response) => {
            this.microposts.splice(index, 1)// success callback
          }, (response) => {
            // error callback
          });
        }
      }
    },
    components:{
      "headerView": require('./views/_header.vue'),
      "footerView": require('./views/_footer.vue')
    }
  }
</script>
