<template>
	<div class="row justify-content-center">
		<div class="col-md-4">
			<div class="card">
				<div class="card-header">{{ mode }}</div>

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
								v-if="!isLogin()"
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
								name="email"
								rules="required|email"
								v-slot="{ errors }"
							>
								<div class="form-group row">
									<label for="name">Email Address*</label>
									<input
										class="form-control"
										v-model="form.email"
										type="email"
										placeholder="Email Address"
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
										<label for="name">Password*</label>
										<input
											class="form-control"
											v-model="form.password"
											type="password"
											placeholder="Password should be at least 8 characters"
										/>
										<small
											class="text-sm text-danger font-italic"
											>{{ errors[0] }}</small
										>
								</div>
							</ValidationProvider>

							<div class="form-group row">
								<button class="btn btn-primary" type="submit">
									{{ mode }}
								</button>
							</div>
						</form>
					</ValidationObserver>
				</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
	name: "auth-app",

	props: {
		mode: {
			type: String,
			required: true
		},
		authError: {
			type: String,
			required: false
		}
	},

	data() {
		return {
			form: {
				name: "",
				email: "",
				password: ""
			}
		};
	},

	methods: {
		auth() {
			this.$emit('authenticate', this.form);
		},

		isLogin() {
			return this.mode === 'Login';
		}
	}
};
</script>
