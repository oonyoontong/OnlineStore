<template>
  <main class="capsule">
    <app-masthead/>
    <div class="contain">
      <app-sidebar :pricerange.sync="highprice"/>
      <app-sort-by/>
      <transition-group name="items" tag="section" class="content">
        <app-item
          v-for="(item, index) in products"
          :key="item.id"
          :item="item"
          :index="index"
        />
      </transition-group>
    </div>
  </main>

  <!--TODO ADD SUPPORT FOR INFINITE SCROLLING https://scotch.io/tutorials/simple-asynchronous-infinite-scroll-with-vue-watchers-->
</template>

<script>
import AppSidebar from './../components/AppSidebar.vue'
import AppMasthead from './../components/AppMasthead.vue'
import AppItem from './../components/AppItem.vue'
import AppSortBy from './../components/AppSortBy.vue'

export default {
  components: {
    AppSidebar,
    AppMasthead,
    AppItem,
    AppSortBy
  },
  data () {
    return {
      highprice: 300
    }
  },
  computed: {
    products () {
      /*return this.$store.state.products.products.filter(el =>
        this.$store.state.products.sale
          ? el.price < this.highprice && el.sale
          : el.price < this.highprice
      )*/
      return this.$store.state.products.products
    }
  }
}
</script>

<style>
/* no grid support */
aside {
  float: left;
  width: 19.1489%;
}

.content {
  /*no grid support*/
  float: right;
  width: 79.7872%;
  /* grid */
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  padding: 0 !important;
}

@supports (display: grid) {
  .capsule > * {
    width: auto;
    margin: 0;
  }
}
</style>
