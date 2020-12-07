<template>
	<div>
		<ModifyCustomer :customer="customer" :mode="'Create'" @saveCustomer="save"/>
	</div>
</template>

<script>
import ModifyCustomer from '../../components/ModifyCustomer';
import transport from '../../helpers/transport';
import {mapGetters} from 'vuex';

export default {
	data() {
		return {
			customer: {
				id: '',
				name: '',
				email: '',
				phone: '',
				website: '',
				user_id: ''
			}
		}
	},

	components: {
		ModifyCustomer
	},

	computed: {
		...mapGetters({
			currentUser: 'currentUser'
		})
	},

	methods: {
		save(data) {
			data.user_id = this.currentUser.id;
			transport.post('/api/customers', data)
				.then(() => this.$router.push('/customers'))
				.catch(err => console.log(err));
		}
	}
}
</script>