const mutations = {
  SET_LOCAL(state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale
      console.log('state.locale:', state.locale)
    }
  }
}

export default mutations