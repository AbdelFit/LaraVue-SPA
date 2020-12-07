<template>
	<div>
		<AuthApp mode="Register" :authError="authError"  @authenticate="auth" />
  </div>
</template>

<script>
import AuthApp from '../../components/AuthApp';
import {mapGetters} from "vuex";

export default {
	components: {
		AuthApp
	},

	computed: {
		...mapGetters({
			authError: "authError"
		}),
	},

	methods: {
		auth(form) {
			this.$store
				.dispatch("signup", form)
				.then(() => this.$router.push("/login"));
		}
	}
};
</script>
