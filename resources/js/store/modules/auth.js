import axios from "axios";
import store from "../../store";

export default {
	state: {
		currentUser: JSON.parse(localStorage.getItem("user")),
		isLoggedIn: !!localStorage.getItem("user"),
		auth_error: null
	}, 

	getters: {
		isLoggedIn(state) {
			return state.isLoggedIn;
		},

		currentUser(state) {
			return state.currentUser;
		},

		authError(state) {
			return state.auth_error;
		}
	}, 

	mutations: {
		loginSuccess(state, payload) {
			state.currentUser = Object.assign({}, payload.user, {token: payload.access_token});
			state.auth_error = null;
			state.isLoggedIn = true;

			localStorage.setItem("user", JSON.stringify(state.currentUser));
		},

		signUpSuccess(state) {
			state.auth_error = null;
		},

		authFailed(state, payload) {
			state.auth_error = payload;
		},

		logout(state) {
			localStorage.removeItem("user");
			state.isLoggedIn = false;
			state.currentUser = null;
		}
	}, 

	actions: {
		login(context, credentials) {
			return new Promise((resolve, reject) => {
				axios.post('api/auth/login', credentials)
					.then(response => {
						context.commit("loginSuccess", response.data);
						resolve();
					})
					.catch(error => {
						context.commit('authFailed', error.response.data.error);
						reject();
					})
			});
		},

		signup(context, credentials) {
			return new Promise((resolve, reject) => {
				axios.post('/api/auth/signup', credentials)
					.then(() => {
						context.commit("signUpSuccess");
						resolve();
					})
					.catch((error) => {
						context.commit('authFailed', error.response.data.error.email[0]);
						reject();
					})
			});
		},

		update(context, credentials) {
			const header = { headers: { Authorization: `Bearer ${store.getters.currentUser.token}` } };

			return new Promise((resolve, reject) => {
				axios.post('/api/auth/update', credentials, header)
					.then((response) => {
						context.commit("loginSuccess", response.data);
						resolve();
					})
					.catch((error) => {
						context.commit('authFailed', error.response.data.error);
						reject();
					})
			});
		}
	}
};