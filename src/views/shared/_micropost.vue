<template>
  <li id="micropost-{{ micropost.id }}">
    <gravatar :alt="micropost.user.name" :email="micropost.user.email" size="50"></gravatar>
    <span class="user">
      <a v-link="{ name: 'user_show', params: { id: micropost.user_id } }">
        {{ micropost.user.name }}
      </a>
    </span>
    <span class="content">{{ micropost.content }}</span>
    <span class="timestamp">
      {{ micropost.created_at | getLastTimeStr true }} 发布
      <a v-if="micropost.user_id == cuid" style="cursor: pointer;" @click="delete">删除</a>
    </span>
  </li>
</template>

<script>
  export default {
    props: ['micropost', 'index'],
    methods:{
      delete(){
        if (confirm('此操作将不可恢复，确定要删除吗？'))
        {
          micropost_resource.delete({id: this.micropost.id}).then((response) => {
            flash_view.now(`该微博已被删除`, 'success')
            this.$dispatch('delete_micropost', this.index)
          })
        }
      }
    },
  }
</script>
