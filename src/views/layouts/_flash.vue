<template>
  <div v-if="message" :class="classObject">
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
    {{ message }}
  </div>
</template>

<script>
  export default {
    created: function () {
      window.flash_view = this
    },
    data() {
      return {
        message: null,
        type: null,
        times: 0
      }
    },
    computed: {
      classObject: function () {
        return ["alert", "alert-" + this.type, "alert-dismissible"]
      }
    },
    methods: {
      now(message, type = 'info'){
        this.set_message(message, type)
        this.times = 0
      },
      next(message, type = 'info'){
        this.set_message(message, type)
        this.times = 1
      },
      set_message(message, type){
        this.message = message
        this.type = type
      },
      refresh(){
        if (this.times == 0)
        {
          this.message = null
          this.type = null
        }
        else
        {
          this.times -= 1
        }
      }
    }
  }
</script>
