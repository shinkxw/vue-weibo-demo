<template>
  <fieldset>
    <legend>新建微博</legend>
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
    <a class="btn btn-primary" @click="addMicropost">保存</a>
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
    methods: {
      addMicropost(){
        micropost_resource.save(this.micropost).then((response) => {
          this.$route.router.go({name:'micropost_list'})// success callback
        }, (response) => {
          // error callback
        });
      }
    },
  }
</script>
