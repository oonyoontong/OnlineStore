<template>
  <aside>
    <div class="sidearea price-range">
      <h5><b>Price</b></h5>
     <!-- <b-form-input
        id="pricerange"
        type="range"
        v-model="priceFilter"
        :min="filters.minPrice"
        :max="filters.maxPrice"
        interval="1"
        ></b-form-input>
      <span class="min">${{ filters.minPrice }}</span>
      <span class="max">${{ filters.maxPrice }}</span>
-->

      <div class="slider">
        <no-ssr>
          <vue-slider
            id="pricerange"
            v-model="priceFilter"
            :min="filters.minPrice"
            :max="filters.maxPrice"
            :tooltip-dir="['top','top']"
            tooltip="hover"></vue-slider>
        </no-ssr>
        <span class="min">${{ priceFilter[0].toFixed(2) }} - ${{ priceFilter[1].toFixed(2) }}</span>
        <!--<span class="max">${{ filters.maxPrice }}</span>-->
      </div>

      <button id="price-button" @click="setFilter">Set</button>

    </div>

    <div class="sidearea callout">
      <h5><b>Categories</b></h5>

      <div>
        <b-form-checkbox-group stacked plain type="checkbox" v-model="cats_selected" :options="filters.cats"></b-form-checkbox-group>
      </div>
    </div>

    <div class="sidearea callout">
      <h5><b>Special Sale!</b></h5>
      <p>Shop now because half our items are greatly reduced</p>
    </div>

    <div class="sidearea callout">
      <h5><b>Contact Us</b></h5>
      <p>Questions? Call us at 1-888-555-SHOP, we're happy to be of service.</p>
    </div>
  </aside>
</template>

<script>
import AppSwitch from './AppSwitch.vue'

export default {
  props: {
    sale: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    priceFilter: {
      get () {
        return this.$store.state.products.filters.priceFilter
      },
      set (value) {
        this.$store.commit('products/UPDATE_FILTERS', ['priceFilter', value])
      }
    },
    cats_selected: {
      get () {
        return this.$store.state.products.filters.cats_selected
      },
      set (value) {
        this.$store.commit('products/UPDATE_FILTERS', ['cats_selected', value])
        this.setFilter()
      }
    },
    filters () {
      return this.$store.state.products.filters
    }
  },
  components: {
    AppSwitch
  },
  methods: {
    setFilter () {
      // TODO setFilter and fetch new product list
      this.$store.dispatch('products/getFilteredProducts')
    }
  }
}
</script>

<style lang="scss" scoped>
aside {
  background: white;
  float: left;
  padding: 20px;
}

.slider {
  padding-bottom: 20px;
}

.sidearea {
  border-bottom: 1px solid #ccc;
  &:last-of-type {
    border: none;
  }
}

.callout {
  padding: 20px 0;
  h4 {
    padding-bottom: 10px;
  }
}

label {
  font-family: 'Playfair Display', serif;
  padding: 15px 0;
  text-align: center;
}

#price-button {
  float: right;
  font-size: small;
  padding: 5px 15px 5px 15px;
  margin: 5px 0px 10px;
}

/*--input range--*/
.sidearea:first-of-type {
  padding-bottom: 40px;
}

label {
  font-family: 'Playfair Display', serif;
  padding: 15px 0;
  text-align: center;
}

span {
  font-family: 'Barlow', sans-serif;
}

.min {
  float: left;
  color: #565656;
}
</style>
