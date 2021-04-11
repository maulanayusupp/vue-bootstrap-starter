<template>
<div class="interest-type">
	<div class="mb-3">I want to meet someone who has...</div>
	<div class="row mb-1">
		<div class="col-sm-6">
			<button type="button" class="btn btn-block btn-outline border-red mb-2" @click="setType('looks_charm')">Looks &amp; Charm</button>
		</div>
		<div class="col-sm-6">
			<button type="button" class="btn btn-block btn-outline border-red mb-2" @click="setType('success_wealth')">Success &amp; Wealth</button>
		</div>
	</div>
</div>
</template>

<script>
export default {
	name: 'InterestType',
	components: {},
	props: {
		user: {
			type: Object,
			default: () => null,
		},
	},
	data() {
		return {};
	},
	sockets: {},
	computed: {},
	methods: {
		setType(type) {
			this.user.interest_type = type;
		},
	},
	watch: {},
	mounted() {},
	created() {},
	destroyed() {},
	beforeDestroy() {},
};
</script>

<style lang="scss" scoped>
</style>
