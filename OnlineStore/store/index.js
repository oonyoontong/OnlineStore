export const actions = {
  async nuxtServerInit ({commit, dispatch}) {
    await dispatch('products/getFilterCategories')
  }
}
