require('./bootstrap');

import Vue from 'vue';
import router from './router';
import MainApp from './layouts/MainApp.vue';
import store from './store';
import transport from './helpers/transport';
import {response, request} from './helpers/interceptors';
import {ValidationProvider, ValidationObserver} from 'vee-validate/dist/vee-validate.full';

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

request(store, transport);
response(store, router, transport);
Vue.prototype.$http = transport;

const app = new Vue({
    el: "#app",
    router,
    store,
    components: {
        MainApp,
        ValidationProvider,
        ValidationObserver
    },
});