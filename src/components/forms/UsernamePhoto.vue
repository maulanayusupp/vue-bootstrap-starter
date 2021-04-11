<template>
	<div class="row m-auto text-center">
		<div class="mt-4 mb-4 full-width">
			<div class="col-md-12">
				<div class="card">
					<div class="card-body">
						<div class="card-title border-bottom-content pb-4 mt-3 mb-4">
							Let's get started!
						</div>
						<div class="card-text">
							<!-- Name -->
							<div class="form-group text-left">
								<label>{{ $t('Your Name') }}</label>
								<input type="text" name="name" class="form-control" v-model="name">
							</div>

							<!-- Username -->
							<div class="form-group text-left">
								<label>{{ $t('Choose a Username') }}</label>
								<input type="text" name="username" class="form-control" v-model="username">
							</div>

							<!-- Photo -->
							<div class="avatar-image">
								<div class="text-grey text-small mb-3 alert alert-info">
									<div>Please make sure you upload your own photo.</div>
									<div>Otherwise your account may be rejected.</div>
								</div>
								<div>
									<img :src="selectedFileUrl ? selectedFileUrl : placeholderImage" alt="Avatar">
								</div>
								<div class="text-center mt-3">
									<!-- Upload File -->
									<label class="btn btn-primary btn-lg" :class="{ 'is-loading white': isUploading }">
										Choose Photo
										<input type="file" class="hidden" accept="image/*" @change="onFileSelected" hidden>
									</label>
								</div>
							</div>

							<!-- Short Brief -->
							<div class="short-brief text-grey text-small">
								<div>
									Photos need to be larger than 400px x 400px and you should be in the photo. Please, no nudity or revealing photos. <a href="#">Read our photo help and guidelines</a>.
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
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import fileApi from '@/api/file';
import authApi from '@/api/auth';
import { getAxiosErrorMessage, duplicateVar } from '@/lib/helper';

export default {
	name: 'UsernamePhoto',
	components: {},
	props: {
		isUpdateProfile: {
			type: Boolean,
			default: () => false,
		},
	},
	data() {
		return {
			name: null,
			username: null,
			uploadProgress: 0,
			isUploading: false,
			fileSize: 0,
			selectedFile: null,
			selectedFileUrl: null,
			placeholderImage: 'https://www.pngkey.com/png/full/503-5035055_a-festival-celebrating-tractors-profile-picture-placeholder-round.png',
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
		validUsername() {
			return true;
		},
		setData() {
			if (this.user) {
				this.username = this.user.username;
				this.name = this.userProfile.name;
				this.selectedFileUrl = this.userProfile.picture;
			}
		},
		onFileSelected(e) {
			const files = e.target.files;
			const selectedFile = files[0];
			if (selectedFile) this.onUpload(selectedFile);
		},
		onUpload(file) {
			if (!file) {
				this.$notify({
					group: 'app',
					type: 'warn',
					title: 'Upload File',
					text: 'Sorry, currently we cant upload the file',
				});
				return;
			}

			this.isUploading = true;
			this.fileSize = file.size;
			this.selectedFile = file;

			// Remove extension from filename to set label
			const filename = duplicateVar(file.name);
			this.mediaLabel = duplicateVar(filename);

			// Params
			const params = new FormData();
			params.append('file', file);

			const callback = (response) => {
				const selectedFileUrl = response.data;
				this.selectedFileUrl = selectedFileUrl;
				this.isUploading = false;
				this.uploadProgress = 0;
			};
			const errorCallback = (e) => {
				const message = getAxiosErrorMessage(e);
				this.$notify({
					group: 'app',
					type: 'error',
					title: 'Upload Media',
					text: message,
				});
				this.isUploading = false;
			};
			const progressCallback = (progress) => {
				this.uploadProgress = progress;
			};
			fileApi.upload(params, callback, errorCallback, progressCallback);
		},
		continueAndSave() {
			// Validation
			if (!this.name || !this.username || !this.selectedFileUrl) {
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
				name: this.name,
				username: this.username,
				picture: this.selectedFileUrl,
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
	mounted() {
		this.setData();
	},
	created() {},
	destroyed() {},
	beforeDestroy() {},
};
</script>

<style lang="scss" scoped>
.short-brief {
	max-width: 350px;
	margin: 0 auto;
}
.avatar-image {
	margin: 2em 0;
	img {
		max-width: 200px;
	}
}
</style>
