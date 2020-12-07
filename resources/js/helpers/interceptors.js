const request = (store, axios) => {
	axios.interceptors.request.use(
		config => {
			const token = store.getters.currentUser.token
			if (token) {
				config.headers['Authorization'] = `Bearer ${token}`;
			}

			return config;
		},
		error => {
			return Promise.reject(error);
		}
	);
}

const response = (store, router, axios) => {
	axios.interceptors.response.use(null, (error) => {
		if (error.response.status === 401) {
			store.commit('logout')
			router.push('/login')
		} else if (error.response.status === 404) {
			router.push('/')
		} else if (error.response.status === 403) {
			router.push('*')
		}

		return Promise.reject(error)
	});
}

export {
	request,
	response
}