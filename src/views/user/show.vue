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
      data(transition) {
        let uid = transition.to.params.id
        return {
          user: user_resource.get({id: uid}).then((res) => { return res.json() })
        }
      }
    }
  }
</script>
