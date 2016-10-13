<template>
  <div class="row">
    <aside class="col-md-4">
      <section class="user_info">
        <gravatar :alt="user.name" :email="user.email"></gravatar>
        <h1>{{ user.name }}</h1>
        <span>
          <router-link :to="{ name: 'user_show', params: { id: uid } }">查看个人信息</router-link>
        </span>
        <span>{{ microposts_count }} 条微博</span>
      </section>
      <section class="stats">
        <userstats-view v-if="uid" :id="uid"></userstats-view>
        <div v-if="users_all_count > 0" class="user_avatars">
          <router-link v-for="u of users" :to="{name: 'user_show',params: { id: u.id }}">
            <gravatar :alt="u.name" :email="u.email" size="30"></gravatar>
          </router-link>
        </div>
      </section>
    </aside>
    <div class="col-md-8">
      <h3>{{ resource_method == 'following' ? '全部关注' : '粉丝' }}</h3>
      <template v-if="users_all_count > 0">
        <ul class="users follow">
          <li v-for="u of users">
            <gravatar :alt="u.name" :email="u.email" size="50"></gravatar>
            <router-link :to="{name: 'user_show',params: { id: u.id }}">{{u.name}}</router-link>
          </li>
        </ul>
        <paginate v-if="resource_method" :resource="user_resource" :method="resource_method" :param ="paginate_param"></paginate>
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
        users: [],
        users_all_count: 1,
        user_resource: user_resource,
        resource_method: null,
        paginate_param: null
      }
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      fetchData() {
        this.uid = this.$route.params.id
        this.paginate_param = { id: this.uid }
        this.resource_method = transition.to.path.split('/')[3]
        this.user = user_resource.get({id: this.uid}).then((res) => { return res.json() })
      },
      paginateData(res) {
        this.users = res.data
        this.users_all_count = res.all_count
        window.scrollTo(0, 0)
      }
    },
    created: function () {
      this.fetchData()
      eventHub.$on('paginate_data', this.paginateData)
    },
    beforeDestroy: function () {
      eventHub.$off('paginate_data', this.paginateData)
    }
  }
</script>
