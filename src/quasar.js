import Vue from 'vue';

import './styles/quasar.sass';
import '@quasar/extras/material-icons/material-icons.css';
import { Quasar, Notify, Loading, QAjaxBar, LoadingBar } from 'quasar';

Vue.use(Quasar, {
  config: {},
  components: {
    /* not needed if importStrategy is not 'manual' */
  },
  directives: {
    /* not needed if importStrategy is not 'manual' */
  },
  plugins: {
    Notify,
    Loading,
    QAjaxBar,
    LoadingBar,
  },
});

LoadingBar.setDefaults({
  color: 'primary',
  size: '7px',
  position: 'top',
});
