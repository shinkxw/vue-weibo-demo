<template>
  <div class="stats">
    <router-link :to="{ name: 'user_following', params: { id: id } }">
      <strong id="following" class="stat">{{ following_count }}</strong>
      关注
    </router-link>
    <router-link :to="{ name: 'user_followers', params: { id: id } }">
      <strong id="followers" class="stat">{{ followers_count }}</strong>
      粉丝
    </router-link>
  </div>
</template>

<script>
  export default {
    props: ['id'],
    data() {
      return {
        following_count: 0,
        followers_count: 0
      }
    },
    created: function () {
      this.refresh()
    },
    methods:{
      refresh(){
        axios.get(`users/${this.id}/following_count`).then((res) => {
          this.following_count = res.data
        })
        axios.get(`users/${this.id}/followers_count`).then((res) => {
          this.followers_count = res.data
        })
      }
    },
  }
</script>

<style scoped>
  a {
    min-width: 50px;
  }
</style>

