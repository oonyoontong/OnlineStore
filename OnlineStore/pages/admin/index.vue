<template>
  <app-admin-login ref="loginModal"></app-admin-login>
</template>

<script>
  import AppAdminLogin from '../../components/AppAdminLogin.vue'

  export default {
    layout: 'admin',
    components: {
      AppAdminLogin
    },
    created () {
    },
    methods: {
    }
  }
</script>

<style scoped>

</style>
