export const state = {
  locales: ['zh', 'en', 'th'],
  locale: 'zh'
}

export const mutations = {
  SET_LOCAL(state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale
      console.log('state.locale:', state.locale)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
}