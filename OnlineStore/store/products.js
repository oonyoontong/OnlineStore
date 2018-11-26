import Vue from 'vue'

const state = () => ({
  cartTotal: 0,
  cart: {},
  filters: {
    cats: [],
    maxPrice: 400,
    minPrice: 0,
    cats_selected: [],
    sale: false,
    priceFilter: [0, 400],
    sortBy: 'popular'
  },
  products: [
    {
      id: 1,
      name: 'Khaki Suede Polish Work Boots',
      price: 149.99,
      category: 'women',
      sale: true,
      article: 'shoe',
      rating: 4,
      rating_count: 10,
      img: 'shoe1.png'
    },
    {
      id: 2,
      name: 'Camo Fang Backpack Jungle',
      price: 39.99,
      category: 'women',
      sale: false,
      article: 'jacket',
      rating: 3,
      rating_count: 10,
      img: 'jacket1.png'
    },
    {
      id: 3,
      name: 'Parka and Quilted Liner Jacket',
      price: 49.99,
      category: 'men',
      sale: true,
      article: 'jacket',
      rating: 3.5,
      rating_count: 10,
      img: 'jacket2.png'
    },
    {
      id: 4,
      name: 'Cotton Black Cap',
      price: 12.99,
      category: 'men',
      sale: true,
      article: 'hats',
      rating: 2.6,
      rating_count: 10,
      img: 'hat1.png'
    },
    {
      id: 5,
      name: 'Knit Sweater with Zips',
      price: 29.99,
      category: 'women',
      sale: false,
      article: 'sweater',
      rating: 2.1,
      rating_count: 10,
      img: 'sweater1.png'
    },
    {
      id: 6,
      name: 'Long Linen-blend Shirt',
      price: 18.99,
      category: 'men',
      sale: false,
      article: 'shirt',
      rating: 4.5,
      rating_count: 10,
      img: 'shirt1.png'
    },
    {
      id: 7,
      name: 'Knit Orange Sweater',
      price: 28.99,
      category: 'men',
      sale: false,
      article: 'sweater',
      rating: 3.7,
      rating_count: 10,
      img: 'sweater2.png'
    },
    {
      id: 8,
      name: 'Cotton Band-collar Blouse',
      price: 49.99,
      category: 'men',
      sale: false,
      article: 'shirt',
      rating: 4,
      rating_count: 10,
      img: 'shirt2.png'
    },
    {
      id: 9,
      name: 'Camo Fang Backpack Jungle',
      price: 59.99,
      category: 'women',
      sale: true,
      article: 'jacket',
      rating: 1,
      rating_count: 10,
      img: 'jacket3.png'
    },
    {
      id: 10,
      name: 'Golden Pilot Jacket',
      price: 129.99,
      category: 'women',
      sale: false,
      article: 'jacket',
      rating: 0,
      rating_count: 10,
      img: 'jacket4.png'
    },
    {
      id: 11,
      name: 'Spotted Patterned Sweater',
      price: 80.99,
      category: 'women',
      sale: false,
      article: 'jacket',
      rating: 2,
      rating_count: 10,
      img: 'sweater4.png'
    },
    {
      id: 12,
      name: 'Double Knit Sweater',
      price: 59.99,
      category: 'men',
      sale: true,
      article: 'jacket',
      rating: 2,
      rating_count: 10,
      img: 'sweater5.png'
    }
  ]
})

const getters = {
  women: state => {
    return filter(state.products, 'category', 'women')
  },
  men: state => {
    return filter(state.products, 'category', 'men')
  }
}

const mutations = {
  UPDATE_FILTERS: (state, [key, value]) => {
    Vue.set(state.filters, key, value)
    console.log('Changing filters')
    console.log(state.filters[key])
  },
  switchSale: state => {
    state.sale = !state.sale
  },
  CLEAR_CART_COUNT: state => {
    state.cartTotal = 0
  },
  CLEAR_CART_CONTENTS: state => {
    state.cart = {}
  },
  CART_ADD_ITEM: (state, item) => {
    console.log('Added item to cart')
    state.cartTotal++
    if (item.id in state.cart) {
      state.cart[item.id].count++
    } else {
      let stateItem = Object.assign({}, item)
      stateItem.count = 1
      state.cart[item.id] = stateItem
    }
  },
  CART_REMOVE_ITEM: (state, item) => {
    console.log('Removing item from cart')
    if (item.id in state.cart) {
      state.cartTotal = state.cartTotal - state.cart[item.id].count
      Vue.delete(state.cart, item.id)
    }
  }
}

const actions = {
  async getFilterCategories ({commit}) {
    const payload = await this.$axios.$get('http://localhost:5000/products/get_categories')
    commit('UPDATE_FILTERS', ['cats', payload.cats.filter(function (catName) {
      return (catName !== 'women') && (catName !== 'men')
    })])
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
const filter = (array, key, value) => array.filter(item => item[key] === value)
