import transport from '../../helpers/transport';

export default {
	state: {
		customers: []
	}, 

	getters: {
		customers(state) {
			return state.customers;
		}
	}, 

	mutations: {
		setCustomers(state, payload) {
			state.customers = payload;
		}
	}, 

	actions: {
		getCustomers(context) {
			transport.get('/api/customers')
				.then(res => context.commit('setCustomers', res.data.data));
		}
	}
};