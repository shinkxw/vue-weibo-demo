<template>
  <div>
    <h1>更新你的个人资料</h1>
    <div class="row">
      <div class="col-md-6 col-md-offset-3">
        <error-message-view :message="error_message"></error-message-view>
        <field-input :m="user" f="name" t="text" l="用户名" :e="errors"></field-input>
        <field-input :m="user" f="email" t="email" l="邮箱地址" :e="errors"></field-input>
        <field-input :m="user" f="password" t="password" l="密码" :e="errors"></field-input>
        <field-input :m="user" f="password_confirmation" t="password" l="确认密码" :e="errors"></field-input>
        <input class="btn btn-primary" type="button" @click="editUser" value="保存更改" />

        <div class="gravatar_edit">
          <gravatar :alt="user.name" :email="user.email"></gravatar>
          <a href="http://gravatar.com/emails" target="_blank" rel="noopener">修改头像</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        user: {},
        errors: '',
        error_message: ''
      }
    },
    created () {
      this.fetchData()
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      fetchData() {
        axios.get(`users/${this.cuid}`).then((res) => { this.user = res.data })
      },
      editUser(){
        axios.put(`users/${this.cuid}`, this.user).then((res) => {
          let jwt = res.data
          login_info.set_data(jwt)
          flash_view.next('个人资料已更新', 'success')
          router.push({name:'user_show', params: { id: this.user.id }})
        })
        .catch((error) => {
          if (error.response && error.response.status == 422)
          {
            this.errors = error.response.data
            this.error_message = '输入有误'
          }
        });
      }
    }
  }
</script>
