<template>
<div class="footer-section">
	<div class="container">
		<div class="footer-wrapper">
			<div class="row">
				<div class="col-md-8 mb-4">
					<div class="footer-description">
						Prodo is the leading app site where over tens of thousands of members find relationships on their terms.
					</div>
					<!-- <div class="social-media-links mt-3 mb-3">
						<i class="material-icons social-media-icon md-36">facebook</i>
					</div>
					<div class="store-links">
						<img src="/img/app_store.png" class="store-image-icon" alt="App Store">
						<img src="/img/google_play.png" class="store-image-icon" alt="Google Play">
					</div> -->
				</div>
				<div class="col-md-4">
					<div class="row">
						<div class="col-6 col-md-6">
							<div class="font-weight-bold mb-3">Our Company</div>
							<ul class="list-no-style">
								<li><router-link class="underline" to="/about-us">About Us</router-link></li>
								<!-- <li><router-link class="underline" to="/">Support</router-link></li> -->
								<!-- <li><router-link class="underline" to="/">SA Blog</router-link></li> -->
								<!-- <li><router-link class="underline" to="/">Anti-Sex Trafficking</router-link></li> -->
								<li><router-link class="underline" to="/privacy-policy">Privacy</router-link></li>
								<li><router-link class="underline" to="/terms-of-use">Terms</router-link></li>
							</ul>
						</div>
						<!-- <div class="col-6 col-md-6">
							<div class="font-weight-bold mb-3">Sugar Dating</div>
							<ul class="list-no-style">
								<li><router-link class="underline" to="/register">Sign up Free</router-link></li>
								<li><router-link class="underline" to="/">Press &amp; Media</router-link></li>
								<li><router-link class="underline" to="/">Affiliate Program</router-link></li>
								<li><router-link class="underline" to="/">Hypergamy</router-link></li>
								<li><router-link class="underline" to="/">Reviews</router-link></li>
							</ul>
						</div> -->
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12">
					<div class="text-grey text-extra-small py-3">
						© {{ currentYear }} Prodo
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
</template>

<script>
export default {
	name: 'Footer',
	components: {},
	data() {
		return {};
	},
	sockets: {},
	computed: {
		currentYear() {
			return new Date().getFullYear();
		},
	},
	methods: {},
	watch: {},
	mounted() {},
	created() {},
	destroyed() {},
	beforeDestroy() {},
};
</script>

<style lang="scss" scoped>
.footer-wrapper {
	padding-top: 1em;
	margin-top: 1em;
	border-top: 1px solid #d1d1d1;
	.footer-description {
		max-width: 350px;
	}
	.social-media-icon {
		margin-right: 20px;
		cursor: pointer;
		&:last-child {
			margin-right: 0;
		}
	}
	.store-image-icon {
		max-height: 40px;
		cursor: pointer;
	}
}
</style>
