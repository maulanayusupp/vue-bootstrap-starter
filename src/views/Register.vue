<template>
<div class="page page-auth">
	<div class="auth-box">
		<div class="headline-title text-center mb-3">
			<div class="mb-3">
				<img src="/img/logo/logo_small.png" class="img-fluid auth-logo" alt="Brand Logo">
			</div>
			<h2 class="mb-2">Create you Account</h2>
			<h5 class="mb-2">Signing up for Prodo is fast and free</h5>
		</div>

		<!-- Section Form -->
		<div class="card">
			<div class="card-body p-5">

				<!-- Info -->
				<user-info :user="user" />
			</div>
		</div>

		<!-- Login -->
		<div class="mt-2">
			{{ $t("Already have an account") }}? <router-link to="/login">{{ $t('Sign in') }}</router-link>
		</div>
	</div>
</div>
</template>

<script>

import { duplicateVar } from '@/lib/helper';
import {
	USER_DEFAULT,
} from '@/lib/static';

import UserInfo from '@/components/forms/UserInfo.vue';

export default {
	name: 'Register',
	components: {
		UserInfo,
	},
	data() {
		return {
			user: duplicateVar(USER_DEFAULT),
			lang: 'en',
			isSubmitting: false,
		};
	},
	sockets: {},
	mounted() {},
	created() {},
	destroyed() {},
	beforeDestroy() {},
	computed: {},
	methods: {
		reset() {
			this.user = duplicateVar(USER_DEFAULT);
		},
	},
};
</script>

<style lang="scss" scoped>
.card-list {
	margin-bottom: 1em;
	.card-list-item {
		padding: 1em 2em;
		border: 1px solid #dfdfdf;
		border-bottom: 0;
		&:last-child {
			border-bottom: 1px solid #dfdfdf;
		}
	}
}
</style>
