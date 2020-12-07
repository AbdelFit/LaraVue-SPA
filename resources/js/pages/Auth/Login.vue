<template>
	<div>
		<AuthApp mode="Login" :authError="authError"  @authenticate="auth" />
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
				.dispatch("login", form)
				.then(() => this.$router.push("/"));
		}
	}
};
</script>
