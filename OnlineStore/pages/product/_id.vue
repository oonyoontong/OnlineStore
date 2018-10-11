<template>
  <main class="capsule">
    <app-masthead/>
    <div style="background-color: crimson">
      <h1>PRODUCT GOES HERE</h1>
    </div>
  </main>
</template>

<script>
  import AppMasthead from './../../components/AppMasthead.vue';
  // On open, getData of this product from database, populate the fields.
  export default {
    components: {
      AppMasthead
    },
    data() {
      return {
      };
    },
    computed: {
    }
  };
</script>

<style>

</style>
