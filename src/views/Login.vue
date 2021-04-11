<template>
<div class="page page-auth">
	<div class="auth-box">
		<div class="headline-title text-center mb-3">
			<div class="mb-3">
				<img src="/img/logo/logo_small.png" class="img-fluid auth-logo" alt="Brand Logo">
			</div>
			<h5 class="mb-2">Login Secure, Fast and Free.</h5>
		</div>
		<div class="card">
			<div class="card-body p-5">
				<div class="card-text">
					<form @submit.prevent="login()">
						<div class="form-group">
							<label for="inputEmail">{{ $t('Email address') }}</label>
							<input type="email" class="form-control" id="inputEmail" aria-describedby="emailHelp" v-model="email">
						</div>

						<div class="form-group">
							<label for="inputPassword">{{ $t('Password') }}</label>
							<router-link to="/reset-password" class="forgot-password-link">{{ $t('Forgot password') }}?</router-link>
							<!-- Password -->
							<input-password v-model="password"/>
						</div>

						<button type="submit" class="btn btn-danger btn-block" :class="{ 'is-loading': isSubmitting}">{{ $t('Sign in') }}</button>

						<div class="text-center mt-2">
							{{ $t("Don't have an account") }}? <router-link to="/register">{{ $t('Join Now') }}</router-link>
							<div>
								<router-link to="/magic-link">{{ $t('Magic Link') }}</router-link>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>

		<!-- Terms Info -->
		<div class="mt-2 text-small">
			By continuing you agree to Prodo's <router-link to="/terms-of-use" target="_blank">Terms</router-link> and <router-link to="/privacy-policy" target="_blank">Privacy Policy</router-link> and to receive our emails. Users must be at least 18 years old.
		</div>
	</div>
</div>
</template>

<script>

import { mapActions } from 'vuex';
import authApi from '@/api/auth';
import { getAxiosErrorMessage } from '@/lib/helper';
import InputPassword from '@/components/InputPassword.vue';

export default {
	name: 'Login',
	components: {
		InputPassword,
	},
	data() {
		return {
			email: null,
			password: null,
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
		...mapActions({
			setToken: 'setToken',
		}),
		login() {
			const params = {
				email: this.email,
				password: this.password,
				lang: this.lang,
			};
			this.isSubmitting = true;
			const callback = (response) => {
				const data = response.data;
				this.setToken(data);
				this.isSubmitting = false;
			};
			const errorCallback = (e) => {
				const message = getAxiosErrorMessage(e);
				this.$notify({
					group: 'app',
					type: 'error',
					title: this.$t('Login'),
					text: message,
				});
				this.isSubmitting = false;
			};
			authApi.login(params, callback, errorCallback);
		},
	},
};
</script>

<style lang="scss" scoped>
.page-login {
}
</style>
