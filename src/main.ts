import Vue from 'vue';
import ElementUI from 'element-ui';
// @ts-ignore
import locale from 'element-ui/lib/locale/lang/ko';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import './quasar';

Vue.config.productionTip = false;

Vue.use(ElementUI, { locale });

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
