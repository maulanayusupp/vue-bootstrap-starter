<template>
	<transition name="modal">
		<div>
			<div class="modal-mask">
				<div class="modal-wrapper has-scroll" :class="`modal-wrapper-${wrapper}`">
					<div class="modal-container" :class="`modal-container-${size}`">
						<div class="modal-header" v-if="$slots.header">
							<slot name="header">
								Modal Header
							</slot>
							<div class="modal-close" @click="$emit('close')" v-if="isCloseable">
								<i class="material-icons">close</i>
							</div>
							<button type="button" class="close hidden" aria-label="Close" @click="$emit('close')" v-if="isCloseable">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>

						<div class="modal-body" :class="{ 'p-0': full }">
							<slot name="body">
								Modal Body
							</slot>
						</div>

						<div class="modal-footer" v-if="!hideFooter">
							<slot name="footer">
								<button class="btn btn-primary" @click="$emit('close')">OK</button>
							</slot>
						</div>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
export default {
	name: 'Modal',
	props: {
		size: {
			type: String,
			default: 'small',
		},
		wrapper: {
			type: String,
			default: 'small',
		},
		hideFooter: {
			type: Boolean,
			default: false,
		},
		full: {
			type: Boolean,
			default: false,
		},
		isCloseable: {
			type: Boolean,
			default: true,
		},
	},
	methods: {
		onKeyup(event) {
			if (event.key === 'Escape') {
				this.$emit('close');
			}
		},
		initKeyUp() {
			document.body.classList.add('modal-open');
			window.addEventListener('keyup', this.onKeyup);
		},
		destroyKeyUp() {
			document.body.classList.remove('modal-open');
			window.removeEventListener('keyup', this.onKeyup);
		},
	},
	created() {
		if (this.isCloseable) this.initKeyUp();
	},
	destroyed() {
		if (this.isCloseable) this.destroyKeyUp();
	},
};
</script>

<style lang="scss">
</style>
