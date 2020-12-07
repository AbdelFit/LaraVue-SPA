<template>
	<div>
		<template v-if="!customers || customers.length == 0">
			<h1 class="text-center text-danger">No customer available !</h1>

			<div class="mt-5 mx-auto">
				<h2 class="text-center">You can add your first customer by clicking here</h2>
				<p class="mt-5 text-center mx-auto"><router-link to="/customers/create" class="btn btn-success :hover=btn-danger">Add customer</router-link></p>
			</div>
		</template>

		<template v-else>
			<div class="row">
				<ShowCustomer class="col-lg-4" v-for="customer in customers" :key="customer.id" :customer="customer" />
			</div>
		</template>
	</div>
</template>

<script>
import {mapGetters} from 'vuex';
import ShowCustomer from '../../components/ShowCustomer';

export default {
	components: {
		ShowCustomer
	},

	computed: {
		...mapGetters({
			customers: 'customers'
		})
	},

	mounted() {
		this.$store.dispatch('getCustomers');
	}
}
</script>