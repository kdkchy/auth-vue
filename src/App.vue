<template>
  <nav v-if="isAuthenticated">
    <router-link to="/home">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <button @click="handleLogout()">Logout</button> 
  </nav>
  <nav v-else>
    <router-link to="/">Login</router-link> | 
    <router-link to="/register">Register</router-link> 
  </nav>
  <router-view/>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default{
  data(){
    return {
      isLoggedIn : true
    }
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'isAuthenticated',
    })
  },
  created(){
    this.tryLogin()
  },
  methods: {
    ...mapActions({
      tryLogin: 'tryLogin',
      logout: 'logout'
    }),
    handleLogout(){
      this.logout()
      this.$router.replace('/')
      alert('Loged out!')
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  color: #2c3e50;
}

nav {
  padding: 30px;
  text-align: center;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
