<template>
  <div>
    <h1>用户登录</h1>
    <div class="row">
      <div class="col-md-6 col-md-offset-3">
        <error-message-view :message="error_message"></error-message-view>
        <field-input :m="user" f="email" t="text" l="邮箱地址"></field-input>
        <div class="form-group">
          <label> 密码 </label>
          <input class="form-control" type="password" @keyup.enter="userLogin" v-model="user.password"  />
        </div>
        <label class="checkbox inline">
          <input id="remember_me" type="checkbox" v-model="need_remember">
          <span>记住登录状态</span>
        </label>
        <input class="btn btn-primary" type="button" @click="userLogin" value="登录" />
        <p>新用户? <router-link :to="{ name: 'user_signup' }">现在注册!</router-link></p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        user: {},
        error_message: '',
        need_remember: login_info.is_remember
      }
    },
    methods: {
      userLogin(){
        if (this.check_params())
        {
          axios.post('users/login', this.user).then((response) => {
            let jwt = response.data
            login_info.log_in(jwt, this.need_remember)
            flash_view.next('登录成功', 'success')
            this.after_login()
          })
          .catch((error) => {
            if (error.response && error.response.status == 422)
            {
              this.error_message = error.response.data
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
