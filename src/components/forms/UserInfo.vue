<template>
<div class="user-info">
	<form @submit.prevent="submit()">
		<!-- Name -->
		<div class="form-group">
			<label for="inputName">{{ $t('Name') }}</label>
			<input type="text" class="form-control" id="inputName" aria-describedby="nameHelp" v-model="user.name">
		</div>

		<!-- Email -->
		<div class="form-group">
			<label for="inputEmail">{{ $t('Email Address') }}</label>
			<input type="email" class="form-control" id="inputEmail" aria-describedby="emailHelp" v-model="user.email">
		</div>

		<!-- Password -->
		<div class="form-group">
			<label for="inputPassword">{{ $t('Password') }}</label>
			<input-password v-model="user.password"/>
		</div>

		<!-- Phone -->
		<div class="form-group">
			<label for="inputPhone">{{ $t('Phone Number') }}</label>
			<VuePhoneNumberInput
				:translations="phoneTranslations"
				class="input-number"
				:class="{'error-phone': !validPhone(user.mobile_phone)}"
				:default-country-code="'ID'"
				:preferred-countries="['ID']"
				@update="onUpdatePhone"
				v-model="user.mobile_phone"
			/>
			<span v-if="!validPhone(user.mobile_phone)" class="text-error">{{ $t('Phone number is invalid') }}</span>
		</div>

		<!-- Birth Date -->
		<div class="form-group">
			<label for="inputPhoneNumber">{{ $t('Birth Date') }}</label>
			<div>
				<date-picker v-model="user.birth_date" type="date"></date-picker>
			</div>
		</div>

		<!-- Terms Info -->
		<div class="mb-2">
			<div class="mt-2 text-small">
				By continuing you agree to Prodo's <router-link to="/terms-of-use" target="_blank">Terms</router-link> and <router-link to="/privacy-policy" target="_blank">Privacy Policy</router-link> and to receive our emails. Promoting illegal commercial activities (such as prostitution) is prohibited. Users must be at least 18 years old.
			</div>
		</div>

		<button type="submit" class="btn btn-primary btn-block" :class="{ 'is-loading': isSubmitting}">{{ $t('Continue') }}</button>
	</form>
</div>
</template>

<script>

import { mapActions } from 'vuex';
import DatePicker from 'vue2-datepicker';
import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue2-datepicker/index.css';
import authApi from '@/api/auth';
import {
	getAxiosErrorMessage,
	duplicateVar,
	getAgeFromDate,
	phoneValidator,
} from '@/lib/helper';
import InputPassword from '@/components/InputPassword.vue';

export default {
	name: 'UserInfo',
	components: {
		DatePicker,
		InputPassword,
		VuePhoneNumberInput,
	},
	props: {
		user: {
			type: Object,
			default: () => null,
		},
	},
	data() {
		return {
			isSubmitting: false,
			phoneTranslations: {
				countrySelectorLabel: this.$t('Code Country'),
				countrySelectorError: this.$t('Choose one country'),
				phoneNumberLabel: this.$t('Phone Number'),
				example: this.$t('Example:'),
			},
			resultsPhone: {},
		};
	},
	sockets: {},
	computed: {
		birthDate() {
			return this.user.birth_date;
		},
		myAge() {
			const age = this.birthDate ? getAgeFromDate(this.birthDate) : 0;
			return age;
		},
	},
	methods: {
		...mapActions({
			setToken: 'setToken',
		}),
		onUpdatePhone(payload) {
			this.resultsPhone = payload;
		},
		submit() {
			const params = duplicateVar(this.user);
			if (params.mobile_phone) {
				// to bringing back 91
				params.mobile_phone = this.resultsPhone.countryCallingCode + this.resultsPhone.nationalNumber;
			}
			if (!params.email || !params.password) {
				this.$notify({
					group: 'app',
					type: 'error',
					title: this.$t('Please fill in the form completely'),
					text: 'Please enter your email address and password correctly',
				});
				return;
			}
			this.isSubmitting = true;
			const callback = (response) => {
				const message = response.message;
				const token = response.token;
				this.$notify({
					group: 'app',
					type: 'success',
					title: this.$t('Register'),
					text: message,
				});
				this.isSubmitting = false;

				this.setToken(token);
			};
			const errorCallback = (e) => {
				const message = getAxiosErrorMessage(e);
				this.$notify({
					group: 'app',
					type: 'error',
					title: this.$t('Register'),
					text: message,
				});
				this.isSubmitting = false;
			};
			authApi.register(params, callback, errorCallback);
		},
		validPhone(phone) {
			return phoneValidator(phone);
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
</style>
