<template>
  <h1>所有用户</h1>
  <ul class="users">
    <li v-for="user of users">
      <gravatar :alt="user.name" :email="user.email" size="50"></gravatar>
      <a v-link="{name: 'user_show',params: { id: user.id }}">{{user.name}}</a>
      <template v-if="is_admin && user.id != cuid">
        | <a style="cursor: pointer;" @click="deleteUser(user.id, $index)">删除</a>
      </template>
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
    methods:{
      deleteUser(id, index){
        if (confirm('此操作将不可恢复，确定要删除吗？'))
        {
          user_resource.delete({id: id}).then((response) => {
            let delete_user = this.users.splice(index, 1)[0]
            flash_view.now(`用户${delete_user.name}已被删除`, 'success')
          })
        }
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
