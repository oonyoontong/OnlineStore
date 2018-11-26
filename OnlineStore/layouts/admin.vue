<template>
  <div>
    <div class="wrapper">
      <nuxt/>
      <div class="clear"></div>
      <div class="push"></div>
    </div>
    <app-footer class="footer" />
  </div>
</template>

<script>
  import AppFooter from './../components/AppFooter.vue'
  export default {
    components: {
      AppFooter
    }
  }
</script>

<style>
  html,
  body {
    height: 100%;
    margin: 0;
  }

  .clear {
    clear: both;
  }

  /* sticky footer stuff */
  .wrapper {
    min-height: 100vh;
    margin-bottom: -60px;
  }

  .footer,
  .push {
    height: 50px;
    margin-top: 10px;
  }
</style>
