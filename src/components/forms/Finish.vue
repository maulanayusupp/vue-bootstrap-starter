<template>
	<div class="row m-auto text-center">
		<div class="mt-4 mb-4 full-width">
			<div class="col-md-12">
				<div class="card">
					<div class="card-body">
						<div class="card-title border-bottom-content">
							You're done!
							<div class="text-small">
								Don't forget to verify your email!
							</div>
						</div>
						<div class="card-text">
							<div>
								<div class="mt-2 mb-2">
									A verified email address is required to message members on Prodo.
									<div class="mt-2">
										We sent a verification email to <span class="font-weight-bold">{{ userEmail }}</span>.
									</div>
								</div>
								<div class="mt-4 mb-4">
									<h5>Didn't get an email?</h5>
									<div class="mt-3 text-left">
										<div class="d-flex mb-3">
											<div>
												<i class="material-icons icon-summary">email</i>
											</div>
											<div>
												<span class="font-weight-bold">Check Spam Folder</span> - Sometimes our emails are misidentified as spam, so be sure to check your spam folder and mark us as "Not spam" if you find your verification email there!
											</div>
										</div>
										<div class="d-flex mb-3">
											<div>
												<i class="material-icons icon-summary">alternate_email</i>
											</div>
											<div>
												<span class="font-weight-bold">Change Email</span> - If you mistyped your email address (you can check above), or you just want to try a different account, you can <a href="">change your email address here</a>.
											</div>
										</div>
										<div class="d-flex mb-3">
											<div>
												<i class="material-icons icon-summary">forward_to_inbox</i>
											</div>
											<div>
												<span class="font-weight-bold">Resend Email</span> - We can send you a verification email again. <a href="">Resend your verification email</a>.
											</div>
										</div>
									</div>

									<div class="mt-3">
										<router-link to="/search">
											<button type="button" class="btn btn-lg btn-danger">Show Me Attractive members</button>
										</router-link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
	name: 'Summary',
	components: {},
	data() {
		return {};
	},
	sockets: {},
	computed: {
		...mapGetters({
			user: 'user',
		}),
		userEmail() {
			return this.user ? this.user.email : '-';
		},
	},
	methods: {
		close() {
			this.$emit('close');
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
.icon-summary {
	font-size: 70px;
	margin-right: .3em;
	color: #CF0403;
	position: relative;
	top: -6px;
}
</style>
