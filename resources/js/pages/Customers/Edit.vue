<template>
	<div>
		<ModifyCustomer v-if="customer" :customer="customer" :mode="'Edit'" @saveCustomer="save"/>
	</div>
</template>

<script>
import ModifyCustomer from '../../components/ModifyCustomer';
import transport from '../../helpers/transport';

export default {
	data() {
		return {
			customer: {
				id: '',
				name: '',
				email: '',
				phone: '',
				website: ''
			}
		}
	},

	components: {
		ModifyCustomer
	},

	created() {
		this.getCustomer();
	},

	methods: {
		getCustomer() {
			this.$http.get(`/api/customers/${this.$route.params.id}`)
				.then(res => this.customer = res.data.data);
		},

		save(data) {
			transport.put(`/api/customers/${data.id}`, data)
				.then(() => this.$router.push(`/customers/${data.id}`))
				.catch(err => console.log(err));
		}
	}
}
</script>