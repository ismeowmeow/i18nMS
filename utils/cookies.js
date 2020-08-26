import Cookies from 'js-cookie'

const tokenKey = 'fms_token'
const languageKey = 'fms_language'

export const utilCookies = {
  setToken(Token) {
    Cookies.set(tokenKey, Token)
  },
  getToken() {
    return Cookies.get(tokenKey)
  },
  removeToken() {
    return Cookies.remove(tokenKey)
  },
  setLanguage(language) {
    Cookies.set(languageKey, language)
  },
  getLanguage() {
    return Cookies.get(languageKey)
  }
}
