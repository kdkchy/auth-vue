<template>
  <div class="about">
    <div v-if="isLoading">
      <h3>Loading...</h3>
    </div>
    <div v-else>
      <h1>This is an about page</h1>
      <h2>Name : {{ user.name }}</h2>
      <h2>Email : {{ user.email }}</h2>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default{
  data() {
    return {
      user: null,
    }
  },
  computed: {
    ...mapGetters({
      isLoading: 'isLoading',
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
.about  {
  text-align: center;
}
</style>