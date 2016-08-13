<template>
  <div class="row">
    <aside class="col-md-4">
      <section class="user_info">
        <h1>
          <gravatar :alt="user.name" :email="user.email"></gravatar>
          {{ user.name }}
        </h1>
      </section>
    </aside>
    <div class="col-md-8">
      <template v-if="paginate_param && (micropost_all_count > 0)">
        <h3>微博 ({{ micropost_all_count }})</h3>
        <ol class="microposts">
          <micropost-view v-for="m of microposts" :micropost="m" ></micropost-view>
        </ol>
        <paginate :resource="micropost_resource" :param="paginate_param"></paginate>
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        user: {},
        microposts: [],
        micropost_all_count: 1,
        paginate_param: null,
        micropost_resource: micropost_resource
      }
    },
    route:{
      data(transition) {
        let uid = transition.to.params.id
        this.paginate_param = { user_id: uid }
        return {
          user: user_resource.get({id: uid}).then((res) => { return res.json() })
        }
      }
    },
    events: {
      // 分页组件传回的表格数据
      'data' (res) {
        this.microposts = res.data
        this.micropost_all_count = res.all_count
        window.scrollTo(0, 0)
      }
    }
  }
</script>
