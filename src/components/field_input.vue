<template>
  <div class="form-group" :class="{ 'field_with_errors': field_error }">
    <label> {{ l }} {{ field_error }} </label>
    <input class="form-control" :type="t" v-model="m[f]"/>
  </div>
</template>

<script>
  export default {
    props: ['m', 'f', 't', 'l', 'e'],//'model', 'field', 'type', 'label', 'errors'
    computed: {
      field_error: function () {
        return this.e[this.f]
      }
    }
  }
</script>
