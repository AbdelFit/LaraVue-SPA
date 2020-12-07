<template>
	<div>
		<img class="rounded-circle" src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" alt="Generic placeholder image" width="140" height="140">
		<h5>{{ customer.name }}</h5>
		<p><router-link :to="`/customers/${customer.id}`" class="btn btn-secondary" href="#" role="button">View details &raquo;</router-link></p>
	</div>
</template>

<script>
export default {
	name: 'show-costumer',

	props: {
		customer: {
			type: Object,
			required: true
		}
	}
}
</script>