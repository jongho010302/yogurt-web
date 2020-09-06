import Vue from 'vue';
import ElementUI from 'element-ui';
// @ts-ignore
import locale from 'element-ui/lib/locale/lang/ko';
import 'element-ui/lib/theme-chalk/index.css';
// @ts-ignore
import VueProgressBar from 'vue-progressbar';
import '@/css/index.scss';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

const options = {
  color: '#87cefa',
  failedColor: '#FF0000',
  thickness: '5px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300,
  },
  autoRevert: true,
  location: 'top',
  inverse: false,
};

Vue.use(VueProgressBar, options);

Vue.use(ElementUI, { locale });

export default new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
