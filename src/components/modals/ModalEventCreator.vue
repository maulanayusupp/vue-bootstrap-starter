<template>
	<modal size="medium" :hide-footer="true" @close="close()" :is-closeable="true" v-if="show" class="modal-edit-profile">
		<template slot="header">
			<div>
				<h3 class="mb-2">Start Building Your Event</h3>
				<div class="text-gray">
					<div>We’ll need a few details first to build your event.</div>
					<div>Don’t worry, you can update your details later if you need to.</div>
				</div>
			</div>
		</template>
		<template slot="body">
			<form @submit.prevent="onSubmit" class="pr-3">
				<div class="row">
					<div class="col-md-12">
						<!-- Name -->
						<div class="form-group">
							<label>{{ $t('Name') }}</label>
							<input type="text" name="name" class="form-control">
						</div>
					</div>
				</div>
			</form>
		</template>
	</modal>
</template>

<script>

import { mapGetters } from 'vuex';
import Modal from '@/components/Modal.vue';

export default {
	name: 'ModalEditProfile',
	components: {
		Modal,
	},
	props: {
		show: {
			type: Boolean,
			default: () => false,
		},
	},
	data() {
		return {
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
		onSubmit() {
			console.log('Submit');
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
