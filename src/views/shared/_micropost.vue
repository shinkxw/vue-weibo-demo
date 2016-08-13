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
    </span>
  </li>
</template>

<script>
  export default {
    props: ['micropost']
  }
</script>
