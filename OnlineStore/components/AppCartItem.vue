<template>
    <b-container class="cart-item">
      <b-row class="header" align-h="end">
        <button class="cancel-item" @click="removeItem"><span class="fa fa-times fa-2x"></span></button>
      </b-row>
      <b-row>
        <b-col class="carttext">
          <h4>{{ item.name }}</h4>
          <p>{{ item.price | usdollar }}</p>
          <p>Qty: {{item.count}}</p>
          <p>Total for this item: <strong>${{ item.price * item.count }}</strong></p>
        </b-col>
        <b-col>
          <img class="cartimg" :src="`/${item.img}`" :alt="`Image of ${item.name}`">
        </b-col>
      </b-row>
    </b-container>
</template>

<script>
  export default {
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
    methods: {
      removeItem: function () {
        this.$store.commit('products/CART_REMOVE_ITEM', this.item)
      }
    },
    filters: {
      usdollar: function (value) {
        return `$${value}`
      }
    }
  }
</script>

<style scoped>
  .cart-item {
    padding: 30px;
    border-bottom: 1px solid #ccc;
    width: 80%;
  }

  .carttext p,
  .carttext h4 {
    padding: 5px;
  }

  .carttext {
    float: left;
  }
  .cartimg {
    float: right;
  }


  .cancel-item {
    float: right;
    background: white;
    color: black;
    padding: 0;
    margin: 0;
    border: 0;
    width: 10px;
  }

  .cancel-item:hover {
    background: white;
  }

</style>
