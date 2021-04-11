<template>
	<div class="row m-auto text-center">
		<div class="mt-4 mb-4 full-width">
			<div class="col-md-12">
				<div class="card">
					<div class="card-body">
						<div class="card-title border-bottom-content pb-4 mt-3 mb-4">
							Add the finishing touches to your profile!
						</div>

						<!-- Body -->
						<div class="card-text">
							<div class="row">
								<!-- Summary -->
								<div class="col-md-12">
									<div class="form-group text-left">
										<label for="inputSummary">{{ $t('Heading') }}</label>
										<input type="text" class="form-control" id="inputSummary" v-model="summary">
									</div>
								</div>

								<!-- About Me -->
								<div class="col-md-12 mt-3">
									<div class="form-group text-left">
										<label for="inputBiography">{{ $t('About Me') }}</label>
										<textarea class="form-control" id="inputBiography" v-model="biography" rows="5"></textarea>
									</div>
								</div>
							</div>
						</div>

						<!-- Finish -->
						<div class="continue-step mt-3 mb-2">
							<button type="button" class="btn btn-lg btn-danger" :class="{ 'is-loading': isSaving }" @click="finish()">Save</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';
import authApi from '@/api/auth';
import { getAxiosErrorMessage, duplicateVar } from '@/lib/helper';

export default {
	name: 'Summary',
	components: {},
	props: {
		isUpdateProfile: {
			type: Boolean,
			default: () => false,
		},
	},
	data() {
		return {
			summary: null,
			biography: null,
			isSaving: false,
		};
	},
	sockets: {},
	computed: {
		...mapGetters({
			user: 'user',
		}),
		userProfile() {
			return this.user && this.user.profile ? this.user.profile : null;
		},
	},
	methods: {
		...mapActions({
			setUser: 'setUser',
		}),
		finish() {
			this.continueAndSave();
		},
		setData() {
			if (this.user) {
				this.summary = duplicateVar(this.userProfile.summary);
				this.biography = duplicateVar(this.userProfile.biography);
			}
		},
		continueAndSave() {
			// Validation
			if (!this.summary || !this.biography) {
				this.$notify({
					group: 'app',
					type: 'error',
					title: 'Profile',
					text: 'Please fill out the form completely',
				});
				return;
			}

			// Call API
			const params = {
				summary: this.summary,
				biography: this.biography,
			};
			this.isSaving = true;
			const callback = (response) => {
				const user = response.data;
				this.setUser(user);
				this.isSaving = false;
				this.$emit('finish');

				// Update profile
				if (this.isUpdateProfile) {
					const message = 'Profile Updated';
					this.$notify({
						group: 'app',
						type: 'success',
						title: 'Profile Update',
						text: message,
					});
				}
			};
			const errorCallback = (e) => {
				const message = getAxiosErrorMessage(e);
				this.$notify({
					group: 'app',
					type: 'error',
					title: 'Save',
					text: message,
				});
				this.isSaving = false;
			};
			authApi.updateProfile(params, callback, errorCallback);
		},
	},
	watch: {},
	mounted() {},
	created() {
		this.setData();
	},
	destroyed() {},
	beforeDestroy() {},
};
</script>

<style lang="scss" scoped>
</style>
