<template>
	<div class="row m-auto text-center">
		<div class="mt-4 mb-4 full-width">
			<div class="col-md-12">
				<div class="card">
					<div class="card-body">
						<div class="card-title border-bottom-content pb-4 mt-3 mb-4">
							Birth Date
							<div>
								Great! Tell us about yourself...
							</div>
						</div>

						<!-- Body -->
						<div class="card-text mb-3">
							<!-- Birth Date -->
							<div class="form-group text-left mb-3 d-flex justify-content-between">
								<label>{{ $t('Birth Date') }}</label>
								<div class="font-weight-bold pointer" v-tooltip="'Your Birth Date'">{{ formateDate(birth_date) }}</div>
							</div>

							<div>
								<!-- Where are you located? -->
								<new-accordion>
									<template slot="header">
										<div class="font-weight-bold">
											{{ $t('Where are you located?') }}
										</div>
									</template>
									<template slot="body">
										<div class="form-group text-left">
											<select name="height" class="form-control" v-model="location">
												<option value="" disabled selected>Select your location</option>
												<option :value="item.id" v-for="(item, index) in cities" :key="index">{{ item.name }}</option>
											</select>
										</div>
									</template>
								</new-accordion>
							</div>
						</div>

						<!-- Continue -->
						<div class="continue-step mt-3 mb-2">
							<button type="button" class="btn btn-lg btn-danger" :class="{ 'is-loading': isSaving }" @click="continueAndSave()">Save</button>
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
import { CITIES } from '@/lib/static';
// import DatePicker from 'vue2-datepicker';
// import 'vue2-datepicker/index.css';
import { getAxiosErrorMessage, formateDate, duplicateVar } from '@/lib/helper';
import NewAccordion from '@/components/parts/NewAccordion.vue';

export default {
	name: 'BirthDateLocation',
	components: {
		// DatePicker,
		NewAccordion,
	},
	props: {
		isUpdateProfile: {
			type: Boolean,
			default: () => false,
		},
	},
	data() {
		return {
			cities: duplicateVar(CITIES),
			birth_date: null,
			location: null,
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
		formateDate(birthDate) {
			const myBirthDate = birthDate ? formateDate(birthDate) : '-';
			return myBirthDate;
		},
		setData() {
			if (this.user) {
				const birthDate = new Date(this.userProfile.birth_date);
				this.birth_date = birthDate;
				this.location = this.userProfile.location;
			}
		},
		continueAndSave() {
			// Validation
			if (!this.birth_date) {
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
				birth_date: this.birth_date,
			};
			if (this.location) params.location = this.location;
			this.isSaving = true;
			const callback = (response) => {
				const user = response.data;
				this.setUser(user);
				this.isSaving = false;
				this.$emit('nextStep');

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
	mounted() {
		this.setData();
	},
	created() {},
	destroyed() {},
	beforeDestroy() {},
};
</script>

<style lang="scss" scoped>
</style>
