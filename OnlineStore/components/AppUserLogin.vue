<template>

  <b-modal  id="adminLogin"
            title="Login to admin page"
            @hide="handleHide"
            v-model="showModal"
            centered
            hide-footer>
    <ul class="form-switcher">
      <li @click="flip('register', $event)"><a href="" id="register-form">Register</a>

      </li>
      <li @click="flip('login', $event)"><a href="" id="login-form">Login</a>

      </li>
    </ul>

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
</template>

<script>
  export default {
    props: ['showModal'],
    data () {
      return {
        loginUser: '',
        loginPassword: ''
      }
    },
    methods: {
      checkLogin (user, password) {
        Promise()
      },
      handleSubmit (evt) {
        evt.preventDefault()
        if (!this.loginPassword || !this.loginUser) {
          console.log(this.loginPassword)
          console.log(this.loginUser)
          alert('Please enter all credentials!')
        } else {
          this.checkLogin(this.loginUser, this.loginPassword)
        }
      },
      handleHide (evt) {
        this.$emit('toggle')
      },
      toggleModal () {
        this.showModal = !this.showModal
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
