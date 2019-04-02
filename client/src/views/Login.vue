<template>
  <div id="login-view">
    <h1>Login</h1>
    <form @submit.prevent="submit">
      <input v-model="inputs.username" type="text" id="username" placeholder="username">
      <input v-model="inputs.password" type="password" id="password" placeholder="password">
    </form>
    <button @click="Login(inputs)" id="login-button">
      login
    </button>
    <div>
      <router-link to="/register">create account</router-link> |
      <router-link to="/password_reset">reset password</router-link> |
      <!-- <router-link to="/Home">Home</router-link> -->
    </div>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex';
export default {
  data() {
    return {
      inputs: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    ...mapActions('auth',['login']),
    Login(){
      this.login(this.inputs).then(()=>{
        if(this.isAuthenticated){
          this.$router.push('/')
        }else{
          alert('Wrong Username/Password')
        }
      })
    }
  },
  computed:mapGetters('auth',['isAuthenticated'])

};
</script>

<style>
form input {
  display: block
}
</style>
