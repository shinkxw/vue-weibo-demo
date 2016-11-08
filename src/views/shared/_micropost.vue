<template>
  <li :id="li_id">
    <gravatar :alt="micropost.user.name" :email="micropost.user.email" size="50"></gravatar>
    <span class="user">
      <router-link :to="{ name: 'user_show', params: { id: micropost.user_id } }">
        {{ micropost.user.name }}
      </router-link>
    </span>
    <span class="content">{{ micropost.content }}</span>
    <span class="timestamp">
      {{ micropost.created_at | getLastTimeStr(true) }} 发布
      <a v-if="micropost.user_id == cuid" style="cursor: pointer;" @click="del">删除</a>
    </span>
  </li>
</template>

<script>
  export default {
    props: ['micropost', 'index'],
    computed: {
      li_id() {
        return 'micropost-' + this.micropost.id
      }
    },
    methods:{
      del(){
        if (confirm('此操作将不可恢复，确定要删除吗？'))
        {
          axios.delete(`microposts/${this.micropost.id}`).then((res) => {
            flash_view.now(`该微博已被删除`, 'success')
            this.$emit('delete_micropost', this.index)
          })
        }
      }
    },
  }
</script>
