module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Shop.it',
    script: [{src: 'https://js.stripe.com/v3/'}],
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: 'Nuxt.js project'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Barlow:400,600|Playfair+Display:700'
      },
      {
        rel: 'stylesheet',
        href: 'https://use.fontawesome.com/releases/v5.4.1/css/all.css',
        integrity: 'sha384-5sAR7xN1Nv6T6+dT2mhtzEpVJvfS3NScPQTrOxhwjIuvcA67KV2R5Jz6kr4abQsz',
        crossorigin: 'anonymous'
      }
    ]
  },
  css: ['~/assets/main.css', 'vuejs-dialog/dist/vuejs-dialog.min.css'],
  /*
  ** Customize the progress bar color
  */
  loading: {
    name: 'chasing-dots',
    color: '#ff5638',
    background: 'white',
    height: '4px'
  },
  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/auth',
    '@nuxtjs/axios',
    '@nuxtjs/toast'
  ],
  plugins: [
    {
      src: '~plugins/vue-slider-component.js',
      ssr: false
    },
    {
      src: '~plugins/vuejs-dialog.js',
      ssr: false
    }
  ],
  axios: {
    baseURL: 'http://localhost:5000'
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {url: '/user/login', method: 'post', propertyName: 'token'},
          logout: false,
          user: {url: '/user/user', method: 'get', propertyName: 'data'}
        },
        tokenRequired: true,
        tokenType: 'Bearer'
      }
    },
    redirect: {
      login: '/?login=1',
      logout: '/',
      user: '/profile',
      callback: '/'
    }
  },
  toast: {
    position: 'top-right',
    duration: 2000
  },
  env: {
    baseURL: 'http://localhost:5000'
  }
}
