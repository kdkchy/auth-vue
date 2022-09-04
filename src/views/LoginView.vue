<template>
	<div>
		<form @submit.prevent="handleLogin()">
			<div class="form-control">
				<input type="text" placeholder="email" v-model="email.value">
				<span class="invalid" v-show="!email.isValid">{{ email.err }}</span>
			</div>
			<div class="form-control">
				<input type="password" placeholder="password" v-model="password.value">
				<span class="invalid" v-show="!password.isValid">{{ password.err }}</span>
			</div>
			<div v-if="!isLoading">
				<button type="submit">Login</button>
			</div>
			<div v-else>
				<button disabled type="button" class="disabled">Loading...</button>
			</div>
		</form>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
	data(){
		return {
			email: {
				value: 'kadek@kadek.com',
				isValid: '',
				err: ''
			},
			password: {
				value: 'password',
				isValid: '',
				err: ''
			},
			isValidated : true
		}
	},
	computed: {
		...mapGetters({
			isLoading: 'isLoading',
		})
	},
	methods: {
		...mapActions({
			itLoading: 'itLoading',
			itLoaded: 'itLoaded',
			login: 'login',
		}),
		validate(){
			if(!this.email.value
				.toLowerCase()
				.match(
					/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
				)) 
			{
				this.email.isValid = false
				this.isValidated = false
				this.email.err = 'Email is invalid'
			}
			if(this.email.value.length === 0) {
				this.email.isValid = false
				this.isValidated = false
				this.email.err = 'Email is required'
			}
			if(this.password.value.length === 0) {
				this.password.isValid = false
				this.isValidated = false
				this.password.err = 'Password is required'
			}
		},
		resetValidation(){
			this.isValidated = true
			this.email.isValid = true
			this.password.isValid = true
		},
		handleLogin(){
			this.resetValidation()
			this.validate()

			if(!this.isValidated){
				return
			}
			let form = {
				email : this.email.value,
				password : this.password.value,
			}
			this.itLoading()
			this.axios.post('/auth/login', form)
            .then((response) => {
				this.$router.replace('/home')
				this.login(response.data)
				alert('Loged in!')
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
input[type=text], input[type=password]  {
	width: 100%;
	padding: 12px;
	border: 1px solid #ccc;
	border-radius: 4px;
	box-sizing: border-box;
	resize: vertical;
	margin-bottom: 5px;
}

button {
  background-color: #04AA6D;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.disabled {
  background-color: #71a391;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
}

.form-control{
	margin-top: 6px;
	margin-bottom: 16px;
}
.form-control .invalid{
	justify-content: left;
	color: red;
}

form { 
	/* text-align: center; */
	margin: 0 auto; 
	width: 250px;
}
</style>
