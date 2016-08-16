<template>
  <div class="row">
    <aside class="col-md-4">
      <section class="user_info">
        <h1>
          <gravatar :alt="user.name" :email="user.email"></gravatar>
          {{ user.name }}
        </h1>
      </section>
      <section class="stats">
        <userstats-view v-if="uid" :id="uid"></userstats-view>
      </section>
    </aside>
    <div class="col-md-8">
      <template v-if="paginate_param && (micropost_all_count > 0)">
        <h3>微博 ({{ micropost_all_count }})</h3>
        <ol class="microposts">
          <micropost-view v-for="m of microposts" :micropost="m" :index="$index">
          </micropost-view>
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
        uid: null,
        user: {},
        microposts: [],
        micropost_all_count: 1,
        paginate_param: null,
        micropost_resource: micropost_resource
      }
    },
    route:{
      data(transition) {
        this.uid = transition.to.params.id
        this.paginate_param = { user_id: this.uid }
        return {
          user: user_resource.get({id: this.uid}).then((res) => { return res.json() })
        }
      }
    },
    events: {
      // 分页组件传回的表格数据
      'data' (res) {
        this.microposts = res.data
        this.micropost_all_count = res.all_count
        window.scrollTo(0, 0)
      },
      'delete_micropost' (index) {
        this.microposts.splice(index, 1)
      }
    }
  }
</script>
