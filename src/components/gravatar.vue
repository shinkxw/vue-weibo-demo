<template>
  <img class="gravatar" :alt="alt" :src="gravatar_url">
</template>

<script>
  export default {
    props: ['alt', 'email', 'size'],
    computed: {
      gravatar_url() {
        if (this.email)
        {
          let md5 = utils.md5(this.email)
          let size = this.size || 80
          return `https://secure.gravatar.com/avatar/${md5}?s=${size}`
        }
      }
    }
  }
</script>
