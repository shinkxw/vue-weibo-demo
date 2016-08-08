<template>
  <div v-if="message" class="alert alert-{{ type }} alert-dismissible">
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
    {{ message }}
  </div>
</template>

<script>
  export default {
    data: function (transition) {
      return {
        message: null,
        type: null
      }
    },
    methods: {
      flash(){
        this.message = sessionStorage.getItem('alert_message')
        this.type = sessionStorage.getItem('alert_info')
        sessionStorage.removeItem('alert_message')
        sessionStorage.removeItem('alert_info')
      }
    }
  }
</script>
