<template>
  <h1>注册用户</h1>
  <div class="row">
    <div class="col-md-6 col-md-offset-3">
      <error-message-view :message="error_message"></error-message-view>
      <field-input :m="user" f="name" t="text" l="用户名" :e="errors"></field-input>
      <field-input :m="user" f="email" t="email" l="邮箱地址" :e="errors"></field-input>
      <field-input :m="user" f="password" t="password" l="密码" :e="errors"></field-input>
      <field-input :m="user" f="password_confirmation" t="password" l="确认密码" :e="errors"></field-input>
      <input class="btn btn-primary" type="button" @click="userSignup" value="创建我的用户" />
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
    methods: {
      userSignup(){
        user_resource.save(this.user).then((response) => {
          let jwt = response.text()
          login_info.log_in(jwt)
          this.flash('创建用户成功', 'success')
          this.$route.router.go({name:'user_show', params: { id: this.cuid }})
        }, (response) => {
          switch(response.status)
          {
            case 422:
              this.errors = response.json()
              this.error_message = '输入有误'
              break
            default:
              alert(response.status)
              alert(response.statusText)
              alert(response.text())
          }
        });
      }
    }
  }
</script>
