<template>
  <div>
    <b-modal  id="adminLogin"
              title="Login to admin page"
              ref="adminLogin"
              @hide="handleHide"
              v-model="showModal"
              centered
              hide-header-close
              hide-footer>

      <b-nav justified tabs>
        <b-nav-item active>Login</b-nav-item>
        <b-nav-item>Register</b-nav-item>
      </b-nav>

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
      active: null,
      loginUser: '',
      loginPassword: ''
    }
  },
  methods: {
    checkLogin (user, password) {
      Promise()

    },
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
        this.checkLogin(this.loginUser, this.loginPassword)
      }
    },
    flip: function (which, e) {
      e.preventDefault()
      if (which !== this.active) {
        this.active = which
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
