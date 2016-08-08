<template>
  <h1>用户登录</h1>
  <div class="row">
    <div class="col-md-6 col-md-offset-3">
      <form accept-charset="UTF-8" action="/login" method="post">
        <error-message-view :message="error_message"></error-message-view>
        <field-input :m="user" f="email" t="text" l="邮箱地址"></field-input>
        <field-input :m="user" f="password" t="password" l="密码"></field-input>
        <input class="btn btn-primary" type="button" @click="userLogin" value="登录" />
      </form>
      <p>新用户? <a v-link="{ name: 'user_signup' }">现在注册!</a></p>

    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        user: {},
        error_message: ''
      }
    },
    methods: {
      userLogin(){
        if (this.check_params())
        {
          user_resource.login(this.user).then((response) => {
            let jwt = response.text()
            login_info.log_in(jwt)
            this.flash('登录成功', 'success')
            this.$route.router.go({name:'user_show', params: { id: login_info.user.id }})
          }, (response) => {
            switch(response.status)
            {
              case 422:
                this.error_message = response.text()
                break
              default:
                alert(response.status)
                alert(response.statusText)
                alert(response.text())
            }
          });
        }
      },
      check_params(){
        if (this.user.email == undefined || this.user.email == '')
        {
          this.error_message = "请填写邮箱地址"
          return false
        }
        if (this.user.password == undefined || this.user.password == '')
        {
          this.error_message = "请填写密码"
          return false
        }
        return true
      }
    }
  }
</script>
