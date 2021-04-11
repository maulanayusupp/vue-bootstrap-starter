<template>
	<div class="row m-auto text-center">
		<div class="mt-4 mb-4 full-width">
			<div class="col-md-12">
				<div class="card">
					<div class="card-body">
						<div class="card-title border-bottom-content pb-4 mt-3 mb-4">
							What are you seeking?
							<p class="text-extra-small mw-450 mx-auto">
								Choose at least one tag that will help define what you are seeking in a relationship. 7 max.
								<span class="font-weight-bold">(*Required)</span>
							</p>
						</div>

						<!-- Body -->
						<div class="card-text">
							<!-- Seeking Types -->
							<div class="seeking-types">
								<button
									class="btn btn-lg btn-outline border-red mb-1 mr-2 text-none"
									:class="selectedClass(item)" v-for="(item, index) in seekingTypes"
									:key="index"
									v-tooltip="item.description"
									@click="addSelected(item)">
									{{ item.name }}
									<i class="material-icons md-18 ml-2" v-if="!isSelected(item)">add</i>
									<i class="material-icons md-18 ml-2" v-else>remove</i>
								</button>
							</div>

							<!-- Seeking Description -->
							<div class="form-group text-left">
								<label>{{ $t("Describe what you're seeking (Optional)") }}</label>
								<textarea type="text" name="seeking_description" class="form-control" placeholder="Explain the sort of relationships / arrangements you're interested in." v-model="seeking_description" rows="5"></textarea>
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
	SEEKING_TYPES,
} from '@/lib/static';
import { getAxiosErrorMessage, duplicateVar } from '@/lib/helper';

export default {
	name: 'Seeking',
	components: {},
	props: {
		isUpdateProfile: {
			type: Boolean,
			default: () => false,
		},
	},
	data() {
		return {
			seekingTypes: duplicateVar(SEEKING_TYPES),
			seeking_description: null,
			selectedTypeIds: [],
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
		isSelected(item) {
			const isSelected = this.selectedTypeIds ? !!this.selectedTypeIds.find(currId => currId === item.id) : false;
			return isSelected;
		},
		selectedClass(item) {
			const labelClass = this.isSelected(item) ? 'btn-danger' : '';
			return labelClass;
		},
		addSelected(item) {
			const isSelected = this.isSelected(item);
			if (!isSelected) {
				// Max. 7
				if (this.selectedTypeIds.length === 7) {
					this.$notify({
						group: 'app',
						type: 'error',
						title: this.$t('Max Tags Reached'),
						text: 'You have selected the maximum number of tags. To add new tags, you must de-select one of your current selections.',
					});
					return;
				}
				this.selectedTypeIds.push(item.id);
			} else {
				this.removeSelected(item);
			}
		},
		removeSelected(item) {
			const index = this.selectedTypeIds.findIndex(currId => currId === item.id);
			if (index !== -1) this.selectedTypeIds.splice(index, 1);
		},
		setData() {
			if (this.user) {
				const seekings = typeof (this.userProfile.seekings) === 'string' ? JSON.parse(this.userProfile.seekings) : this.selectedTypeIds;
				this.selectedTypeIds = seekings;
				this.seeking_description = duplicateVar(this.userProfile.seeking_description);
			}
		},
		continueAndSave() {
			// Validation
			if (!this.selectedTypeIds) {
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
				seekings: JSON.stringify(this.selectedTypeIds),
			};
			params.seeking_description = this.seeking_description;
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

<style lang="scss" scoped>
.seeking-types {
	padding-bottom: 1em;
    margin-bottom: 1em;
	border-bottom: 1px solid #d1d1d1;
	text-align: left;
}
</style>
