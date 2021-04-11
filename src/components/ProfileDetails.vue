<template>
<div class="profile-details">
	<div class="row">
		<div class="col-sm-6 col-md-3 mb-4">
			<div class="profile-left">
				<div class="mb-3">
					<div class="card-member card-member-image pointer profile-avatar-details" :style="avatarBg"></div>
				</div>
				<div>

				</div>
			</div>
		</div>
		<div class="col-sm-6 col-md-9">
			<div class="profile-right">
				<div class="card p-4">
					<!-- Username -->
					<div class="d-flex">
						<h4>{{ user.username }}</h4>
					</div>

					<!-- Age, Gender -->
					<div class="mt-2">
						<span class="short-info-item">{{ myAge ? myAge : '-' }}</span>
						<span class="short-info-item">{{ myGender ? genderLabel(myGender) : '-' }}</span>
					</div>

					<!-- Summary -->
					<div class="mt-2 d-flex justify-content-between">
						<div class="font-weight-bold">{{ user.profile && user.profile.summary ? user.profile.summary : '-' }}</div>
						<div>
							<div v-if="isMyProfile">
								<i
									v-tooltip="$t('Update Profile')"
									class="material-icons action-profile-icon pointer text-grey ml-2"
									@click="showEditProfile()">
									edit
								</i>
								<i
									v-tooltip="$t('Change Password')"
									class="material-icons action-profile-icon pointer text-grey ml-2"
									@click="showPasswordForm()">
									lock
								</i>
							</div>
						</div>
					</div>
				</div>

				<!-- Line -->
				<div class="horizontal-line pt-1 mb-4"></div>

				<!-- About Me -->
				<div class="about-me-wrapper mb-4">
					<div>
						<h4>About Me</h4>
					</div>
					<div v-html="userBiography ? userBiography : '-'"></div>
				</div>

			</div>
		</div>
	</div>

	<!-- Modals -->
	<div class="modals">
		<!-- Change Password -->
		<change-password-form @close="closePasswordForm()" v-if="isPasswordFormVisible"/>

		<!-- Edit Profile -->
		<modal-edit-profile :show="isShowEditProfile" @close="closeEditProfile()" v-if="isShowEditProfile"/>
	</div>
</div>
</template>

<script>

import favoriteApi from '@/api/favorite';
import { getAxiosErrorMessage, getAgeFromDate } from '@/lib/helper';
import {
	GENDERS,
} from '@/lib/static';

import ChangePasswordForm from '@/components/ChangePasswordForm.vue';
import ModalEditProfile from '@/components/ModalEditProfile.vue';

export default {
	name: 'ProfileDetails',
	components: {
		ChangePasswordForm,
		ModalEditProfile,
	},
	props: {
		user: {
			type: Object,
			default: () => null,
		},
		isMyProfile: {
			type: Boolean,
			default: () => false,
		},
	},
	data() {
		return {
			lastMessage: null,
			favorited: null,
			favoritedYou: null,
			viewed: null,
			viewedYou: null,
			isFavoriting: false,
			isPasswordFormVisible: false,
			isShowEditProfile: false,
		};
	},
	sockets: {},
	computed: {
		userPackage() {
			const curr = this.user && this.user.userPackage ? this.user.userPackage : null;
			return curr;
		},
		currentPackage() {
			const curr = this.userPackage && this.userPackage.package ? this.userPackage.package : null;
			return curr;
		},
		currentPackageMemberType() {
			return this.userPackage ? this.userPackage.member_type : null;
		},
		isDiamond() {
			return this.currentPackageMemberType === 'diamond';
		},
		isPremium() {
			return this.currentPackageMemberType === 'premium';
		},
		avatarBg() {
			const style = {
				backgroundImage: `url(${this.userPicture})`,
			};
			return style;
		},
		userPicture() {
			const picture = this.user && this.user.profile && this.user.profile.picture ? this.user.profile.picture : '/img/user-placeholder.png';
			return picture;
		},
		userBiography() {
			const myAge = this.user && this.user.profile ? this.user.profile.biography : null;
			return myAge;
		},
		myAge() {
			const myAge = this.user && this.user.profile ? getAgeFromDate(this.user.profile.birth_date) : '-';
			return myAge;
		},
		myGender() {
			const myGender = this.user && this.user.profile ? this.user.profile.gender : '-';
			return myGender;
		},
	},
	methods: {
		setData() {
			if (this.user) {
				this.lastMessage = this.user.last_message;
				this.favorited = this.user.favorited;
				this.favoritedYou = this.user.favorited_you;
				this.viewed = this.user.viewed;
				this.viewedYou = this.user.viewed_you;
			}
		},
		genderLabel(id) {
			const item = GENDERS.find(curr => curr.id === id);
			const label = item ? item.name : '-';
			return label;
		},
		setToFavorite(data) {
			this.favorited = data;
		},
		addToFavorite() {
			const params = {
				favorite_user_id: this.user.id,
			};
			this.isFavoriting = true;
			const callback = (response) => {
				const responseData = response.data;
				const message = response.message;
				this.$notify({
					group: 'app',
					type: 'success',
					title: this.$t('Favorite'),
					text: message,
				});
				this.isFavoriting = false;

				// Set favorite
				this.setToFavorite(responseData);
			};
			const errorCallback = (e) => {
				const message = getAxiosErrorMessage(e);
				this.$notify({
					group: 'app',
					type: 'error',
					title: this.$t('Favorite'),
					text: message,
				});
				this.isFavoriting = false;
			};
			favoriteApi.create(params, callback, errorCallback);
		},
		showPasswordForm() {
			this.isPasswordFormVisible = true;
		},
		closePasswordForm() {
			this.isPasswordFormVisible = false;
		},
		showEditProfile() {
			this.isShowEditProfile = true;
		},
		closeEditProfile() {
			this.isShowEditProfile = false;
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
.profile-details {
	.short-info-item {
		margin-right: 15px;
		padding-right: 15px;
		border-right: 1px solid #d1d1d1;
		&:last-child {
			margin-right: 0;
			border-right: 0;
		}
	}
}
</style>
