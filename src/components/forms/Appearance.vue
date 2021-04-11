<template>
	<div class="row m-auto text-center">
		<div class="mt-4 mb-4 full-width">
			<div class="col-md-12">
				<div class="card">
					<div class="card-body">
						<div class="card-title border-bottom-content pb-4 mt-3 mb-4">
							What do you look like?
						</div>

						<!-- Body -->
						<div class="card-text mb-3">
							<div>
								<!-- Height -->
								<new-accordion>
									<template slot="header">
										<div class="font-weight-bold">
											{{ $t('Height') }}
											<span v-if="appearance.height" class="font-weight-bold">({{ heightLabel(appearance.height) }})</span>
										</div>
									</template>
									<template slot="body">
										<div class="form-group text-left">
											<select name="height" class="form-control" v-model="appearance.height">
												<option value="" disabled selected>Select your option</option>
												<option :value="item.id" v-for="(item, index) in heightTypes" :key="index">{{ item.name }}</option>
											</select>
										</div>
									</template>
								</new-accordion>

								<!-- Body Type -->
								<new-accordion>
									<template slot="header">
										<div class="font-weight-bold">
											{{ $t('Body Type') }}
											<span v-if="appearance.body_type" class="font-weight-bold">({{ bodyTypeLabel(appearance.body_type) }})</span>
										</div>
									</template>
									<template slot="body">
										<div class="row">
											<div class="col-sm-4 mb-2" v-for="(item, index) in bodyTypes" :key="index">
												<button
													class="btn btn-outline border-red btn-lg btn-block ellipsis-text text-none"
													:class="selectedBodyTypeClass(item.id)"
													v-tooltip="item.name"
													@click="setType(item.id)">
													{{ item.name }}
												</button>
											</div>
										</div>
									</template>
								</new-accordion>

								<!-- Ethnicity -->
								<new-accordion>
									<template slot="header">
										<div class="font-weight-bold">
											{{ $t('Ethnicity') }}
											<span v-if="appearance.ethnicity" class="font-weight-bold">({{ ethnicityLabel(appearance.ethnicity) }})</span>
										</div>
									</template>
									<template slot="body">
										<div class="row">
											<div class="col-sm-4 mb-2" v-for="(item, index) in ethnicityTypes" :key="index">
												<button
													class="btn btn-outline border-red btn-lg btn-block ellipsis-text text-none"
													:class="selectedEthnicityClass(item.id)"
													v-tooltip="item.name"
													@click="setEthnicity(item.id)">
													{{ item.name }}
												</button>
											</div>
										</div>
									</template>
								</new-accordion>

								<!-- Hair Color -->
								<new-accordion>
									<template slot="header">
										<div class="font-weight-bold">
											{{ $t('Hair Color') }}
											<span v-if="appearance.hair_color" class="font-weight-bold">({{ hairColorLabel(appearance.hair_color) }})</span>
										</div>
									</template>
									<template slot="body">
										<div class="form-group text-left">
											<select name="height" class="form-control" v-model="appearance.hair_color">
												<option value="" disabled selected>Select your option</option>
												<option :value="item.id" v-for="(item, index) in hairTypes" :key="index">{{ item.name }}</option>
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
import {
	BODY_TYPES,
	ETHNICITY_TYPES,
	HEIGHT_TYPES,
	HAIR_TYPES,
} from '@/lib/static';
import { getAxiosErrorMessage, duplicateVar } from '@/lib/helper';
import NewAccordion from '@/components/parts/NewAccordion.vue';

export default {
	name: 'Appearance',
	components: {
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
			heightTypes: duplicateVar(HEIGHT_TYPES),
			bodyTypes: duplicateVar(BODY_TYPES),
			ethnicityTypes: duplicateVar(ETHNICITY_TYPES),
			hairTypes: duplicateVar(HAIR_TYPES),
			appearance: {
				height: null,
				body_type: null,
				ethnicity: null,
				hair_color: null,
			},
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
		setType(id) {
			this.appearance.body_type = id;
		},
		setEthnicity(id) {
			this.appearance.ethnicity = id;
		},
		heightLabel(id) {
			const item = this.heightTypes.find(curr => String(curr.id) === String(id));
			const label = item ? item.name : '-';
			return label;
		},
		bodyTypeLabel(id) {
			const item = this.bodyTypes.find(curr => curr.id === id);
			const label = item ? item.name : '-';
			return label;
		},
		ethnicityLabel(id) {
			const item = this.ethnicityTypes.find(curr => curr.id === id);
			const label = item ? item.name : '-';
			return label;
		},
		hairColorLabel(id) {
			const item = this.hairTypes.find(curr => curr.id === id);
			const label = item ? item.name : '-';
			return label;
		},
		selectedBodyTypeClass(id) {
			const labelClass = this.appearance.body_type === id ? 'btn-danger' : '';
			return labelClass;
		},
		selectedEthnicityClass(id) {
			const labelClass = this.appearance.ethnicity === id ? 'btn-danger' : '';
			return labelClass;
		},
		setData() {
			if (this.user) {
				const appearance = typeof (this.userProfile.appearance) === 'string' ? JSON.parse(this.userProfile.appearance) : this.appearance;
				this.appearance = duplicateVar(appearance);
			}
		},
		continueAndSave() {
			// Validation
			if (!this.appearance.height || !this.appearance.body_type || !this.appearance.ethnicity || !this.appearance.hair_color) {
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
				appearance: JSON.stringify(this.appearance),
			};
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
	mounted() {},
	created() {
		this.setData();
	},
	destroyed() {},
	beforeDestroy() {},
};
</script>

<style lang="scss" scoped></style>
