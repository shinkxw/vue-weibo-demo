<template>
  <div class="stats">
    <a v-link="{ name: 'user_show', params: { id: id } }">
      <strong id="following" class="stat">{{ following_count }}</strong>
      关注
    </a>
    <a v-link="{ name: 'user_show', params: { id: id } }">
      <strong id="followers" class="stat">{{ followers_count }}</strong>
      粉丝
    </a>
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
        user_resource.following_count({id: this.id}).then((response) => {
          this.following_count = response.json()
        })
        user_resource.followers_count({id: this.id}).then((response) => {
          this.followers_count = response.json()
        })
      }
    },
  }
</script>
