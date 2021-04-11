<template>
	<nav class="navbar navbar-expand-lg navbar-light" v-if="activeRouteName !== 'Error404'">
		<div class="container">
			<router-link to="/home" class="navbar-brand mr-4 font-weight-bold no-underline">
				<img src="/img/logo/logo_small.png" class="img-fluid navbar-brand-logo" alt="Brand Logo">
			</router-link>
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#mainNavbar" aria-controls="mainNavbar" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>

			<div class="collapse navbar-collapse justify-content-between" id="mainNavbar">
				<ul class="navbar-nav">
					<template v-if="isClient">
						<li class="nav-item">
							<router-link to="/home" class="nav-link">
								<div class="text-center">{{ $t('Home') }}</div>
							</router-link>
						</li>
					</template>
					<template v-if="isSuperAdmin">
						<li class="nav-item">
							<md-menu md-align-trigger :md-offset-x="0" class="pointer full-width">
								<a class="nav-link" md-menu-trigger>
									<div class="text-center">{{ $t('Manage') }}</div>
								</a>
								<md-menu-content>
									<md-menu-item to="/users"><span class="minw-150">{{ $t('Users') }}</span></md-menu-item>
									<md-menu-item to="/categories"><span class="minw-150">{{ $t('Categories') }}</span></md-menu-item>
									<md-menu-item to="/articles"><span class="minw-150">{{ $t('Articles') }}</span></md-menu-item>
									<md-menu-item><span class="minw-150">{{ $t('Statistics') }}</span></md-menu-item>
									<md-menu-item><span class="minw-150">{{ $t('Report') }}</span></md-menu-item>
								</md-menu-content>
							</md-menu>
						</li>
					</template>
				</ul>
				<ul class="navbar-nav">
					<li class="nav-item profile-dropdown">
						<md-menu md-align-trigger :md-offset-x="-50" class="pointer full-width">
							<a class="nav-link text-center" md-menu-trigger>
								<span class="nav-link-name inline-item">{{ userName }}</span>
								<span class="nav-link-avatar inline-item" v-if="!userPicture">{{ initialUserName }}</span>
								<span class="inline-item" v-else><img :src="userPicture" alt="Avatar" class="avatar-image"></span>

							</a>
							<md-menu-content>
								<md-menu-item to="/profiles"><span class="minw-150">{{ $t('My Profile') }}</span></md-menu-item>
								<!-- <md-menu-item><span class="minw-150">{{ $t('Feedback and Request') }}</span></md-menu-item>
								<md-menu-item><span class="minw-150">{{ $t('Help and Support') }}</span></md-menu-item> -->
								<md-menu-item @click="logout()"><span class="minw-150">{{ $t('Logout') }}</span></md-menu-item>
							</md-menu-content>
						</md-menu>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</template>

<script>

import { mapActions, mapGetters } from 'vuex';
import { initialText } from '@/lib/helper';

export default {
	name: 'Navbar',
	components: {},
	data() {
		return {};
	},
	sockets: {
	},
	mounted() {},
	created() {},
	destroyed() {},
	beforeDestroy() {
	},
	computed: {
		...mapGetters({
			user: 'user',
			isSuperAdmin: 'isSuperAdmin',
			isClient: 'isClient',
		}),
		userPackage() {
			const curr = this.user && this.user.userPackage ? this.user.userPackage : null;
			return curr;
		},
		currentPackage() {
			const curr = this.userPackage && this.userPackage.package ? this.userPackage.package : null;
			return curr;
		},
		currentPackageMemberType() {
			return this.userPackage ? this.userPackage.member_type : null;
		},
		isDiamond() {
			return this.currentPackageMemberType === 'diamond';
		},
		isPremium() {
			return this.currentPackageMemberType === 'premium';
		},
		userProfile() {
			return this.user && this.user.profile ? this.user.profile : null;
		},
		userName() {
			return this.user && this.user.profile ? this.user.profile.name : 'AN';
		},
		userPicture() {
			return this.user && this.user.profile ? this.user.profile.picture : null;
		},
		initialUserName() {
			return initialText(this.userName);
		},
		activeRouteName() {
			return this.$route.name;
		},
	},
	methods: {
		...mapActions({
			logout: 'logout',
		}),
	},
};
</script>

<style lang="scss" scoped>
</style>
