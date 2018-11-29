export const actions = {
  async nuxtServerInit ({commit, dispatch}) {
    await dispatch('products/getFilterCategories')
    await dispatch('products/getAllProducts')
    await dispatch('products/getMinMaxPrice')
  }
}
