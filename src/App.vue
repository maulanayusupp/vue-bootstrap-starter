<template>
    <div id="app">
		<!-- Navbar -->
        <navbar v-if="user && !isGuestUrl"></navbar>

		<!-- Main Content -->
        <router-view/>

		<!-- Footer -->
		<footer-section v-if="!isAuthUrl && user" />

		<!-- Notifications -->
		<notifications group="app" :ignoreDuplicates="true" position="bottom right" :max="3" :duration="4000" style="z-index: 99989!important;">
			<template slot="body" slot-scope="props">
				<div class="vue-notification" :class="props.item.type">
					<div class="d-flex justify-space-between">
						<div v-if="props.item.type === 'warning'" class="material-icons mr-2 mtb-a">error_outline</div>
						<div v-if="props.item.type === 'success'" class="material-icons mr-2 mtb-a">check</div>
						<div v-if="props.item.type === 'error'" class="material-icons mr-2 mtb-a">clear</div>
						<div class="title pt-1"> {{ props.item.text }}</div>
					</div>
				</div>
			</template>
		</notifications>
    </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';
import Navbar from '@/components/Navbar.vue';
import FooterSection from '@/components/Footer.vue';

export default {
	name: 'App',
	components: {
		Navbar,
		FooterSection,
    },
	data() {
		return {
		};
	},
	sockets: {
	},
	mounted() {},
	created() {
		if (this.isTokenExist) this.fetchUser();
	},
	destroyed() {},
	beforeDestroy() {},
	watch: {},
	computed: {
		...mapGetters({
			user: 'user',
			isTokenExist: 'isTokenExist',
		}),
		isGuestUrl() {
			const routePath = this.$route.path;
			const isIndex = routePath === '/';
			const isAllowed = isIndex
				|| routePath === '/maintenance'
				|| routePath === '/login'
				|| routePath === '/register'
				|| routePath === '/magic-link'
				|| routePath === '/reset-password'
				|| routePath === '/password/reset'
				|| routePath === '/confirmation-email'
				|| routePath === '/auto_login'
				|| routePath === '/user/verify'
				|| routePath === '/about-us'
				|| routePath === '/privacy-policy'
				|| routePath === '/terms-and-conditions'
				|| routePath === '/terms-of-use'
				|| routePath === '/how-it-works'
				|| routePath.indexOf('/password/reset') !== -1;
			return isAllowed;
		},
		isAuthUrl() {
			const routePath = this.$route.path;
			const isAllowed = routePath === '/login'
				|| routePath === '/register'
				|| routePath === '/magic-link'
				|| routePath === '/reset-password'
				|| routePath === '/password/reset'
				|| routePath === '/confirmation-email'
				|| routePath === '/auto_login'
				|| routePath === '/user/verify'
				|| routePath.indexOf('/password/reset') !== -1;
			return isAllowed;
		},
	},
	methods: {
		...mapActions({
			fetchUser: 'fetchUser',
		}),
	},
};
</script>

<style lang="scss">
    @import '@/assets/scss/main.scss';
	[v-cloak] {
		display: none;
	}
</style>
