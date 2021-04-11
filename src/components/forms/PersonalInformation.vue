<template>
	<div class="row m-auto text-center">
		<div class="mt-4 mb-4 full-width">
			<div class="col-md-12">
				<div class="card">
					<div class="card-body">
						<div class="card-title border-bottom-content pb-4 mt-3 mb-4">
							Personal Information
						</div>

						<!-- Body -->
						<div class="card-text mb-3">
							<div>

								<!-- Occupation Industry -->
								<new-accordion>
									<template slot="header">
										<div class="font-weight-bold">
											{{ $t('Occupation Industry') }}
											<span v-if="personal_information.occupation_industry" class="font-weight-bold">({{ occupationIndustryLabel(personal_information.occupation_industry) }})</span>
										</div>
									</template>
									<template slot="body">
										<div class="form-group text-left">
											<select name="height" class="form-control" v-model="personal_information.occupation_industry">
												<option value="" disabled selected>Select your option</option>
												<option :value="item.id" v-for="(item, index) in occupationIndustryTypes" :key="index">{{ item.name }}</option>
											</select>
										</div>
									</template>
								</new-accordion>

								<!-- Education -->
								<new-accordion>
									<template slot="header">
										<div class="font-weight-bold">
											{{ $t('Education') }}
											<span v-if="personal_information.education" class="font-weight-bold">
												({{ educationLabel(personal_information.education) }})
											</span>
										</div>
									</template>
									<template slot="body">
										<div class="row">
											<div class="col-sm-4 mb-2" v-for="(item, index) in educationLevels" :key="index">
												<button
													class="btn btn-outline border-red btn-lg btn-block ellipsis-text text-none"
													:class="selectedEducationClass(item.id)"
													v-tooltip="item.name"
													@click="setEducation(item.id)">
													{{ item.name }}
												</button>
											</div>
										</div>
									</template>
								</new-accordion>

								<!-- Relationship -->
								<new-accordion>
									<template slot="header">
										<div class="font-weight-bold">
											{{ $t('Relationship') }}
											<span v-if="personal_information.relationship" class="font-weight-bold">
												({{ relationshipLabel(personal_information.relationship) }})
											</span>
										</div>
									</template>
									<template slot="body">
										<div class="row">
											<div class="col-sm-4 mb-2" v-for="(item, index) in relationshipTypes" :key="index">
												<button
													class="btn btn-outline border-red btn-lg btn-block ellipsis-text text-none"
													:class="selectedRelationshipClass(item.id)"
													v-tooltip="item.name"
													@click="setRelationship(item.id)">
													{{ item.name }}
												</button>
											</div>
										</div>
									</template>
								</new-accordion>

								<!-- Children -->
								<new-accordion>
									<template slot="header">
										<div class="font-weight-bold">
											{{ $t('Children') }}
											<span v-if="personal_information.has_children" class="font-weight-bold">
												({{ childrenLabel(personal_information.has_children) }})
											</span>
										</div>
									</template>
									<template slot="body">
										<!-- Has Children -->
										<div class="row">
											<div class="col-sm-4 mb-2" v-for="(item, index) in childrenTypes" :key="index">
												<button
													class="btn btn-outline border-red btn-lg btn-block ellipsis-text text-none"
													:class="selectedHasChildrenClass(item.id)"
													v-tooltip="item.name"
													@click="setHasChildren(item.id)">
													{{ item.name }}
												</button>
											</div>
										</div>

										<!-- Total Children -->
										<div class="row" v-if="personal_information.has_children === 'yes'">
											<div class="col-md-12">
												<div class="form-group text-left mt-3">
													<label for="input-total-children">{{ $t('How many children') }}</label>
													<select name="height" class="form-control" id="input-total-children" v-model="personal_information.total_children">
														<option value="" disabled selected>Select your option</option>
														<option :value="item.id" v-for="(item, index) in childrenTotals" :key="index">{{ item.name }}</option>
													</select>
												</div>
											</div>
										</div>
									</template>
								</new-accordion>

								<!-- Smoke -->
								<new-accordion>
									<template slot="header">
										<div class="font-weight-bold">
											{{ $t('Smoke') }}
											<span v-if="personal_information.smoker" class="font-weight-bold">
												({{ smokeLabel(personal_information.smoker) }})
											</span>
										</div>
									</template>
									<template slot="body">
										<div class="row">
											<div class="col-sm-4 mb-2" v-for="(item, index) in smokerTypes" :key="index">
												<button
													class="btn btn-outline border-red btn-lg btn-block ellipsis-text text-none"
													:class="selectedSmokerClass(item.id)"
													v-tooltip="item.name"
													@click="setSmoker(item.id)">
													{{ item.name }}
												</button>
											</div>
										</div>
									</template>
								</new-accordion>

								<!-- Drink -->
								<new-accordion>
									<template slot="header">
										<div class="font-weight-bold">
											{{ $t('Drink') }}
											<span v-if="personal_information.drinker" class="font-weight-bold">
												({{ drinkLabel(personal_information.drinker) }})
											</span>
										</div>
									</template>
									<template slot="body">
										<div class="row">
											<div class="col-sm-4 mb-2" v-for="(item, index) in drinkerTypes" :key="index">
												<button
													class="btn btn-outline border-red btn-lg btn-block ellipsis-text text-none"
													:class="selectedDrinkerClass(item.id)"
													v-tooltip="item.name"
													@click="setDrinker(item.id)">
													{{ item.name }}
												</button>
											</div>
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
	OCCUPATION_INDUSTRY_TYPES,
	EDUCATION_LEVELS,
	RELATIONSHIP_TYPES,
	CHILDREN_TYPES,
	CHILDREN_TOTALS,
	SMOKER_TYPES,
	DRINKER_TYPES,
} from '@/lib/static';
import { getAxiosErrorMessage, duplicateVar } from '@/lib/helper';
import NewAccordion from '@/components/parts/NewAccordion.vue';

export default {
	name: 'PersonalInformation',
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
			occupationIndustryTypes: duplicateVar(OCCUPATION_INDUSTRY_TYPES),
			educationLevels: duplicateVar(EDUCATION_LEVELS),
			relationshipTypes: duplicateVar(RELATIONSHIP_TYPES),
			childrenTypes: duplicateVar(CHILDREN_TYPES),
			childrenTotals: duplicateVar(CHILDREN_TOTALS),
			smokerTypes: duplicateVar(SMOKER_TYPES),
			drinkerTypes: duplicateVar(DRINKER_TYPES),
			personal_information: {
				occupation_industry: null,
				education: null,
				relationship: null,
				has_children: null,
				total_children: 0,
				smoker: null,
				drinker: null,
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
		hasChildren() {
			return this.personal_information.has_children;
		},
	},
	methods: {
		...mapActions({
			setUser: 'setUser',
		}),
		occupationIndustryLabel(id) {
			const item = this.occupationIndustryTypes.find(curr => curr.id === id);
			const label = item ? item.name : '-';
			return label;
		},
		educationLabel(id) {
			const item = this.educationLevels.find(curr => curr.id === id);
			const label = item ? item.name : '-';
			return label;
		},
		relationshipLabel(id) {
			const item = this.relationshipTypes.find(curr => curr.id === id);
			const label = item ? item.name : '-';
			return label;
		},
		childrenLabel(id) {
			const item = this.childrenTypes.find(curr => curr.id === id);
			const label = item ? item.name : '-';
			return label;
		},
		smokeLabel(id) {
			const item = this.smokerTypes.find(curr => curr.id === id);
			const label = item ? item.name : '-';
			return label;
		},
		drinkLabel(id) {
			const item = this.drinkerTypes.find(curr => curr.id === id);
			const label = item ? item.name : '-';
			return label;
		},
		setEducation(id) {
			this.personal_information.education = id;
		},
		setRelationship(id) {
			this.personal_information.relationship = id;
		},
		setHasChildren(id) {
			this.personal_information.has_children = id;
		},
		setSmoker(id) {
			this.personal_information.smoker = id;
		},
		setDrinker(id) {
			this.personal_information.drinker = id;
		},
		selectedEducationClass(id) {
			const labelClass = this.personal_information.education === id ? 'btn-danger' : '';
			return labelClass;
		},
		selectedRelationshipClass(id) {
			const labelClass = this.personal_information.relationship === id ? 'btn-danger' : '';
			return labelClass;
		},
		selectedHasChildrenClass(id) {
			const labelClass = this.personal_information.has_children === id ? 'btn-danger' : '';
			return labelClass;
		},
		selectedSmokerClass(id) {
			const labelClass = this.personal_information.smoker === id ? 'btn-danger' : '';
			return labelClass;
		},
		selectedDrinkerClass(id) {
			const labelClass = this.personal_information.drinker === id ? 'btn-danger' : '';
			return labelClass;
		},
		setData() {
			if (this.user) {
				const personalInformation = typeof (this.userProfile.personal_information) === 'string' ? JSON.parse(this.userProfile.personal_information) : this.personal_information;
				this.personal_information = duplicateVar(personalInformation);
			}
		},
		continueAndSave() {
			// Validation
			if (!this.personal_information.occupation_industry || !this.personal_information.education || !this.personal_information.relationship || !this.personal_information.has_children || !this.personal_information.smoker || !this.personal_information.drinker) {
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
				personal_information: JSON.stringify(this.personal_information),
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
		checkHasChildren() {
			if (this.hasChildren !== 'yes') this.personal_information.total_children = 0;
		},
	},
	watch: {
		hasChildren() {
			this.checkHasChildren();
		},
	},
	mounted() {},
	created() {
		this.setData();
	},
	destroyed() {},
	beforeDestroy() {},
};
</script>

<style lang="scss" scoped></style>
