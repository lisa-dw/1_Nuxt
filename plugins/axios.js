export default function ({ $axios }) {
  // set BaseUrl
  switch (process.env.NUXT_APP_TYPE) {
    case 'test':
      $axios.setBaseURL(process.env.NUXT_TEST_APP_API_URL)
      break
    case 'local':
      $axios.setBaseURL(process.env.NUXT_LOCAL_APP_API_URL)
      break
    case 'product':
    default :
      $axios.setBaseURL(process.env.NUXT_PRODUCT_APP_API_URL)
      break
  }

  // set Header
  // $axios.setHeader("Authorization", "123");

  // set Token
  // $axios.setToken("123", "Bearer");
}
