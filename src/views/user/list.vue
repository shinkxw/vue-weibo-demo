<template>
  <div>
    <h1>所有用户</h1>
    <ul class="users">
      <li v-for="(user, index) of users">
        <gravatar :alt="user.name" :email="user.email" size="50"></gravatar>
        <router-link :to="{name: 'user_show',params: { id: user.id }}">{{user.name}}</router-link>
        <template v-if="is_admin && user.id != cuid">
          | <a style="cursor: pointer;" @click="deleteUser(user.id, index)">删除</a>
        </template>
      </li>
    </ul>
    <paginate :resource="user_resource"></paginate>
  <div>
</template>

<script>
  export default {
    data() {
      return {
        users: [],
        user_resource: user_resource
      }
    },
    methods:{
      deleteUser(id, index){
        if (confirm('此操作将不可恢复，确定要删除吗？'))
        {
          user_resource.delete({id: id}).then((response) => {
            let delete_user = this.users.splice(index, 1)[0]
            flash_view.now(`用户${delete_user.name}已被删除`, 'success')
          })
        }
      },
      paginateData(res) {
        this.users = res.data
        window.scrollTo(0, 0)
      }
    },
    created: function () {
      eventHub.$on('paginate_data', this.paginateData)
    },
    beforeDestroy: function () {
      eventHub.$off('paginate_data', this.paginateData)
    }
  }
</script>
