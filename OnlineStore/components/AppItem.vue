<template>
  <div class="item" >
    <nuxt-link style="text-decoration: none; color: black" :to="{name: 'product-id', params: {id: item.name}}">
    <p>{{ item.name }}</p>
      <span class="salepill" v-if="item.sale">Sale</span>
      <img :src="`/${item.img}`" :alt="`Image of ${item.name}`">
      <p>{{ item.price | usdollar }}</p>

      <!--TODO fix rating system-->
      <div class = rating>
      <span class="fa fa-star" v-bind:class="{checked: item.rating > 0}"></span>
      <span class="fa fa-star" v-bind:class="{checked: item.rating > 1}"></span>
      <span class="fa fa-star" v-bind:class="{checked: item.rating > 2}"></span>
      <span class="fa fa-star" v-bind:class="{checked: item.rating > 3}"></span>
      <span class="fa fa-star" v-bind:class="{checked: item.rating > 4}"></span>
      <span>&nbsp({{ item.rating_count }})</span>
      </div>
    </nuxt-link>
    <button class="add" @click="addItem">Add to cart</button>
  </div>

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
  filters: {
    usdollar: function (value) {
      return `$${value}`
    }
  },
  methods: {
    addItem () {
      this.$store.commit('products/CART_ADD_ITEM', this.item)
    }
  }
}
</script>

<style scoped>
.item {
  border-radius: 5px;
  padding: 20px;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}

.checked {
  color: orange;
}

.item:hover{
  background: #dbe1ec;
}

.salepill {
  background: rgb(232, 35, 25);
  color: white;
  font-family: 'Barlow', sans-serif;
  position: absolute;
  right: 30px;
  top: 60px;
  padding: 2px 10px 4px;
  text-transform: uppercase;
  font-size: 13px;
  font-weight: 700;
  border-radius: 1000px;
}

.rating {
  padding-bottom: 10px;
}

p {
  font-size: 18px;
}
</style>
