<template>
  <b-container>
    <b-row class="product">
      <b-col id="product-text" cols="8">
        <b-row id="title">
          TITLE GOES HERE
        </b-row>

        <b-row id="rating">
          <!--<div class = rating>
            <span class="fa fa-star" v-bind:class="{checked: item.rating > 0}"></span>
            <span class="fa fa-star" v-bind:class="{checked: item.rating > 1}"></span>
            <span class="fa fa-star" v-bind:class="{checked: item.rating > 2}"></span>
            <span class="fa fa-star" v-bind:class="{checked: item.rating > 3}"></span>
            <span class="fa fa-star" v-bind:class="{checked: item.rating > 4}"></span>
            <span>&nbsp({{ item.rating_count }})</span>
            </div>-->

          RATING GOES HERE
        </b-row>

        <b-row id="price">
        PRICE GOES HERE
        </b-row>

        <b-row id="cart-select">
          <b-col id="options">SELECT OPTIONS HERE</b-col>
          <b-col id="addcart-button">BUTTON GOES HERE</b-col>
        </b-row>

        <b-row id="description">DESCRIPTION GOES HERE</b-row>
        <b-row id="add-details">ADDITIONAL DETAILS GO HERE</b-row>
      </b-col>

      <b-col id="img-carousel" cols="4" style="background-color: red">

      </b-col>
    </b-row>

    <b-row class="ratings">
      <b-row id="rating-header">REVIEW HEADER GOES HERE</b-row>
    </b-row>

  </b-container>
</template>

<script>
  import AppMasthead from './../../components/AppMasthead.vue'
// On open, getData of this product from database, populate the fields.
export default {
    components: {
      AppMasthead
    },
    props: {
      item: {
        type: Object,
        required: true
      },
      index: {
        type: Number,
        required: true
      }
    },
    data () {
      return {
      }
    },
    computed: {
    }
  }
</script>

<style>
   .product {
     background-color: white;
     margin-top: 20px;
     padding: 10px;
   }

   .ratings {
     background-color: white;
     margin-top: 20px;
     padding: 10px;
   }
</style>
