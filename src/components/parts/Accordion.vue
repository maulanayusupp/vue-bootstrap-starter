<template>
	<div class="accordion-item">
		<div class="accordion-item-header">
			<div class="d-flex justify-content-between text-grey pointer" @click.prevent="isActive = !isActive">
				<div>
					{{ title }}
				</div>
				<div>
					<i class="material-icons" v-show="!isActive">keyboard_arrow_down</i>
					<i class="material-icons" v-show="isActive">keyboard_arrow_up</i>
				</div>
			</div>
		</div>
		<div class="accordion-item-content py-2" v-show="isActive">
			<slot />
		</div>
	</div>
</template>

<script>
export default {
	name: 'Accordion',
	components: {},
	props: {
		title: {
			type: String,
			default: () => null,
		},
	},
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
.accordion-item-header {
	line-height: 1;
}
</style>
