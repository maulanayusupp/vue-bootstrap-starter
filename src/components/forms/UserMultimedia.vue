<template>
<div class="user-multimedia">
	<div class="mb-4">
		<h3>Public photo's</h3>
		<user-media :is-private="false" />
	</div>
	<div class="mb-4">
		<h3>Private photo's</h3>
		<user-media :is-private="true" />
	</div>
</div>
</template>

<script>

import UserMedia from '@/components/forms/UserMedia.vue';

export default {
	name: 'UserMultimedia',
	components: {
		UserMedia,
	},
	data() {
		return {};
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
.user-multimedia {
}
</style>
