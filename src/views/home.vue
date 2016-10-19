<template>
  <div>
    <template v-if="is_logged">
      <div class="row">
        <aside class="col-md-4">
          <section class="user_info">
            <gravatar :alt="current_user.name" :email="current_user.email" size="50"></gravatar>
            <h1>{{ current_user.name }}</h1>
            <span>
              <router-link :to="{ name: 'user_show', params: { id: cuid } }">
                查看个人信息
              </router-link>
            </span>
            <span>{{ microposts_count }} 条微博</span>
          </section>
          <section class="stats">
            <userstats-view :id="cuid"></userstats-view>
          </section>
          <section class="micropost_form">
            <error-message-view :message="error_message"></error-message-view>
            <div class="field">
              <textarea v-model="micropost.content" placeholder="编写新的微博..."></textarea>
            </div>
            <input class="btn btn-primary" type="button" @click="postMicropost" value="提交" />
          </section>
        </aside>
        <div class="col-md-8">
          <h3>微博动态</h3>
          <template v-if="paginate_param && (microposts_count > 0)">
            <ol class="microposts">
              <micropost-view v-for="(m, index) of microposts" :micropost="m" :index="index">
              </micropost-view>
            </ol>
            <paginate ref="paginate" :resource="user_resource" method="feed" :param="paginate_param"></paginate>
          </template>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="center jumbotron">
        <h1>欢迎来到 Vue weibo demo</h1>
        <h2>
          这是一个使用 <a href="http://cn.vuejs.org/">Vue.js</a> 搭建的应用
        </h2>
        <router-link class="btn btn-lg btn-primary" :to="{ name: 'user_signup' }">
          现在注册!
        </router-link>
      </div>
    </template>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        micropost: {content: ''},
        error_message: '',
        microposts_count: 0,

        microposts: [],
        paginate_param: null,
        user_resource: user_resource
      }
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      fetchData() {
        if (this.is_logged) {
          this.refresh_microposts_count()
          this.paginate_param = { id: this.cuid }
        }
      },
      postMicropost(){
        micropost_resource.save(this.micropost).then((response) => {
          this.error_message = ''
          this.refresh_microposts_count()
          this.refresh_microposts()
          flash_view.next('微博发布成功', 'success')
          this.micropost = {content: ''}
        }, (response) => {
          if (response.status == 422)
          {
            this.error_message = `微博内容${response.json().content}`
          }
        });
      },
      refresh_microposts_count(){
        user_resource.microposts_count({id: this.cuid})
        .then((res) => { this.microposts_count = res.json() })
      },
      refresh_microposts () {
        this.$refs.paginate.refresh()
      },
      paginateData(res) {
        this.microposts = res.data
        window.scrollTo(0, 0)
      },
      deleteMicropost(index) {
        this.microposts.splice(index, 1)
        this.refresh_microposts_count()
      }
    },
    created: function () {
      this.fetchData()
      eventHub.$on('paginate_data', this.paginateData)
      eventHub.$on('delete_micropost', this.deleteMicropost)
    },
    beforeDestroy: function () {
      eventHub.$off('paginate_data', this.paginateData)
      eventHub.$off('delete_micropost', this.deleteMicropost)
    }
  }
</script>
