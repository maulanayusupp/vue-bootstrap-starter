<template>
<div class="page page-events">
	<div class="container">
		<div class="d-flex justify-content-between">
			<div class="mb-4">
				<h2 class="font-weight-bold">{{ $t('Events') }}</h2>
				<div>{{ $t('Manage all events') }}</div>
			</div>
		</div>

		<!-- List -->
		<div class="row">
			<!-- Create -->
			<div class="col-lg-4 col-md-6 col-sm-12">
				<div class="card mb-4 card-add card-table pointer">
					<div class="card-table-middle text-center">
						<div class="text-muted">
							<i class="material-icons">add</i>
							<div class="font-weight-bold text-lg">{{ $t('Add new event') }}</div>
						</div>
					</div>
				</div>
			</div>

			<!-- List -->
			<div class="col-lg-4 col-md-6 col-sm-12" v-for="(item, index) in items" :key="index">
				<div class="card mb-4 card-event">
					<div class="card-header">
						<div class="d-flex justify-content-between mb-3">
							<div class="d-flex justify-content-between">
								<div class="card-event-thumbnail mr-3" :style="{ backgroundImage: 'url(' + item.thumbnail + ')' }"></div>
								<div class="d-flex align-items-center">
									<div>
										<div class="font-weight-bold mb-1">{{ item.title && item.title.length > 25 ? item.title.substring(0, 25) + '...' : item.title }}</div>
										<div class="text-gray">Wedding</div>
									</div>
								</div>
							</div>
							<div>
								<md-menu md-align-trigger :md-offset-x="-40" class="pointer">
									<i class="material-icons" md-menu-trigger>more_vert</i>
									<md-menu-content>
										<md-menu-item><span class="minw-130">{{ $t('Edit') }}</span></md-menu-item>
									</md-menu-content>
								</md-menu>
							</div>
						</div>
						<div class="card-event-description">{{ item.description && item.description.length > 150 ? item.description.substring(0, 150) + '...' : item.description }}</div>
					</div>
					<div class="card-body">
						<div class="d-flex justify-content-between">
							<div class="text-left">
								<div class="font-weight-bold">300</div>
								<div class="text-muted">Participants</div>
							</div>
							<div class="text-right">
								<div class="font-weight-bold">24-10-2021</div>
								<div class="text-muted">Due Date</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
</template>

<script>
export default {
	name: 'Events',
	components: {},
	data() {
		return {
			items: [
				{
					title: 'Best Leading Event',
					thumbnail: 'https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/cristal-laptop.jpg',
					description: 'Bea World is an initiative that recognises and promotes excellence in events and live communication.',
				},
				{
					title: 'Kokoronomoto Akibase',
					thumbnail: 'https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/cristal-laptop.jpg',
					description: 'Created in 2006 to foster and advance the importance of events in the marketing plans of large and smaller corporations, the Best Event Awards (formerly known as EuBea – European Best Event Awards) have helped participating agencies from 40 countries in finding inspiration and new ideas for their events, and are now acknowledged as the main and most challenging international industry recognition. As in previous years, shortlisted agencies contesting for the renowned golden elephant awards will have the opportunity to present their projects live to the Jury and Bea World Festival delegates.',
				},
				{
					title: 'For Revenge',
					thumbnail: 'https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/cristal-laptop.jpg',
					description: 'Best Event Awards (formerly known as EuBea – European Best Event Awards) have helped participating agencies from 40 countries in finding inspiration and new ideas for their events, and are now acknowledged as the main and most challenging international industry recognition. As in previous years, shortlisted agencies contesting for the renowned golden elephant awards will have the opportunity to present their projects live to the Jury and Bea World Festival delegates.',
				},
				{
					title: 'Revenge The Fate Revenge The Fate',
					thumbnail: 'https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/cristal-laptop.jpg',
					description: 'Events and Live Communication. Created in 2006 to foster and advance the importance of events in the marketing plans of large and smaller corporations, the Best Event Awards (formerly known as EuBea – European Best Event Awards) have helped participating agencies from 40 countries in finding inspiration and new ideas for their events, and are now acknowledged as the main and most challenging international industry recognition. As in previous years, shortlisted agencies contesting for the renowned golden elephant awards will have the opportunity to present their projects live to the Jury and Bea World Festival delegates.',
				},
			],
		};
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
</style>
