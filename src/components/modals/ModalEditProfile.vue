<template>
	<modal size="large" :hide-footer="true" @close="close()" v-if="show" class="modal-edit-profile">
		<template slot="header">
			Edit Profile
		</template>
		<template slot="body">
			<!-- Body -->
			<div class="row">
				<div class="col-md-4 mb-5">
					<div class="filter-options">
						<div
							class="filter-option-item py-3 px-3 pointer" v-for="(item, index) in menus"
							:class="activeMenuClass(item)"
							:key="index"
							@click="setMenu(item.id)">
							{{ item.name }}
						</div>
					</div>
				</div>
				<div class="col-md-8">
					<username-photo :is-update-profile="true" v-if="selectedMenu === 'username_photo'" />
				</div>
			</div>
		</template>
	</modal>
</template>

<script>

import { mapGetters } from 'vuex';
import { duplicateVar } from '@/lib/helper';
import Modal from '@/components/Modal.vue';
import UsernamePhoto from '@/components/forms/UsernamePhoto.vue';

const MENUS = [
	{
		id: 'username_photo',
		name: 'Username & Photo',
	},
];

export default {
	name: 'ModalEditProfile',
	components: {
		Modal,
		UsernamePhoto,
	},
	props: {
		show: {
			type: Boolean,
			default: () => false,
		},
	},
	data() {
		return {
			menus: duplicateVar(MENUS),
			selectedMenu: 'username_photo',
		};
	},
	sockets: {},
	computed: {
		...mapGetters({
			user: 'user',
		}),
	},
	methods: {
		close() {
			this.$emit('close');
		},
		activeMenuClass(item) {
			return this.selectedMenu === item.id ? 'active' : '';
		},
		setMenu(id) {
			this.selectedMenu = id;
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
