<template>
	<div class="row justify-content-center">
		<div class="col-md-4">
			<div class="card">
				<div class="card-header">{{ mode }} customer</div>

				<div class="card-body">
					<ValidationObserver v-slot="{ handleSubmit }">
						<form @submit.prevent="handleSubmit(saveCustomer)">
							<ValidationProvider
								name="name"
								rules="required|alpha_spaces"
								v-slot="{ errors }"
							>
								<div class="form-group row">
									<label for="name">Name*</label>
									<input
										class="form-control"
										v-model="customer.name"
										type="text"
										placeholder="Name..."
									/>
									<small
										class="text-sm text-danger font-italic"
										>{{ errors[0] }}</small
									>
								</div>
							</ValidationProvider>

							<ValidationProvider
								name="email"
								rules="required|email"
								v-slot="{ errors }"
							>
								<div class="form-group row">
									<label for="name">Email Address*</label>
									<input
										class="form-control"
										v-model="customer.email"
										type="email"
										placeholder="Email Address..."
									/>
									<small
										class="text-sm text-danger font-italic"
										>{{ errors[0] }}</small
									>
								</div>
							</ValidationProvider>

							<ValidationProvider
								name="phone"
								rules="required|numeric|min:10|max:13"
								v-slot="{ errors }"
							>
								<div class="form-group row">
										<label for="name">Phone Number*</label>
										<input
											class="form-control"
											v-model="customer.phone"
											type="text"
											placeholder="Phone number should be at least 10 characters..."
										/>
										<small
											class="text-sm text-danger font-italic"
											>{{ errors[0] }}</small
										>
								</div>
							</ValidationProvider>

							<ValidationProvider
								name="website"
								:rules="{ regex: /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/ }"
								v-slot="{ errors }"
							>
								<div class="form-group row">
										<label for="name">Website*</label>
										<input
											class="form-control"
											v-model="customer.website"
											type="text"
											placeholder="Website..."
										/>
										<small
											class="text-sm text-danger font-italic"
											>{{ errors[0] }}</small
										>
								</div>
							</ValidationProvider>

							<div class="d-flex justify-content-between">
								<div class="">
									<router-link v-if="customer.id" :to="`/customers/${customer.id}`" class="btn btn-danger align-content-start">Cancel</router-link>
									<router-link v-else to="/customers" class="btn btn-danger align-content-start">Cancel</router-link>
								</div>
								<div class="">
									<input class="btn btn-success align-content-end" type="submit" value="Save">
								</div>
							</div>
						</form>
					</ValidationObserver>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {url} from 'vee-validate';

export default {
	name: 'customer-modify',

	props: {
		mode: {
			type: String,
			required: true
		},
		customer: {
			type: Object,
			required: true
		}
	},

	methods: {
		saveCustomer() {
			this.$emit('saveCustomer', this.customer);
		}
	}
}
</script>