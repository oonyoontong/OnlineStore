<template>
  <div style="background-color: white; margin-bottom: 10px;">
    <div class="sale-items">
      <span>Sort By: </span>
      <b-form-radio-group buttons
                          button-variant="outline-primary"
                          v-model="sortBy"
                          :options="sortByOptions"></b-form-radio-group>
      <b-button :pressed.sync="sale" variant="outline-primary">Sale items only</b-button>
    </div>
  </div>

</template>

<script>
    export default {
      data () {
        return {
          sortByOptions: [
            {text: 'Popularity', value: 'popular'},
            {text: 'Newest', value: 'new'},
            {text: 'Ratings', value: 'rating'},
            {text: 'Price: Highest to Lowest', value: 'priceHigh'},
            {text: 'Price: Lowest to Highest', value: 'priceLow'}
          ]
        }
      },
      computed: {
        sale: {
          get () {
            return this.$store.state.products.filters.sale
          },
          set () {
            this.$store.commit('products/UPDATE_FILTERS', ['sale', !this.filters.sale])
            this.$store.dispatch('products/getFilteredProducts')
          }
        },
        filters () {
          return this.$store.state.products.filters
        },
        sortBy: {
          get () {
            return this.$store.state.products.sortBy
          },
          set (value) {
            this.$store.commit('products/UPDATE_FILTERS', ['sortBy', value])
            this.$store.dispatch('products/getFilteredProducts')
          }
        }
      }
    }
</script>

<style scoped>

</style>
