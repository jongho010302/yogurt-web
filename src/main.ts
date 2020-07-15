import Vue from 'vue';

import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import './quasar';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

Vue.mixin({
  methods: {
    numberCommaFortmat(inputNumber: number) {
      if(inputNumber === 0 || inputNumber === undefined) {
        return 0;
      }
      return inputNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    routerTo(path: string) {
      this.$router.push({ path });
    }
  },
});
