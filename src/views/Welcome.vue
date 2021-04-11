<template>
<div class="page page-welcome pt-0">
	<!-- Home Banner -->
	<div class="home-banner">
		<div class="container">
			<div class="home-wrapper">
				<div class="row">
					<div class="col-md-4">
						<div class="py-5">
							<div>
								<h2 class="font-weight-bold">Upgrade Your Relationships™</h2>
							</div>
							<div class="my-2">Where beautiful, successful people fuel mutually beneficial relationships</div>
							<div class="mt-3">Signing up for Prodo is</div>
							<div class="font-weight-bold">fast &amp; free!</div>
							<div class="mt-4">
								<router-link to="/register">
									<button class="btn btn-danger btn-lg btn-call-to-action">Join now</button>
								</router-link>
							</div>
						</div>
					</div>
					<div class="col-md-8">
						<img src="/img/join_date.jpg" alt="" class="img-fluid">
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- Sugar Daddy Benefits -->
	<div class="sugar-daddy-benefits bg-white p-5">
		<div class="container">
			<div class="row my-4">
				<div class="col-sm-12">
					<div class="text-center font-weight-bold">
					IF YOU ARE A SUCCESSFUL MAN
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-4">
					<div class="benefit-item text-center">
						<div>
							<i class="material-icons md-68 red-wine">people</i>
						</div>
						<div>
							<h4>4 Attractive women per a successful man</h4>
						</div>
						<div>The odds are in your favor with thousands of attractive local women looking to meet now.</div>
					</div>
				</div>
				<div class="col-sm-4">
					<div class="benefit-item text-center">
						<div>
							<i class="material-icons md-68 red-wine">people</i>
						</div>
						<div>
							<h4>No Strings Attached</h4>
						</div>
						<div>Redefine the expectations of a perfect relationship.</div>
					</div>
				</div>
				<div class="col-sm-4">
					<div class="benefit-item text-center">
						<div>
							<i class="material-icons md-68 red-wine">people</i>
						</div>
						<div>
							<h4>Ideal Relationships</h4>
						</div>
						<div>Upfront and honest expectations with someone who is charming and beautiful.</div>
					</div>
				</div>
			</div>
			<div class="row mt-5">
				<div class="col-sm-12">
					<div class="text-center text-small underline pointer">
						Browse Charming Women
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Horizontal line -->
	<div class="bg-white">
		<div class="container">
			<div class="horizontal-line"></div>
		</div>
	</div>

	<!-- Sugar Baby Benefits -->
	<div class="sugar-daddy-benefits bg-white p-5">
		<div class="container">
			<div class="row my-4">
				<div class="col-sm-12">
					<div class="text-center font-weight-bold">
					IF YOU ARE A CHARMING WOMAN
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-4">
					<div class="benefit-item text-center">
						<div>
							<i class="material-icons md-68 red-wine">people</i>
						</div>
						<div>
							<h4>Find a Mentor</h4>
						</div>
						<div>Established members offer valuable guidance for long-term stability.</div>
					</div>
				</div>
				<div class="col-sm-4">
					<div class="benefit-item text-center">
						<div>
							<i class="material-icons md-68 red-wine">people</i>
						</div>
						<div>
							<h4>Date Experienced Men</h4>
						</div>
						<div>Date real gentlemen who don't play games.</div>
					</div>
				</div>
				<div class="col-sm-4">
					<div class="benefit-item text-center">
						<div>
							<i class="material-icons md-68 red-wine">people</i>
						</div>
						<div>
							<h4>Be Pampered</h4>
						</div>
						<div>Indulge in shopping sprees, expensive dinners, and exotic travel vacations.</div>
					</div>
				</div>
			</div>
			<div class="row mt-5">
				<div class="col-sm-12">
					<div class="text-center text-small underline pointer">
						Browse Successful Men
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Sugar Baby Benefits -->
	<div class="featured-in p-5 hidden">
		<div class="container">
			<div class="row my-4">
				<div class="col-sm-12">
					<div class="text-center font-weight-bold">
						AS FEATURED IN
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-12">
				</div>
			</div>
		</div>
	</div>
</div>
</template>

<script>
export default {
	name: 'Welcome',
	components: {},
	data() {
		return {};
	},
	sockets: {},
	computed: {},
	methods: {},
	watch: {},
	mounted() {},
	created() {},
	destroyed() {},
	beforeDestroy() {},
};
</script>

<style lang="scss" scoped>
.page-welcome {
	.home-banner {
		background-color: #e3e3e3;
		padding-top: 5em;
	}
	.home-wrapper {
		max-width: 1000px;
		margin: 0 auto;
	}
	.btn-call-to-action {
		min-width: 250px;
		height: 45px;
	}
	.featured-in {
		background-color: #F6F6F6;
		padding-top: 5em;
	}
}
</style>
