<template>
  <img v-if="email" class="gravatar" :alt="alt" :src="gravatar_url">
</template>

<script>
  export default {
    props: ['alt', 'email', 'size'],
    computed: {
      gravatar_url() {
        let md5 = utils.md5(this.email)
        let size = this.size || 80
        return `https://secure.gravatar.com/avatar/${md5}?s=${size}`
      }
    }
  }
</script>
