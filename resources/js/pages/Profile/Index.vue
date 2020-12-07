<template>
	<div>
		<div class="mt--6 container-fluid">
			<div class="row">
				<div class="order-xl-2 mb-5 col-xl-4">
					<div alt="Image placeholder" class="card card-profile">
						<div class="row justify-content-center">
							<div class="col-lg-6">
								<div class="card-profile-image">
									<img src="https://support.hubstaff.com/wp-content/uploads/2019/08/good-pic-300x286.png" alt="" class="rounded-circle" width="150">
								</div>
							</div>
						</div>

						<div class="card-body pt-0">
							<div class="text-center mt-1">
								<h5>
									{{ currentUser.name }}
								</h5>
							</div>

							<hr>

							<div class="row">
								<div class="col">
									<div class="card-profile-stats d-flex justify-content-center">
										<div>
											<span class="heading">{{ customers.length }}</span>
											<span class="description">Customers</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="order-xl-1 col-xl-8">
					<div class="card">
						<div class="card-header">
							<div class="row align-items-center">
								<div class="col-8">
									<h3 class="mb-0">Edit profile</h3>
								</div>
							</div>
						</div>

						<div class="card-body">
							<ValidationObserver v-slot="{ handleSubmit }">
								<form @submit.prevent="handleSubmit(auth)">
									<div class="form-group row" v-if="authError">
										<p class="text-center text-danger">{{ authError }}</p>
									</div>

									<ValidationProvider
										name="name"
										rules="required|alpha"
										v-slot="{ errors }"
									>
										<div class="form-group row">
											<label for="name">Name*</label>
											<input
												class="form-control"
												v-model="form.name"
												type="text"
												placeholder="Name"
											/>
											<small
												class="text-sm text-danger font-italic"
												>{{ errors[0] }}</small
											>
										</div>
									</ValidationProvider>

									<ValidationProvider
										name="password"
										rules="required|min:8"
										v-slot="{ errors }"
									>
										<div class="form-group row">
												<label for="name">Old Password*</label>
												<input
													class="form-control"
													v-model="form.oldPassword"
													type="password"
													placeholder="Password should be at least 8 characters"
												/>
												<small
													class="text-sm text-danger font-italic"
													>{{ errors[0] }}</small
												>
										</div>
									</ValidationProvider>

									<ValidationProvider
										name="password"
										rules="required|min:8"
										v-slot="{ errors }"
									>
										<div class="form-group row">
												<label for="name">New Password*</label>
												<input
													class="form-control"
													v-model="form.newPassword"
													type="password"
													placeholder="Password should be at least 8 characters"
												/>
												<small
													class="text-sm text-danger font-italic"
													>{{ errors[0] }}</small
												>
												<small
													class="text-sm text-danger font-italic"
													v-if="error"
													>The new password should be different than the old one!</small
												>
										</div>
									</ValidationProvider>

									<div class="form-group row">
										<button class="btn btn-primary" type="submit">Save</button>
									</div>
								</form>
							</ValidationObserver>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
	data() {
		return {
			form: {
				name: null,
				oldPassword: null,
				newPassword: null
			},
			error: false
		}
	},

	computed: {
		...mapGetters({
			currentUser: "currentUser",
			customers: "customers",
			authError: "authError"
		})
	},

	mounted() {
		this.$store.dispatch("getCustomers");
	},

	methods: {
		auth() {
			if(this.form.newPassword != this.form.oldPassword) {
				this.error = false;

				this.$store
					.dispatch("update", this.form)
					.then(() => this.$router.push("/"));
			} else
				this.error = true;
		}
	}
}
</script>