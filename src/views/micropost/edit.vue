<template>
  <fieldset>
    <legend>编辑微博</legend>
    <div class="form-group">
      <label class="form-label">用户id: </label>
      <input type="text" v-model="micropost.user_id">
    </div>
    <div class="form-group">
      <label class="form-label">内容: </label>
    </div>
    <div class="form-group">
      <textarea v-model="micropost.content" rows="5" cols="80"></textarea>
    </div>
  </fieldset>
  <div>
    <a class="btn btn-primary" @click="editMicropost">保存</a>
    <a class="btn btn-danger" v-link="{ name: 'micropost_list' }">返回</a>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        micropost: {}
      }
    },
    route:{
      data(transition) {
        let mid = transition.to.params.id
        return {
          micropost: micropost_resource.get({id: mid}).then((res) => { return res.json() })
        }
      }
    },
    methods: {
      editMicropost(){
        micropost_resource.update({id: this.micropost.id}, this.micropost).then((response) => {
          this.$route.router.go({name:'micropost_list'})// success callback
        }, (response) => {
          // error callback
        });
      }
    },
  }
</script>
