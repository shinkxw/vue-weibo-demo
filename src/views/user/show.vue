<template>
  <div class="row">
    <aside class="col-md-4">
      <section class="user_info">
        <h1>
          <img class="gravatar" :alt="user.name" src="{{user.email | gravatar_url}}">
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
    }
  }
</script>
<style scoped lang="sass">
  #main {
    text-align: center;
  }
  /* sidebar */
  aside {
    section.user_info {
      margin-top: 20px;
    }
    section {
      padding: 10px 0;
      margin-top: 20px;
      &:first-child {
        border: 0;
        padding-top: 0;
      }
      span {
        display: block;
        margin-bottom: 3px;
        line-height: 1;
      }
      h1 {
        font-size: 1.4em;
        text-align: left;
        letter-spacing: -1px;
        margin-bottom: 3px;
        margin-top: 0px;
      }
    }
  }
  .gravatar {
    float: left;
    margin-right: 10px;
  }
  .gravatar_edit {
    margin-top: 15px;
  }
</style>
