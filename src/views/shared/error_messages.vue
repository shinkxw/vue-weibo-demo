<template>
  <div v-if="errors" id="error_explanation">
    <div class="alert alert-danger">
      输入有错误
    </div>
  </div>
</template>

<script>
  export default {
    props: ['errors']
  }
</script>
