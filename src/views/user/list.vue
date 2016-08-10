<template>
  <h1>所有用户</h1>
  <ul class="users">
    <li v-for="user of users">
      <gravatar :alt="user.name" :email="user.email" size="50"></gravatar>
      <a v-link="{name: 'user_show',params: { id: user.id }}">{{user.name}}</a>
    </li>
  </ul>
  <paginate :resource="user_resource"></paginate>
</template>

<script>
  export default {
    data() {
      return {
        users: [],
        user_resource: user_resource
      }
    },
    events: {
      // 分页组件传回的表格数据
      'data' (data) {
        this.users = data
        window.scrollTo(0, 0)
      }
    }
  }
</script>
