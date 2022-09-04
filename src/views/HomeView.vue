<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h2 v-if="isLoading">Loading...</h2>
    <HelloWorld v-else :msg="msg"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  date(){
    return {
      user: {},
      msg: 'asd'
    }
  },
  computed: {
    ...mapGetters({
      isLoading: 'isLoading'
    }),
  },
  created(){
    this.userCheck()
  },
  methods: {
    ...mapActions({
			itLoading: 'itLoading',
			itLoaded: 'itLoaded',
		}),
    userCheck(){
      this.itLoading()
      this.axios.get('/auth/user-profile')
      .then((response) => {
        this.user = response.data
        this.msg = `Welcome ${this.user.name}, to Your Vue.js App` 
      })
      .catch((response) => {
        alert('An Error occured!')
        console.log(response)
      })
      .finally(() => {
        this.itLoaded()
      })
    }
  }
}
</script>

<style scoped>
.home {
  text-align: center;
}
</style>
