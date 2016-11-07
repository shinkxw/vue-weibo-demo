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
        let url = `users/${this.cuid}/relationship_id`
        axios.get(url, {params: {followed_id: this.uid}}).then((res) => {
          this.relationship_id = res.data
        })
      },
      followUser(){
        axios.post('relationships', {followed_id: this.uid}).then((res) => {
          this.after_change()
        })
      },
      unfollowUser(){
        axios.delete(`relationships/${this.relationship_id}`).then((res) => {
          this.after_change()
        })
      },
      after_change(){
        this.refresh()
        eventHub.$emit('follow_changed')
      }
    },
  }
</script>
