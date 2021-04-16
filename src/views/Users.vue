<template>
	<div class="page page-user">
		<div class="container">
			<div class="d-flex justify-content-between">
				<div class="mb-4">
					<h2>{{ $t('Users') }}</h2>
					<div>{{ $t('Manage all users data') }}</div>
				</div>
			</div>
			<!-- Table Menu -->
			<div class="action-container row">
				<div class="col-md-6 mb-2">
					<div class="d-flex justify-content-start">
						<div>
							<button class="btn btn-primary mr-2" @click="addItem">{{ $t('Add User') }}</button>
						</div>

						<!-- More -->
						<md-menu md-align-trigger :md-offset-x="0">
							<button class="btn btn-info" md-menu-trigger>
								More <i class="material-icons" md-menu-trigger>more_vert</i>
							</button>
							<md-menu-content>
								<md-menu-item @click="isImportUserVisible = true"><span class="minw-87">{{ $t('Import User') }}</span></md-menu-item>
								<md-menu-item @click="isExportUserVisible = true"><span class="minw-87">{{ $t('Export User') }}</span></md-menu-item>
							</md-menu-content>
						</md-menu>
					</div>
				</div>
				<div class="col-md-6 mb-2">
					<div class="d-flex justify-content-end">
						<!-- roles -->
						<div class="mr-3">
							<md-menu md-align-trigger :md-offset-x="0">
								<button class="btn btn-info" md-menu-trigger>
									<i class="material-icons text-white">person</i>
									<span class="capitalize" v-if="roleFilter === ''">{{$t('All')}}</span>
									<span class="capitalize" v-if="roleFilter === 'super_admin'">{{$t('Admin')}}</span>
									<span class="capitalize" v-if="roleFilter === 'client'">{{$t('Client')}}</span>
								</button>
								<md-menu-content>
									<md-menu-item @click="roleFilter = ''"><span class="minw-87">{{$t('All')}}</span></md-menu-item>
									<md-menu-item @click="roleFilter = 'super_admin'"><span class="minw-87">{{$t('Admin')}}</span></md-menu-item>
									<md-menu-item @click="roleFilter = 'client'"><span class="minw-87">{{$t('Client')}}</span></md-menu-item>
								</md-menu-content>
							</md-menu>
						</div>
						<!-- is verified -->
						<div class="mr-3">
							<md-menu md-align-trigger :md-offset-x="0">
								<button class="btn btn-info" md-menu-trigger>
									<i class="material-icons text-white">check</i>
									<span class="capitalize" v-if="isVerified === ''">{{$t('All')}}</span>
									<span class="capitalize" v-if="isVerified === '1'">{{$t('Verified')}}</span>
									<span class="capitalize" v-if="isVerified === '0'">{{$t('Unverified')}}</span>
								</button>
								<!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
								<md-menu-content>
									<md-menu-item @click="isVerified = ''"><span class="minw-100">{{$t('All')}}</span></md-menu-item>
									<md-menu-item @click="isVerified = '1'"><span class="minw-100">{{$t('Verified')}}</span></md-menu-item>
									<md-menu-item @click="isVerified = '0'"><span class="minw-100">{{$t('Unverified')}}</span></md-menu-item>
								</md-menu-content>
							</md-menu>
						</div>
						<!-- counting -->
						<div class="mr-3">
							<md-menu md-align-trigger md :md-offset-x="2">
								<button class="btn-icon btn p-0 m-0 w-100 btn-limit" md-menu-trigger>
									{{ page * limit - (limit - 1) }} - {{ items.length > 0 ? page * limit : items.length }} of {{ totalItems }}
								</button>
								<!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
								<md-menu-content class="mt-2">
									<md-menu-item @click="changeLimit(10)"><span class="text-center minw-50">10</span></md-menu-item>
									<md-menu-item @click="changeLimit(25)"><span class="text-center minw-50">25</span></md-menu-item>
									<md-menu-item @click="changeLimit(50)"><span class="text-center minw-50">50</span></md-menu-item>
									<md-menu-item @click="changeLimit(100)"><span class="text-center minw-50">100</span></md-menu-item>
									<md-menu-item @click="changeLimit(200)"><span class="text-center minw-50">200</span></md-menu-item>
								</md-menu-content>
							</md-menu>
						</div>
						<div>
							<input type="text" class="form-control" :placeholder="$t('Search')" @input="onKeywordChange" v-model="keyword"/>
						</div>
					</div>
				</div>
			</div>

			<!-- Table -->
			<div class="card">
				<div class="table-responsive">
					<table class="table">
						<thead>
							<tr>
								<th width="5%">{{ $t('No') }}</th>
								<th>{{ $t('Name') }}</th>
								<th>{{ $t('Email') }}</th>
								<th>{{ $t('Role') }}</th>
								<th class="text-center">{{ $t('Verified') }}</th>
								<th class="text-center">{{ $t('Banned') }}</th>
								<th class="text-center">{{ $t('Approved') }}</th>
								<th width="5%">{{ $t('') }}</th>
							</tr>
						</thead>
						<div class="p-5 text-center absolute" v-if="isFetching">
							<div class="is-loading large"></div>
						</div>
						<tbody>
							<tr v-for="(item,index) in items" :key="item.id">
								<td class="align-middle">{{ numberingList(index) }}</td>
								<td class="align-middle">{{ item.profile.name }}</td>
								<td class="align-middle">
									<div>{{ item.email }}</div>
									<span class="text-xs text-grey pointer" v-tooltip="'Joined date'">{{ getRelativeTime(item) }}</span>
								</td>
								<td class="align-middle">
									<span v-for="(itemRole, index) in item.roles" :key="index">
										<md-chip class="mr-2 chip-item">{{ formatText(item.roles[index] ? item.roles[index] : '') }}</md-chip>
									</span>
								</td>
								<td class="text-center align-middle"><i class="material-icons" v-if="item.is_verified">done</i></td>
								<td class="text-center align-middle"><i class="material-icons" v-if="item.is_banned">done</i></td>
								<td class="text-center align-middle"><i class="material-icons" v-if="item.is_approved">done</i></td>
								<td class="align-middle">
									<md-menu md-align-trigger :md-offset-x="-40" class="pointer">
										<i class="material-icons" md-menu-trigger>more_vert</i>
										<md-menu-content>
											<md-menu-item @click="editItem(item)"><span class="minw-87">{{ $t('Edit') }}</span></md-menu-item>
											<md-menu-item v-if="item.is_banned === 0" @click="openBannedModal(item)">
												<span class="minw-87">{{ $t('Banned') }}</span>
											</md-menu-item>
											<md-menu-item v-else-if="item.is_banned === 1" @click="openBannedModal(item)">
												<span class="minw-87">{{ $t('Unbanned') }}</span>
											</md-menu-item>
											<md-menu-item v-if="item.is_verified === 0" @click="openVerifiedModal(item)">
												<span class="minw-87">{{ $t('Verified') }}</span>
											</md-menu-item>
											<md-menu-item v-else-if="item.is_verified === 1" @click="openUnverifiedModal(item)">
												<span class="minw-87">{{ $t('Unverified') }}</span>
											</md-menu-item>
											<md-menu-item @click="openModalApproval(item, false)">
												<span class="minw-87">{{ $t('Approve') }}</span>
											</md-menu-item>
											<md-menu-item @click="editPassword(item)">
												<span class="minw-87">{{ $t('Change Password') }}</span>
											</md-menu-item>
											<md-menu-item @click="confirmRemoveItem(item)"><span class="minw-87">{{ $t('Delete') }}</span></md-menu-item>
										</md-menu-content>
									</md-menu>
								</td>
							</tr>
						</tbody>
					</table>
				</div>

				<!-- Empty -->
				<div class="text-center text-secondary p-5" v-if="items.length === 0 && !isFetching">{{$t('No data available')}}</div>
			</div>

			<!-- Pagination -->
			<pagination
				:total-pages="totalPages"
				:current-page="page"
				:last-page="lastPage"
				@select="onPageSelected">
			</pagination>
		</div>

		<!-- Modals -->
		<div class="modals">
			<!-- User Form -->
			<user-form
				:data="selected"
				@saved="insertItem"
				@close="isFormVisible = false"
				v-if="isFormVisible"
			/>
			<!-- change passsword -->
			<force-password-form
				:data="selected"
				@saved="insertItem"
				@close="isChangePasswordModal = false"
				v-if="isChangePasswordModal"
			/>
			<!-- Delete Confirmation -->
			<modal
				@close="isConfirmRemoveVisible = false"
				v-if="isConfirmRemoveVisible && selected">
				<template slot="header">
					<h3>{{ $t('Remove User') }}</h3>
				</template>
				<template slot="body">
					{{ $t('Are you sure want to delete') }} {{ selected.name }}?
				</template>
				<template slot="footer">
					<div class="w-100 flex-center">
						<button class="btn btn-primary" :class="{ 'is-loading': isRemoving }" @click="removeItem(selected)">
							{{ $t('Remove') }}
						</button>
						<button class="btn btn-default" @click="isConfirmRemoveVisible = false">
							{{ $t('Cancel') }}
						</button>
					</div>
				</template>
			</modal>
			<!-- Banning confirmation -->
			<modal
				@close="isConfirmBannedVisible = false"
				v-if="isConfirmBannedVisible">
				<template slot="header">
					<h3>{{ $t('Banned User') }}</h3>
				</template>
				<template slot="body">
					<span v-if="selected.is_banned === 0">{{ $t('Are you sure want to Banned') }} {{ selected.profile.name }}?</span>
					<span v-if="selected.is_banned === 1">{{ $t('Are you sure want to Unbanned') }} {{ selected.profile.name }}?</span>
				</template>
				<template slot="footer">
					<div class="w-100 flex-center">
						<button v-if="selected.is_banned === 0" class="btn btn-danger" :class="{ 'is-loading': isBanning }" @click="banningUser(selected)">
							{{ $t('Banned') }}
						</button>
						<button v-if="selected.is_banned === 1" class="btn btn-success" :class="{ 'is-loading': isBanning }" @click="banningUser(selected)">
							{{ $t('Unbanned') }}
						</button>
						<button class="btn btn-default" @click="isConfirmBannedVisible = false">
							{{ $t('Cancel') }}
						</button>
					</div>
				</template>
			</modal>
			<!-- Verifying confirmation -->
			<modal
				@close="isConfirmVerifiedVisible = false"
				v-if="isConfirmVerifiedVisible">
				<template slot="header">
					<h3>{{ $t('Verifying User') }}</h3>
				</template>
				<template slot="body">
					<span v-if="selected.is_verified === 0">{{ $t('Are you sure want to Verified') }} {{ selected.profile.name }}?</span>
					<span v-if="selected.is_verified === 1">{{ $t('Are you sure want to Unverified') }} {{ selected.profile.name }}?</span>
				</template>
				<template slot="footer">
					<div class="w-100 flex-center">
						<button v-if="selected.is_verified === 0" class="btn btn-success" :class="{ 'is-loading': isVerifying }" @click="verifyingUser(selected)">
							{{ $t('Verified') }}
						</button>
						<button v-if="selected.is_verified === 1" class="btn btn-danger" :class="{ 'is-loading': isVerifying }" @click="verifyingUser(selected)">
							{{ $t('Unverified') }}
						</button>
						<button class="btn btn-default" @click="isConfirmVerifiedVisible = false">
							{{ $t('Cancel') }}
						</button>
					</div>
				</template>
			</modal>
			<!-- import data -->
			<modal
				@close="isImportUserVisible = false"
				v-if="isImportUserVisible">
				<template slot="header">
					<h3>{{ $t('Import User') }}</h3>
				</template>
				<template slot="body">
				<div class="modal-import-box">
					<div>
						<vue-xlsx :isShowFileXlsx="isImportUserVisible" @on-select-file="handleImportBulk" @drop.prevent="handleImportBulk">
							{{ $t('Select File') }}
						</vue-xlsx>
					</div>
				</div>
				<div class="mt-4">
					{{ $t('Download Template For Import') }}:
				</div>
				<div>
					<a href="./../../template-xlsx/Template_Users.xlsx" download>{{ $t('Download') }} Excel Template - {{ $t('Users') }}</a>
				</div>
				</template>
				<template slot="footer">
					<div class="w-100 flex-center">
						<button @click="acceptImport" :disabled="!tmpUsers" type="submit" class="btn btn-submit btn-primary" :class="{ 'is-loading': isImporting }">
							<span>{{ $t('Upload') }}</span>
						</button>
						<button @click="isImportUserVisible = false" type="submit" class="btn btn-submit btn-default">
							<span>{{ $t('Cancel') }}</span>
						</button>
					</div>
				</template>
			</modal>
			<loading :active.sync="isExporting" :is-full-page="fullPage" :background-color="colorOverlay" :color="colorLoading">
				<template slot="after">
					<div class="absolute text-center">{{ $t('Exporting') }}...</div>
				</template>
			</loading>
			<!-- export data -->
			<modal
				@close="isExportUserVisible = false"
				v-if="isExportUserVisible"
				:hide-footer="true">
				<template slot="header">
					<h3>{{ $t('Export User') }}</h3>
				</template>
				<template slot="body">
				<div>
					<p class="text-base text-black mb-3">
						{{ $t('Please select file format for data export') }}:
					</p>
					<div class="p-2">
						<div
							class="cursor-pointer"
							:class="{ 'is-loading': isExporting }"
							@click="exportUsers('excel')">
							<img src="/img/xls.png" alt="xls" width="20px;"/>
							<span class="ml-2 text-base item-text-export text-black">{{ $t('Excel File') }}</span>
						</div>
					</div>
					<div class="p-2">
						<div
							class="cursor-pointer"
							:class="{ 'is-loading': isExporting }"
							@click="exportUsers('docx')">
							<img src="/img/doc.png" alt="xls" width="20px;"/>
							<span class="ml-2 text-base item-text-export text-black">{{ $t('Document File') }}</span>
						</div>
					</div>
				</div>
				</template>
			</modal>

			<!-- Confirm approve -->
			<modal
				size="medium"
				@close="isConfirmApprovalVisible = false"
				v-if="isConfirmApprovalVisible">
				<template slot="header">
					<h3>{{ $t('Approval') }}</h3>
				</template>
				<template slot="body">
					<span>
						{{ $t('Are you sure want to Approve') }}
						<span v-if="isAddingPremiumPackage">and Add premium package for </span>
						<span class="font-weight-bold">{{ selected.profile.name }}</span>?
					</span>
				</template>
				<template slot="footer">
					<div class="w-100 flex-center">
						<button class="btn btn-success" :class="{ 'is-loading': isApproving }" @click="approval(true)">
							{{ $t('Approve') }}
						</button>
						<button class="btn btn-default" @click="isConfirmApprovalVisible = false">
							{{ $t('Cancel') }}
						</button>
					</div>
				</template>
			</modal>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Loading from 'vue-loading-overlay';
import VueXlsx from '@/components/ImportExcel.vue';
import Modal from '@/components/Modal.vue';
import UserForm from '@/components/UserForm.vue';
import ForcePasswordForm from '@/components/ForcePasswordForm.vue';
import Pagination from '@/components/Pagination.vue';
import {
	getAxiosErrorMessage, delay, convertTimezone, addZeroUTC, duplicateVar, downloadBlob,
} from '@/lib/helper';
import usersApi from '@/api/user';

export default {
	name: 'Users',
	components: {
		Modal,
		UserForm,
		Pagination,
		VueXlsx,
		Loading,
		ForcePasswordForm,
	},
	data() {
		return {
			page: 1,
			limit: 25,
			orderBy: 'id',
			sortBy: 'asc',
			keyword: '',
			role: 'client',
			totalItems: 0,
			lastPage: 1,
			isAll: false,
			items: [],
			tmpUsers: [],
			selected: null,
			roles: [
				{ key: 'all', label: 'All Roles' },
				{ key: 'client', label: 'Client' },
				{ key: 'super_admin', label: 'Super Admin' },
			],
			filterRole: null,
			isFormVisible: false,
			isConfirmRemoveVisible: false,
			isRemoving: false,
			isFetching: false,
			hover: false,
			hoverItem: null,
			isVerified: '',
			roleFilter: '',
			isImportUserVisible: false,
			isExportUserVisible: false,
			isImporting: false,
			isExporting: false,
			fullPage: true,
			colorOverlay: '#000000',
			colorLoading: '#FFFFFF',
			itemCounting: '',
			isBanning: false,
			isConfirmBannedVisible: false,
			isVerifying: false,
			isConfirmVerifiedVisible: false,
			verifiedKey: false,
			isChangePasswordModal: false,

			// Approval
			isConfirmApprovalVisible: false,
			isApproving: false,
			isAddingPremiumPackage: false,
		};
	},
	methods: {
		...mapActions({
		}),
		fetch(reset = false, page) {
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
				for (let index = 0; index < this.items.length; index++) {
					const roles = this.items[index].roles;
					const rolesData = JSON.parse(roles);
					this.items[index].roles = rolesData;
				}
				this.totalItems = response.total;
				this.lastPage = response.lastPage;
				this.isFetching = false;
			};
			const errorCallback = (e) => {
				const message = getAxiosErrorMessage(e);
				this.$notify({
					group: 'app',
					type: 'error',
					title: this.$t('Users'),
					text: message,
				});
				this.isFetching = false;
			};
			usersApi.getList(params, callback, errorCallback);
		},
		changeLimit(value) {
			this.limit = value;
			this.fetch(true);
		},
		onKeywordChange() {
			delay(() => {
				this.fetch(true);
			}, 500);
		},
		insertItem(item) {
			const index = this.items.findIndex(({ id }) => id === item.id);
			if (index === -1) {
				const roles = item.roles;
				const rolesData = JSON.parse(roles);
				item.roles = rolesData; // eslint-disable-line no-param-reassign
				this.items.push(item);
			} else {
				const roles = item.roles;
				const rolesData = JSON.parse(roles);
				item.roles = rolesData; // eslint-disable-line no-param-reassign
				this.$set(this.items, index, item);
			}
		},
		addItem() {
			this.selected = null;
			this.isFormVisible = true;
		},
		editItem(item) {
			this.selected = duplicateVar(item);
			this.isFormVisible = true;
		},
		editPassword(item) {
			this.selected = duplicateVar(item);
			this.isChangePasswordModal = true;
		},
		openBannedModal(user) {
			this.selected = user;
			this.isConfirmBannedVisible = true;
		},
		banningUser(user) {
			this.isBanning = true;
			const callback = (response) => {
				const userData = response.data;
				const message = response.message;
				this.insertItem(userData);
				this.$notify({
					group: 'app',
					type: 'success',
					title: 'User',
					text: message,
				});
				this.isBanning = false;
				this.isConfirmBannedVisible = false;
			};
			const errorCallback = (e) => {
					const message = getAxiosErrorMessage(e);
					this.$notify({
					group: 'app',
					type: 'error',
					title: 'User',
					text: message,
				});
				this.isBanning = false;
				this.isConfirmBannedVisible = false;
			};
			usersApi.updateBanned(user.id, callback, errorCallback);
		},
		openVerifiedModal(user) {
			this.verifiedKey = true;
			this.isConfirmVerifiedVisible = true;
			this.selected = user;
		},
		openUnverifiedModal(user) {
			this.verifiedKey = false;
			this.isConfirmVerifiedVisible = true;
			this.selected = user;
		},
		verifyingUser(user) {
			this.isVerifying = true;
			const params = {
				is_verified: this.verifiedKey,
			};
			const callback = (response) => {
				const userData = response.data;
				const message = response.message;
				this.insertItem(userData);
				this.$notify({
					group: 'app',
					type: 'success',
					title: 'User',
					text: message,
				});
				this.isVerifying = false;
				this.isConfirmVerifiedVisible = false;
			};
			const errorCallback = (e) => {
					const message = getAxiosErrorMessage(e);
					this.$notify({
					group: 'app',
					type: 'error',
					title: 'User',
					text: message,
				});
				this.isVerifying = false;
				this.isConfirmVerifiedVisible = false;
			};
			usersApi.update(user.id, params, callback, errorCallback);
		},
		confirmRemoveItem(item) {
			this.selected = duplicateVar(item);
			this.isConfirmRemoveVisible = true;
		},
		removeItem(item) {
			this.isRemoving = true;
			const callback = (response) => {
				const message = response.message;
				const index = this.items.findIndex(({ id }) => id === item.id);
				if (index !== -1) {
					this.items.splice(index, 1);
				}
				this.isRemoving = false;
				this.isConfirmRemoveVisible = false;
				this.$notify({
					group: 'app',
					type: 'success',
					title: this.$t('Remove User'),
					text: message,
				});
			};
			const errorCallback = (e) => {
				this.isRemoving = false;
				const message = getAxiosErrorMessage(e);
				this.$notify({
					group: 'app',
					type: 'error',
					title: this.$t('Remove User'),
					text: message,
				});
			};
			usersApi.delete(item.id, callback, errorCallback);
		},
		onPageSelected(page) {
			this.fetch(true, page);
		},
		formatText(str) {
			const text = str.split('_');
			let i = 0;
			for (i; i < text.length; i++) {
				text[i] = text[i].charAt(0).toUpperCase() + text[i].slice(1);
			}
			return text.join(' ');
		},
		convertUTC(date) {
			const d = new Date(date);
			const h = addZeroUTC(d.getUTCHours());
			const m = addZeroUTC(d.getUTCMinutes());
			const s = addZeroUTC(d.getUTCSeconds());
			return `${h}:${m}:${s}`;
		},
		getRelativeTime(item) {
			let time = '-';
			if (item.created_at) {
				if (!item.timezone) {
					time = item.created_at;
					time = new Date(time);
					const result = `${time.getDate()}-${(time.getMonth() + 1)}-${time.getFullYear()}/${this.convertUTC(item.created_at)}`;
					time = result;
				} else {
					time = convertTimezone(item.created_at, item.timezone);
				}
			}
			return time;
		},
		handleImportBulk(excelDataConverted) {
			const excelData = duplicateVar(excelDataConverted.body);
			this.tmpUsers = excelData;
		},
		acceptImport() {
			this.createBulk(this.tmpUsers);
		},
		createBulk() {
			this.isImporting = true;
			const callback = (response) => {
				const data = response.data;
				const message = response.message;
				const newUsers = data.createdUsers;
				const existingEmail = data.emailUsed;
				const existingUsers = data.recoveryUsers;
				newUsers.forEach((item) => {
					this.insertItem(item);
				});
				existingUsers.forEach((item) => {
					this.insertItem(item);
				});
				existingEmail.forEach((item) => {
					this.insertItem(item);
				});
				this.$notify({
					group: 'app',
					type: 'success',
					title: this.$t('Import User'),
					text: message,
				});
				this.isImportUserVisible = false;
				this.isImporting = false;
				this.tmpUsers = [];
			};
			const errorCallback = (e) => {
				const message = getAxiosErrorMessage(e);
				this.$notify({
					group: 'app',
					type: 'error',
					title: this.$t('Import User'),
					text: message,
				});
				this.isImportUserVisible = false;
				this.isImporting = false;
			};
			usersApi.createBulk((this.tmpUsers), callback, errorCallback);
		},
		exportUsers(type) {
			this.isExporting = true;
			const params = {
				page: 1,
				limit: 3000,
			};
			const callback = (response) => {
				const contents = response;
				downloadBlob(contents, { name: `${this.$t('Users')}`, type });
				this.isExporting = false;
			};
			const errorCallback = () => {
				this.isExporting = false;
			};
			usersApi.exportList(type, params, callback, errorCallback);
		},
		numberingList(index) {
			if (this.page >= 1) {
				return index + 1 + (this.page * 10 - 10);
			}
			return index + 1;
		},
		openModalApproval(user, isAddingPremiumPackage = false) {
			this.selected = user;
			this.isAddingPremiumPackage = isAddingPremiumPackage;
			this.isConfirmApprovalVisible = true;
		},
		approval(isApproved = true) {
			const params = {
				is_approved: isApproved,
			};
			if (this.isAddingPremiumPackage) params.is_adding_package = this.isAddingPremiumPackage;
			this.isApproving = true;
			const callback = (response) => {
				const userData = response.data;
				const message = response.message;
				this.insertItem(userData);
				this.$notify({
					group: 'app',
					type: 'success',
					title: 'User',
					text: message,
				});
				this.isApproving = false;
				this.isConfirmApprovalVisible = false;
			};
			const errorCallback = (e) => {
					const message = getAxiosErrorMessage(e);
					this.$notify({
					group: 'app',
					type: 'error',
					title: 'User',
					text: message,
				});
				this.isApproving = false;
				this.isConfirmApprovalVisible = false;
			};
			usersApi.update(this.selected.id, params, callback, errorCallback);
		},
	},
	computed: {
		...mapGetters({
			user: 'user',
		}),
		fetchParams() {
			const params = {
				page: this.page,
				limit: this.limit,
				order_by: this.orderBy,
				sort_by: this.sortBy,
				is_verified: this.isVerified,
				role: this.roleFilter,
			};
			const keyword = this.keyword.trim();
			if (keyword !== '') params.keyword = keyword;
			return params;
		},
		totalPages() {
			const total = Math.ceil(this.totalItems / this.limit);
			return total;
		},
	},
	watch: {
		isVerified() {
			this.fetch(true);
		},
		roleFilter() {
			this.fetch(true);
		},
	},
	created() {
		this.fetch();
	},
};
</script>
