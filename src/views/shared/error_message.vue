<template>
  <div v-if="message" id="error_explanation">
    <div class="alert alert-danger"> {{ message }} </div>
  </div>
</template>

<script>
  export default {
    props: ['message']
  }
</script>
