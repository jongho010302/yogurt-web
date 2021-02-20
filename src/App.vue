<template>
  <div>
    <the-layout></the-layout>

    <!-- Async Loading: Progress Bar -->
    <vue-progress-bar></vue-progress-bar>
  </div>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import { Methods } from '@/mixins';
import Login from '@/views/auth/Login.vue';
import TheLayout from '@/layouts/TheLayout.vue';
import { getAccessToken } from '@/util/storage';
import { defaultProfileUrl } from '@/util/image';
import './css/App.scss';
import './css/CustomElementUI.scss';

const namespace = 'user';

@Component({
  components: {
    Login,
    TheLayout,
  },
})
export default class App extends mixins(Methods) {
  defaultProfileUrl = defaultProfileUrl;

  data() {
    return {
      activeLink: this.$route.path,
      drawer: true,
      menu: false,

      // Menu
      mobileData: false,
      bluetooth: true,
    };
  }

  get user() {
    return this.$store.getters[`${namespace}/getUser`];
  }

  get isLogined() {
    return this.$store.getters[`${namespace}/getIsLogined`];
  }

  async created() {
    try {
      const jwtToken = getAccessToken();
      if (jwtToken) {
        await this.$store.dispatch(`${namespace}/checkUser`);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async handleCommand(command: string) {
    if (command === 'mypage') {
      this.$router.push('/staff/me');
    } else if (command === 'logout') {
      await this.handleLogout();
    }
  }

  async handleLogout() {
    try {
      await this.$store.dispatch(`${namespace}/logout`);
      // await this.$router.push('/login');
    } catch (err) {
      console.error(err);
    }
  }

  @Watch('$route')
  onRouteChange() {
    const firstEndpointUrlPattern = /^\/\w*/;
    const executedPattern = firstEndpointUrlPattern.exec(this.$route.path);
    if (executedPattern) {
      this.$data.activeLink = executedPattern[0];
    } else {
      this.$data.activeLink = this.$route.path;
    }
  }
}
</script>
