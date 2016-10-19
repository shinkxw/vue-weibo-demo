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
        <userstats-view ref="userstats" v-if="uid" :id="uid"></userstats-view>
      </section>
    </aside>
    <div class="col-md-8">
      <follow-view v-if="is_logged && uid" :uid="uid"></follow-view>
      <template v-if="paginate_param && (micropost_all_count > 0)">
        <h3>微博 ({{ micropost_all_count }})</h3>
        <ol class="microposts">
          <micropost-view v-for="(m, index) of microposts" :micropost="m" :index="index">
          </micropost-view>
        </ol>
        <paginate :resource="user_resource" method="microposts" :param="paginate_param"></paginate>
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
        user_resource: user_resource
      }
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      fetchData() {
        this.uid = this.$route.params.id
        this.paginate_param = { id: this.uid }
        user_resource.get({id: this.uid}).then((res) => { this.user = res.json() })
      },
      paginateData(res) {
        this.microposts = res.data
        this.micropost_all_count = res.all_count
        window.scrollTo(0, 0)
      },
      deleteMicropost(index) {
        this.microposts.splice(index, 1)
        this.micropost_all_count -= 1
      },
      followChanged() {
        this.$refs.userstats.refresh()
      }
    },
    created: function () {
      this.fetchData()
      eventHub.$on('paginate_data', this.paginateData)
      eventHub.$on('delete_micropost', this.deleteMicropost)
      eventHub.$on('follow_changed', this.followChanged)
    },
    beforeDestroy: function () {
      eventHub.$off('paginate_data', this.paginateData)
      eventHub.$off('delete_micropost', this.deleteMicropost)
      eventHub.$off('follow_changed', this.followChanged)
    }
  }
</script>
