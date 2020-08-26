export default ($axios) => {
  return {
    // 测试接口
    testapi(params) {
      return $axios.$get('/api/i18n/allTable')
    }
  }
}