<template>
	<div class="row m-auto text-center">
		<div class="mt-4 mb-4 full-width">
			<div class="col-md-12">
				<div class="card">
					<div class="card-body">
						<div class="card-title border-bottom-content pb-4 mt-3 mb-4">
							A bit about your finances...
						</div>

						<!-- Body -->
						<div class="card-text mb-3">
							<div>

								<!-- Net Worth -->
								<new-accordion>
									<template slot="header">
										<div class="font-weight-bold">
											{{ $t('Net Worth') }}
											<span v-if="finance.net_worth" class="font-weight-bold">({{ netWorthLabel(finance.net_worth) }})</span>
										</div>
									</template>
									<template slot="body">
										<div class="form-group text-left">
											<select name="net_worth" class="form-control" v-model="finance.net_worth">
												<option value="" disabled selected>Select your option</option>
												<option :value="item.id" v-for="(item, index) in netWorthTypes" :key="index">{{ item.name }}</option>
											</select>
										</div>
									</template>
								</new-accordion>

								<!-- Annual Income -->
								<new-accordion>
									<template slot="header">
										<div class="font-weight-bold">
											{{ $t('Annual Income') }}
											<span v-if="finance.income" class="font-weight-bold">({{ incomeLabel(finance.income) }})</span>
										</div>
									</template>
									<template slot="body">
										<div class="form-group text-left">
											<select name="income" class="form-control" v-model="finance.income">
												<option value="" disabled selected>Select your option</option>
												<option :value="item.id" v-for="(item, index) in incomeTypes" :key="index">{{ item.name }}</option>
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
	NET_WORTH_TYPES,
	INCOME_TYPES,
} from '@/lib/static';
import { getAxiosErrorMessage, duplicateVar } from '@/lib/helper';
import NewAccordion from '@/components/parts/NewAccordion.vue';

export default {
	name: 'Finances',
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
			netWorthTypes: duplicateVar(NET_WORTH_TYPES),
			incomeTypes: duplicateVar(INCOME_TYPES),
			finance: {
				net_worth: null,
				income: null,
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
		netWorthLabel(id) {
			const item = this.netWorthTypes.find(curr => curr.id === id);
			const label = item ? item.name : '-';
			return label;
		},
		incomeLabel(id) {
			const item = this.incomeTypes.find(curr => curr.id === id);
			const label = item ? item.name : '-';
			return label;
		},
		setData() {
			if (this.user) {
				const finance = typeof (this.userProfile.finance) === 'string' ? JSON.parse(this.userProfile.finance) : this.finance;
				this.finance = duplicateVar(finance);
			}
		},
		continueAndSave() {
			// Validation
			if (!this.finance.net_worth || !this.finance.income) {
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
				finance: JSON.stringify(this.finance),
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
