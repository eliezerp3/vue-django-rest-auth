<template>
  <ul class="navbar" id="navbar">
    <li v-for='link in links'><router-link :to="link.link">{{link.name}}</router-link></li>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'navbar',
  data(){
    return {
      auth_links: [{link:'/logout',name:'logout'},{link:'/about',name:'about'}],
      non_auth_links:[{link:'/login',name:'login'},{link:'/register',name:'register'},{link:'/password_reset',name:'password reset'}],
    }
  },
  computed: {
    ...mapGetters('auth', [
      'isAuthenticated',
    ]),
    links(){
      if(this.isAuthenticated)
        return this.auth_links
      else
        return this.non_auth_links
    }
  }
};
</script>

<style scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

li {
  display: inline;
  float: right;
}

a {
  color: #1a1a1a;
  display: inline-block;
  text-align: center;
  padding: 6px 12px;
  text-decoration: none;
  font-size: 14px;
}

a:hover {
  color: #cc0000;
  text-decoration: none;
}
</style>
