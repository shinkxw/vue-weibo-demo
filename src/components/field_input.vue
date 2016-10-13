<template>
  <div class="form-group" :class="{ 'field_with_errors': field_error }">
    <label> {{ l }} {{ field_error }} </label>
    <input v-if="t == 'text'" class="form-control" type="text" v-model="m[f]"/>
    <input v-if="t == 'email'" class="form-control" type="email" v-model="m[f]"/>
    <input v-if="t == 'password'" class="form-control" type="password" v-model="m[f]"/>
  </div>
</template>

<script>
  export default {
    props: ['m', 'f', 't', 'l', 'e'],//'model', 'field', 'type', 'label', 'errors'
    computed: {
      field_error() {
        return this.e ? this.e[this.f] : ''
      }
    }
  }
</script>
