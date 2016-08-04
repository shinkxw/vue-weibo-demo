<template>
  <div class="row">
    <aside class="col-md-4">
      <section class="user_info">
        <h1>
          <img class="gravatar" :alt="user.name" :src="gravatar_url()">
          {{ user.name }}
        </h1>
      </section>
    </aside>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        user: {}
      }
    },
    route:{
      data: function (transition) {
        let uid = transition.to.params.id
        return {
          user: user_resource.get({id: uid}).then((res) => { return res.json() })
        }
      }
    },
    methods: {
      gravatar_url: function (size = 80) {
        if (this.user.email)
        {
          let md5 = utils.md5(this.user.email)
          return `https://secure.gravatar.com/avatar/${md5}?s=${size}`
        }
      }
    }
  }
</script>
