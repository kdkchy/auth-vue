export default {
    state: () => ({
        token: null,
        user: null,
    }),
    mutations: { 
		setUser(state, payload){
			state.token = payload.token
			state.user = payload.user
		}
	},
	actions: {
		login(context, payload){
			let token = payload.access_token
			let user = JSON.stringify(payload.user)
			localStorage.setItem('token', token);
			localStorage.setItem('user', user);
			context.commit('setUser', {
				token,
				user
			});
		},
		tryLogin(context) {
			const token = localStorage.getItem('token');
			const user = localStorage.getItem('user');
	
			if (token && user) {
				context.commit('setUser', {
					token: token,
					user: JSON.parse(user),
				});
			}
		},
		logout(context) {
			localStorage.removeItem('token');
			localStorage.removeItem('user');
	
			context.commit('setUser', {
				token: null,
				user: null,
			});
		},
	},
	getters: {
		user(state) {
			return state.user;
		},
	
		token(state) {
			return state.token;
		},
		
		isAuthenticated(state) {
			return !!state.token;
		},
	}
};
