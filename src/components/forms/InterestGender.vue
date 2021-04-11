<template>
<div class="interest-gender">
	<div class="mb-3">I am interested in meeting...</div>
	<div class="row mb-1">
		<div class="col-sm-6">
			<button type="button" class="btn btn-block btn-outline border-red mb-2" @click="setInterest('women')">Women</button>
		</div>
		<div class="col-sm-6">
			<button type="button" class="btn btn-block btn-outline border-red mb-2" @click="setInterest('men')">Men</button>
		</div>
		<div class="col-sm-12">
			<button type="button" class="btn btn-block btn-outline border-red mb-2" @click="setInterest('both')">Both</button>
		</div>
	</div>
</div>
</template>

<script>
export default {
	name: 'InterestGender',
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
		setInterest(gender) {
			this.user.interest_gender = gender;
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
