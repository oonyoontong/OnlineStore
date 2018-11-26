const state = () => ({
  shipping: null,
  billing: null,
  voucher: null,
  shippingList: [
    {
      name: 'Tan Oon Tong',
      address1: 'Myeongdong street',
      address2: 'Wangsimni-ro 111 #02-11',
      city: 'Seoul',
      state: 'Myeongdong-do',
      postalCode: '12345',
      country: 'West Korea',
      phone: '010-1234-5678'
    },
    {
      name: 'XXXX XXXX',
      address1: 'Gangwon street',
      address2: 'Incheon Airport 123',
      city: 'Pyeongchang',
      state: 'Somewhere',
      postalCode: '12345',
      country: 'Southeast Korea',
      phone: '010-1234-5678'
    }
  ],
  billingList: [
    {
      ccNumber: '1234567887654321',
      security: '123',
      expMonth: '07',
      expYear: '2019',
      name: 'Tan Oon Tong',
      billingAddress1: 'Myeongdong street',
      billingAddress2: 'Wangsimni-ro 111 #02-11',
      billingCity: 'Seoul',
      billingState: 'Myeongdong-do',
      billingPostalCode: '12345',
      billingCountry: 'West Korea'
    },
    {
      ccNumber: '1234567887656432',
      security: '123',
      expMonth: '07',
      expYear: '2019',
      name: 'Tan Oon Tong',
      billingAddress1: 'Myeongdong street',
      billingAddress2: 'Wangsimni-ro 111 #02-11',
      billingCity: 'Seoul',
      billingState: 'Myeongdong-do',
      billingPostalCode: '12345',
      billingCountry: 'West Korea'
    },
    {
      ccNumber: '1234567887659999',
      security: '123',
      expMonth: '07',
      expYear: '2019',
      name: 'Tan Oon Tong',
      billingAddress1: 'Myeongdong street',
      billingAddress2: 'Wangsimni-ro 111 #02-11',
      billingCity: 'Seoul',
      billingState: 'Myeongdong-do',
      billingPostalCode: '12345',
      billingCountry: 'West Korea'
    }
  ]
})

const getters = {
}

const mutations = {
  SET_BILLING: (state, billing) => {
    state.billing = billing
  },
  SET_SHIPPING: (state, shipping) => {
    state.shipping = shipping
  },
  SET_VOUCHER: (state, voucher) => {
    state.voucher = voucher
  },
  ADD_SHIPPING: (state, shipping) => {
    state.shippingList.push(shipping)
  },
  ADD_BILLING: (state, billing) => {
    state.billingList.push(billing)
  }
}

const actions = {
  getBillingList (context, userId) {
    // FETCH USER BILLING LIST
  },
  getShippingList (context, userId) {
    // FETCH USER SHIPPING LIST
  },
  addBilling (context, userId, billing) {
    // ADD BILLING TO USER
    // ADD BILLING TO BILLING LIST IN STORE
  },
  addShipping (context, userId, shipping) {
    // ADD SHIPPING TO USER
    // ADD SHIPPING TO SHIPPING LIST IN STORE
  },
  removeBilling (context, userId, billing) {
    // ADD BILLING TO USER
    // ADD BILLING TO BILLING LIST IN STORE
  },
  removeShipping (context, userId, shipping) {
    // ADD SHIPPING TO USER
    // ADD SHIPPING TO SHIPPING LIST IN STORE
  },
  getVoucher (context, voucher) {
    // FETCH VOUCHER DISCOUNT OR NULL
  },
  confirmOrder ({commit, state}) {
    // UPDATE ORDER TO SERVER, RETURN ACK/NAK
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
