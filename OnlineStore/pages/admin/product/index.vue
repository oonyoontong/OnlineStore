<template>
  <b-container class="capsule">
    <div class="header">
      <nuxt-link :to="{name: 'admin-product-id', params: {id: 'new'}}" style="text-decoration: none; color: black"><b-button>Add new product</b-button></nuxt-link>
    </div>

    <b-list-group class="product-list">
      <b-list-group-item class="product-tab" v-for="item in products" :key="item.name">
        <nuxt-link :to="{name: 'admin-product-id', params: {id: item.name}}" style="text-decoration: none; color: black">
          <span>{{item.name}}</span>
          <img class='product-img' :src="`/${item.img}`" :alt="`Image of ${item.name}`">
        </nuxt-link>
          <b-btn class="remove-btn" @click="handleRemove(item.name)">Remove</b-btn>


      </b-list-group-item>
    </b-list-group>

  </b-container>


</template>

<script>
    export default {
      layout: 'admin',
      methods: {
        handleRemove: function (item) {
          // DO SOMETHING
          this.$dialog.confirm('Are you sure you want to remove this product?')
            .then(function (dialog) {
              console.log(item.name + ' is deleted')
              // REMOVE item.name
            })
        }
      },
      computed: {
        products: function () {
          return this.$store.state.products.products
        }
      }
    }
</script>

<style scoped>
  .remove-btn {
    float: right;
  }
  .product-tab {
    margin-bottom: 5px;
    border-radius: 10px;
  }
  .product-img {
    max-height: 100px;
    margin-left: 20px;
    border: 1px solid black;
  }
</style>
