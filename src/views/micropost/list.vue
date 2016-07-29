<template>
  <div class="row">
    <div class="col-xs-12 col-md-8">
      <h3>微博列表　
        <a class="btn btn-primary" v-link="{ name: 'micropost_new' }" >新建微博</a>
      </h3>
    </div>
  </div>
  <table class="table table-bordered table-hover">
    <tr>
      <th>用户id</th>
      <th>内容</th>
      <th>创建时间</th>
      <th>更新时间</th>
      <th>操作</th>
    </tr>
    <tr v-for="micropost of microposts">
      <td>
        <a v-link="{name: 'micropost_show',params:{id:micropost.id}}">{{micropost.user_id}}</a>
      </td>
      <td>{{ micropost.content }}</td>
      <td>{{ micropost.created_at | getLastTimeStr }}</td>
      <td>{{ micropost.updated_at | getLastTimeStr }}</td>
      <td>
        <a class="btn btn-primary btn-sm" v-link="{name: 'micropost_edit',params:{id:micropost.id}}">编辑</a>
        <a class="btn btn-danger btn-sm" @click="deleteMicropost(micropost.id, $index)">删除</a>
      </td>
    </tr>
  </table>
</template>

<script>
  export default {
    data() {
      return {
        microposts: []
      }
    },
    route:{
      data: function (transition) {
        return {
          microposts: micropost_resource.get().then((res) => { return res.json() })
        }
      }
    },
    methods:{
      deleteMicropost(mid, index){
        if (confirm('此操作将不可恢复，确定要删除吗？'))
        {
          micropost_resource.delete({id: mid}).then((response) => {
            this.microposts.splice(index, 1)// success callback
          }, (response) => {
            // error callback
          });
        }
      }
    },
    components:{
      // "nvHead":require('../components/header.vue'),
      // "nvTop":require('../components/backtotop.vue')
    }
  }
</script>
