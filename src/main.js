import Vue from 'vue';
import io from 'socket.io-client';
import VueSocketio from 'vue-socket.io-extended';
import Notifications from 'vue-notification';
import vueXlsxTable from 'vue-xlsx-table';
import VTooltip from 'v-tooltip';
import VueQuillEditor from 'vue-quill-editor';
import ivSlider from 'iv-slider';
import VueCountdownTimer from 'vuejs-countdown-timer';
import VueLazyLoad from 'vue-lazyload';

import {
	MdField,
	MdButton,
	MdIcon,
	MdRadio,
	MdCheckbox,
	MdDatepicker,
	MdMenu,
	MdList,
	MdDivider,
	MdDialog,
	MdContent,
	MdSwitch,
	MdChips,
	MdTable,
	MdCard,
	MdRipple,
	// MdMenuContent,
	// MdSubheader,
	// MdProgress,
} from 'vue-material/dist/components';
import 'vue-material/dist/vue-material.min.css';
// import 'vue-material/dist/theme/default.css';

// css quil editor
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

// number input international
import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';

import App from './App.vue';
import router from './router';
import store from './store';
import 'bootstrap';

import {
	i18n,
	loadLanguageAsync,
} from './setup/i18n-setup';
import './registerServiceWorker';

Vue.config.productionTip = false;

// Socket
const SOCKET_URL = process.env.VUE_APP_SOCKET_URL || 'http://localhost:3333';
const socket = io(SOCKET_URL, {
	transports: ['websocket'],
});
Vue.use(VueSocketio, socket, { store });

// Material Design Components
Vue.use(MdField);
Vue.use(MdButton);
Vue.use(MdIcon);
Vue.use(MdRadio);
Vue.use(MdCheckbox);
Vue.use(MdDatepicker);
Vue.use(MdMenu);
Vue.use(MdList);
Vue.use(MdDivider);
Vue.use(MdDialog);
Vue.use(MdContent);
Vue.use(MdSwitch);
Vue.use(MdChips);
Vue.use(MdTable);
Vue.use(MdCard);
Vue.use(MdRipple);
// Vue.use(MdMenuContent);
// Vue.use(MdSubheader);
// Vue.use(MdProgress);

Vue.use(Notifications);
Vue.use(VTooltip);
Vue.use(VueQuillEditor);
Vue.use(vueXlsxTable, { rABS: false });
Vue.use(ivSlider);
Vue.use(VueCountdownTimer);
Vue.use(VueLazyLoad);

// phone input
Vue.component('vue-phone-number-input', VuePhoneNumberInput);

// Route Middleware
router.beforeEach((to, from, next) => {
	const { path } = to;
	const { isTokenExist } = store.getters;

	const errors = [];

	const alreadyLoggedIn = path === '/login' && isTokenExist;
	if (alreadyLoggedIn) errors.push('already_logged_in');

	const isNotAvailable = errors.length > 0;
	const allowedPaths = [
		'/',
		'/callback',
		'/login',
		'/logout',
		'/reset-password',
		'/password/reset',
		'/register',
		'/magic-link',
		'/change-password',
		'/auto_login',
		'/user/verify',
		'/confirmation-email',
		'/about-us',
		'/privacy-policy',
		'/terms-and-conditions',
		'/terms-of-use',
		'/how-it-works',
	];
	if (!isTokenExist && path === '/home') {
		next('/login');
	} else if (!isTokenExist && !allowedPaths.includes(path)) {
		next('/login');
	} else if (isTokenExist && path === '/login') {
		next('/home');
	} else if (isNotAvailable) {
		next('/');
	} else if (allowedPaths.includes(path)) {
		next();
	} else {
		next();
	}
});

// Change Title
router.beforeEach((to, from, next) => {
	store.dispatch('navigate', { to });
	const title = to.meta.title || '';
	document.title = title;
	next();
});

// Lazy load Languages
router.beforeEach((to, from, next) => {
	const lang = to.query.lang || store.getters.locale;
	loadLanguageAsync(lang).then(() => next());
});


new Vue({
    router,
    store,
    i18n,
    render: h => h(App),
}).$mount('#app');
