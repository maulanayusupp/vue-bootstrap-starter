<template>
<div class="gender-form">
	<div class="mb-3">I am a...</div>
	<div class="row mb-1">
		<div class="col-sm-6">
			<button type="button" class="btn btn-block btn-outline border-red mb-2" @click="setGender('women')">Woman</button>
		</div>
		<div class="col-sm-6">
			<button type="button" class="btn btn-block btn-outline border-red mb-2" @click="setGender('men')">Man</button>
		</div>
	</div>
</div>
</template>

<script>
export default {
	name: 'GenderForm',
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
		setGender(gender) {
			this.user.gender = gender;
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
