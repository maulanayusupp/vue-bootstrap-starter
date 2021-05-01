<template>
	<modal size="medium" :hide-footer="true" @close="close()" :is-closeable="true" v-if="show" class="modal-edit-profile">
		<template slot="header">
			<h3>Template</h3>
		</template>
		<template slot="body">
			Template
		</template>
	</modal>
</template>

<script>

import { mapGetters } from 'vuex';
import { duplicateVar } from '@/lib/helper';
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
