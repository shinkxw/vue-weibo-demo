<template>
  <div class="row">
    <div class="col-xs-12 col-md-10">
      <div class="row">
        <div class="col-xs-4 col-md-2">用户id:</div>
        <div class="col-xs-8 col-md-4">{{ micropost.user_id }}</div>
      </div>
      <div class="row">
        <div class="col-xs-4 col-md-2">内容:</div>
        <div class="col-xs-8 col-md-4">{{ micropost.content }}</div>
      </div>
      <div class="row">
        <div class="col-xs-4 col-md-2">创建时间:</div>
        <div class="col-xs-8 col-md-4">{{ micropost.created_at }}</div>
      </div>
      <div class="row">
        <div class="col-xs-4 col-md-2">更新时间:</div>
        <div class="col-xs-8 col-md-4">{{ micropost.updated_at }}</div>
      </div>
      <br>
      <a class="btn btn-primary" v-link="{ name: 'micropost_list' }">返回</a>
    </div>
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
    }
  }
</script>
