<template>
	<div class="new-accordion-item">
		<div class="new-accordion-item-header pointer" :class="{ 'active': isActive }" @click.prevent="isActive = !isActive">
			<div class="d-flex justify-content-between text-grey">
				<div class="accordion-header-title">
					<slot name="header"></slot>
				</div>
				<div>
					<i class="material-icons" v-show="!isActive">keyboard_arrow_down</i>
					<i class="material-icons" v-show="isActive">keyboard_arrow_up</i>
				</div>
			</div>
		</div>
		<div class="new-accordion-item-content" v-show="isActive">
			<slot name="body"></slot>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Accordion',
	components: {},
	props: {},
	data() {
		return {
			isActive: false,
		};
	},
	sockets: {},
	computed: {},
	methods: {},
	watch: {},
	mounted() {},
	created() {},
	destroyed() {},
	beforeDestroy() {},
};
</script>

<style lang="scss" scoped>
</style>
