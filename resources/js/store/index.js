import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import customers from './modules/customers';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        auth,
        customers
    }
});

export default store;