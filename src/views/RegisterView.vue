<template>
	<div>
		<form @submit.prevent="register()">
			<div class="form-control">
				<input type="text" placeholder="name" v-model="name.value">
				<span class="invalid" v-show="!name.isValid">{{ name.err }}</span>
			</div>
			<div class="form-control">
				<input type="text" placeholder="email" v-model="email.value">
				<span class="invalid" v-show="!email.isValid">{{ email.err }}</span>
			</div>

			<div class="form-control">
				<input type="password" placeholder="password" v-model="password.value">
				<span class="invalid" v-show="!password.isValid">{{ password.err }}</span>
			</div>

			<div class="form-control">
				<input type="password" placeholder="password confirmation" v-model="password_confirmation.value">
				<span class="invalid" v-show="!password_confirmation.isValid">{{ password_confirmation.err }}</span>
			</div>
			<div v-if="!isLoading">
				<button type="submit">Register</button>
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
			name : {
				value: 'kadek',
				isValid: '',
				err: ''
			},
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
			password_confirmation: {
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
		}),
		validate(){
			if(this.name.value.length === 0) {
				this.name.isValid = false
				this.isValidated = false
				this.name.err = 'Name is required'
			}
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
			if(this.password_confirmation.value !== this.password.value) {
				this.password_confirmation.isValid = false
				this.isValidated = false
				this.password_confirmation.err = 'Password is not match'
			}
		},
		resetValidation(){
			this.isValidated = true
			this.name.isValid = true
			this.email.isValid = true
			this.password.isValid = true
			this.password_confirmation.isValid = true
		},
		register(){
			this.resetValidation()
			this.validate()

			if(!this.isValidated){
				return
			}
			let form = {
				name: this.name.value,
				email : this.email.value,
				password : this.password.value,
				password_confirmation : this.password_confirmation.value
			}
			this.itLoading()
			// let that = this
			// setTimeout(function(){
			// 	console.log(form)
			// 	that.itLoaded()
			// }, 1000)

			this.axios.post('/auth/register', form)
            .then((response) => {
				alert('Registered')
				console.log(response)
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
