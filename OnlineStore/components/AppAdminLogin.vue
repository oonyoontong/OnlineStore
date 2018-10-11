<template>
  <div>
    <h1>123</h1>
  <b-modal  id="adminLogin"
            title="Login to admin page"
            ref="adminLogin"
            @hide="handleHide"
            v-model="showModal"
            centered
            hide-header-close
            hide-footer>
    <form @submit="handleSubmit">
      <b-form-input type="text"
                    name="user"
                    placeholder="Username"
                    v-model="loginUser"
                    ></b-form-input>
      <b-form-input type="password"
                    name="password"
                    placeholder="Password"
                    v-model="loginPassword"
                    ></b-form-input>
      <b-button id="loginSubmit"
                type="submit"
                variant="primary">Submit</b-button>
    </form>
  </b-modal>
  </div>
</template>

<script>

export default {
  data () {
    return {
      showModal: true,
      loginUser: '',
      loginPassword: ''
    }
  },
  methods: {
    handleHide (evt) {
      evt.preventDefault()
    },
    handleSubmit (evt) {
      evt.preventDefault()
      if (!this.loginPassword || !this.loginUser) {
        console.log(this.loginPassword)
        console.log(this.loginUser)
        alert('Please enter all credentials!')
      } else {

      }
    }
  }
}
</script>

<style scoped>

  input {
    margin-bottom: 20px;
  }

  #loginSubmit {
    float: right;
  }
</style>
