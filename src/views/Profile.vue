<template>
<div class="page page-profile">
	<div class="container">
		<!-- Profile Details -->
		<profile-details :user="user" v-if="user" :is-my-profile="true" />
	</div>
</div>
</template>

<script>

import { mapGetters } from 'vuex';
import ProfileDetails from '@/components/ProfileDetails.vue';

export default {
	name: 'Profile',
	components: {
		ProfileDetails,
	},
	data() {
		return {
		};
	},
	computed: {
		...mapGetters({
			user: 'user',
			isSuperAdmin: 'isSuperAdmin',
			isClient: 'isClient',
		}),
	},
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
