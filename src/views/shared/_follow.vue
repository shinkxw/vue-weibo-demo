<template>
  <div v-if="uid != cuid" id="follow_form">
    <input v-if="relationship_id" class="btn" type="button" @click="unfollowUser" value="取消关注" />
    <input v-else class="btn btn-primary" type="button" @click="followUser" value="关注" />
  </div>
</template>

<script>
  export default {
    props: ['uid'],
    data() {
      return {
        relationship_id: null
      }
    },
    created: function () {
      this.refresh()
    },
    methods:{
      refresh(){
        user_resource.relationship_id({id: this.cuid, followed_id: this.uid}).then((response) => {
          this.relationship_id = response.json()
        })
      },
      followUser(){
        relationship_resource.save({followed_id: this.uid}).then((response) => {
          this.after_change()
        })
      },
      unfollowUser(){
        relationship_resource.delete({id: this.relationship_id}).then((response) => {
          this.after_change()
        })
      },
      after_change(){
        this.refresh()
        this.$dispatch('follow_changed')
      }
    },
  }
</script>
