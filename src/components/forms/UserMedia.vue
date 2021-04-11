<template>
<div class="user-media">
	<!-- Loader -->
	<div class="is-loading large dark p-5 text-center" v-if="isFetching"></div>

	<!-- List -->
	<div class="row list-photo relative" v-if="!isFetching">
		<div class="col-6 col-sm-3 mb-3" v-for="(item, index) in items" :key="index">
			<div class="photo-thumbnail" :style="bgCard(item.path)"></div>
		</div>
		<div class="col-6 col-sm-3">
			<label class="photo-locked-thumbnail full-width full-height border-2 pointer">
				<input type="file" class="hidden" accept="image/*" @change="onFileSelected" hidden>
				<div class="full-width full-height">
					<div class="mid-content">
						<div class="mb-2"><i class="material-icons text-grey">add</i></div>
					</div>
				</div>
			</label>
		</div>

		<!-- Pagination -->
		<div class="col-sm-12">
			<div class="mt-4 p-3">
				<pagination
					:total-pages="totalPages"
					:current-page="page"
					:last-page="lastPage"
					@select="onPageSelected">
				</pagination>
			</div>
		</div>
	</div>
</div>
</template>

<script>

import { mapGetters } from 'vuex';
import fileApi from '@/api/file';
import userMediaApi from '@/api/user-media';
import { getAxiosErrorMessage, duplicateVar } from '@/lib/helper';
import Pagination from '@/components/Pagination.vue';

const DEFAULT_MEDIA = {
	name: null,
	description: null,
	path: null,
	type: 'image',
	is_private: false,
	is_published: true,
};

export default {
	name: 'UserMedia',
	components: {
		Pagination,
	},
	props: {
		isPrivate: {
			type: Boolean,
			default: () => false,
		},
	},
	data() {
		return {
			// Fetch
			page: 1,
			limit: 7,
			orderBy: 'created_at',
			sortBy: 'desc',
			totalItems: 0,
			lastPage: 1,
			isAll: false,
			items: [],
			isFetching: false,

			uploadProgress: 0,
			isUploading: false,
			fileName: null,
			fileSize: 0,
			selectedFile: null,
			selectedFileUrl: null,
			media: duplicateVar(DEFAULT_MEDIA),
		};
	},
	sockets: {},
	computed: {
		...mapGetters({
			user: 'user',
		}),
		fetchParams() {
			const params = {
				user_id: this.user.id,
				page: this.page,
				limit: this.limit,
				order_by: this.orderBy,
				sort_by: this.sortBy,
				is_private: this.isPrivate ? 1 : 0,
			};
			return params;
		},
		totalPages() {
			const total = Math.ceil(this.totalItems / this.limit);
			return total;
		},
	},
	methods: {
		fetch(reset = false, page = 1) {
			this.isFetching = true;
			if (reset) {
				this.page = 1;
				this.items = [];
			}
			if (page) this.page = page;
			const params = this.fetchParams;
			const callback = (response) => {
				const items = response.data;
				if (items.length < this.limit) this.isAll = true;
				this.items = items;
				this.totalItems = response.total;
				this.lastPage = response.lastPage;
				this.isFetching = false;
			};
			const errorCallback = (e) => {
				const message = getAxiosErrorMessage(e);
				this.$notify({
					group: 'app',
					type: 'error',
					title: this.$t('User Media'),
					text: message,
				});
				this.isFetching = false;
			};
			userMediaApi.getList(params, callback, errorCallback);
		},
		onPageSelected(page) {
			this.fetch(true, page);
		},
		bgCard(picture) {
			const style = {
				backgroundImage: `url(${picture})`,
			};
			return style;
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
			this.fileName = file.name;
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
				this.requestAddMedia();
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
		requestAddMedia() {
			const params = duplicateVar(this.media);
			params.name = this.fileName;
			params.description = this.fileName;
			params.path = this.selectedFileUrl;
			params.is_private = this.isPrivate;

			this.isAddingMedia = false;
			const callback = (response) => {
				const responseData = response.data;
				this.addMedia(responseData);
				this.isAddingMedia = false;
			};
			const errorCallback = (e) => {
				const message = getAxiosErrorMessage(e);
				this.$notify({
					group: 'app',
					type: 'error',
					title: 'Add Media',
					text: message,
				});
				this.isAddingMedia = false;
			};
			userMediaApi.create(params, callback, errorCallback);
		},
		addMedia(item) {
			this.items.push(item);
		},
	},
	watch: {},
	mounted() {
		this.fetch();
	},
	created() {},
	destroyed() {},
	beforeDestroy() {},
};
</script>

<style lang="scss" scoped>
.user-media {
}
</style>
