<template>
	<div class="d-flex justify-content-center">
		<div class="text-center border w-25 p-3">
			<img class="rounded-circle" src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" alt="Generic placeholder image" width="140" height="140">
			<h2>{{ customer.name }}</h2>
			<p>{{ customer.email }}</p>
			<p>{{ customer.phone }}</p>
			<a :href="customer.website">Visit Website</a>

			<div class="mt-4 mx-4 d-flex justify-content-between">
				<div><router-link :to="`/customers/${customer.id}/edit`" class="btn btn-success" href="#" role="button">Edit</router-link></div>
				<div><button class="btn btn-danger" @click.prevent="deleteCustomer()">Delete</button></div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			customer: {
				name: '',
				email: '',
				phone: '',
				website: '',
			}
		}
	},

	created() {
		this.getCustomer();
	},

	methods: {
		getCustomer() {
			this.$http.get(`/api/customers/${this.$route.params.id}`)
				.then((res) => this.customer = res.data.data);
		},

		deleteCustomer() {
			this.$http.delete(`/api/customers/${this.$route.params.id}`)
				.then((res) => this.$router.push('/customers'));
		}
	}
}
</script>