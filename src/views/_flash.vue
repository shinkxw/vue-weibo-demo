<template>
  <div v-if="alert_content" class="alert alert-{{ alert_type }} alert-dismissible">
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
    {{ alert_content }}
  </div>
</template>

<script>
  export default {
    computed: {
      alert_content: function () {
        return this.$route.query.alert
      },
      alert_type: function () {
        return this.$route.query.alert_type || 'info'
      }
    }
  }
</script>
