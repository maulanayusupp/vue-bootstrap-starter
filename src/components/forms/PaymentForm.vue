<template>
<div class="payment-form">
	<div class="bg-white">
		<div class="p-4">
			<!-- Credit Cards -->
			<div class="text-center mb-3 border-bottom">
				<div class="mb-3">
					<div class="font-weight-bold mb-2">Pay with Credit Card</div>
					<img src="/img/creditcards.png" alt="Credit Cards">
				</div>
			</div>

			<!-- Name -->
			<div class="form-group">
				<label>Name</label>
				<input type="text" class="form-control" placeholder="Full name">
			</div>

			<!-- Billing Address -->
			<div class="form-group">
				<label>Billing Address</label>
				<input type="text" class="form-control" placeholder="Billing address">
			</div>

			<!-- Country -->
			<div class="form-group">
				<label>Country</label>
				<input type="text" class="form-control" placeholder="Select country">
			</div>

			<!-- City, State, ZIP -->
			<div class="row">
				<div class="col-md-4">
					<div class="form-group">
						<label>City</label>
						<input type="text" class="form-control" placeholder="City">
					</div>
				</div>
				<div class="col-md-4">
					<div class="form-group">
						<label>State / Province</label>
						<input type="text" class="form-control" placeholder="State / Province">
					</div>
				</div>
				<div class="col-md-4">
					<div class="form-group">
						<label>ZIP / Postal Code</label>
						<input type="text" class="form-control" placeholder="ZIP / Postal Code">
					</div>
				</div>
			</div>

			<!-- Phone -->
			<div class="form-group">
				<label>Phone</label>
				<input type="text" class="form-control" placeholder="(123) 456-7890">
			</div>

			<!-- Card Number -->
			<div class="form-group">
				<label>Card Number</label>
				<input type="text" class="form-control" placeholder="0000 0000 0000 0000">
			</div>
			<div class="mb-3">
				<img src="/img/creditcards.png" alt="Credit Cards">
			</div>

			<!-- Expiration -->
			<div class="row">
				<div class="col-md-3">
					<div class="form-group">
						<label>MM</label>
						<input type="text" class="form-control" placeholder="MM">
					</div>
				</div>
				<div class="col-md-3">
					<div class="form-group">
						<label>YEAR</label>
						<input type="text" class="form-control" placeholder="YYYY">
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<label>CVV</label>
						<input type="text" class="form-control" placeholder="CVV">
					</div>
				</div>
			</div>

			<!-- Confirm Payment -->
			<div class="form-group">
				<button type="button" class="btn btn-lg btn-block btn-danger">Confirm Payment</button>
			</div>
		</div>
	</div>
	<div class="bg-grey">
		<div class="p-4 text-center">
			<div>You will be billed ${{ selectedPackage.price }} USD today</div>
			<div class="text-small mb-3 mt-1">(Note : We do not offer refunds)</div>
			<div>You will be billed ${{ selectedPackage.price }} USD every {{ 30 * selectedPackage.length }} days</div>
			<div>Your subscription will automatically renew on 04/06/2021</div>
			<div class="text-small mb-3 mt-3">Review Terms and Conditions for this purchase</div>
			<div class="text-small mb-3">For your protection, your credit card statement will read "MIL HongKong"</div>
			<div class="text-small">Note: Credit card or prepaid card used must permit international transactions.</div>
		</div>
	</div>
</div>
</template>

<script>
export default {
	name: 'PaymentForm',
	components: {},
	props: {
		selectedPackage: {
			type: Object,
			default: () => null,
		},
	},
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
.payment-form {
}
</style>
