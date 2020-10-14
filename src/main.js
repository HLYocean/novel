import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import vantConfig from './vant.config.js'


Vue.use(VueAxios, axios);
Vue.use(vantConfig);
Vue.config.productionTip = false;
Vue.prototype.arrBook=[];

new Vue({

    router,
    render: h => h(App)
}).$mount('#app');