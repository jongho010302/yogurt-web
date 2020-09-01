<template>
  <div>
    <q-layout v-if="jwtToken" view="lHh Lpr lff">
      <!-- Header -->
      <q-header bordered>
        <q-toolbar class="text-dark shadow-1 bg-white">
          <img
            src="@/assets/logo.jpg"
            width="50"
            class="q-mr-md q-ml-md"
            style="border-radius: 50%;"
          />
          <q-tabs
            v-model="tab"
            active-color="primary"
            outside-arrows
            mobile-arrows
            :stretch="false"
            shrink
          >
            <q-route-tab to="/schedule" label="일정" style="width: 70px;" />
            <q-route-tab to="/lecture" label="수업" style="width: 70px;" />
            <q-route-tab to="/user" label="회원" style="width: 70px;" />
            <q-route-tab to="/staff" label="강사" style="width: 70px;" />
            <q-route-tab to="/ticket" label="수강권" style="width: 70px;" />
            <q-route-tab to="/setting" label="설정" style="width: 70px;" />
            <q-route-tab to="/sales" label="매출" style="width: 70px;" />
          </q-tabs>
          <q-space />

          <q-btn round flat>
            <q-avatar size="42" class="float-right cursor-pointer" @click="menu != menu">
              <img
                :src="
                  user.profileUrl ||
                  'https://seoulforest-image.s3.ap-northeast-2.amazonaws.com/default_profile.png'
                "
                alt="default profile"
                style="border-radius: 50%;"
              />
            </q-avatar>
            <q-menu>
              <div class="row no-wrap q-pa-md">
                <div class="column">
                  <div class="text-h6 q-mb-md">Settings</div>
                  <q-toggle v-model="mobileData" label="Use Mobile Data" />
                  <q-toggle v-model="bluetooth" label="Bluetooth" />
                </div>

                <q-separator vertical inset class="q-mx-lg" />

                <div class="column items-center">
                  <q-avatar size="72px">
                    <img :src="user.profileUrl" />
                  </q-avatar>

                  <div class="text-subtitle1 q-mt-md q-mb-xs">{{ user.name }}</div>

                  <q-btn color="primary" label="로그아웃" push size="sm" v-close-popup @click="logOut" />
                </div>
              </div>
            </q-menu>
          </q-btn>
        </q-toolbar>
      </q-header>

      <!-- Left Sider -->
      <q-drawer v-model="drawer" show-if-above :width="60" bordered>
        <q-list padding>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="alarm" />
            </q-item-section>
          </q-item>
        </q-list>
      </q-drawer>

      <!-- Content -->
      <q-page-container>
        <q-page>
          <router-view></router-view>
        </q-page>
      </q-page-container>
    </q-layout>

    <div v-else class="fit row justify-center items-center">
      <div class="q-mb-xl">
        <img src="@/assets/login.svg" alt="login_image" />
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Methods } from '@/mixins';
import Login from '@/views/auth/Login.vue';
import { setAxiosHeaders } from './util/common';
import 'element-ui/lib/theme-chalk/index.css';
import './App.css';
import './App.scss';

const namespace = 'user';

@Component({
  components: {
    Login,
  },
})
export default class App extends mixins(Methods) {
  data() {
    return {
      tab: 0,
      drawer: true,
      menu: false,

      // Menu
      mobileData: false,
      bluetooth: true,
    };
  }

  get jwtToken() {
    return this.$store.getters[`${namespace}/getJwtToken`];
  }

  get user() {
    return this.$store.getters[`${namespace}/getUser`];
  }

  get primary() {
    return this.$store.state.primary;
  }

  async created() {
    const jwtToken = localStorage.getItem('jwtToken');
    if (jwtToken) {
      setAxiosHeaders(jwtToken);
      await this.$store.dispatch(`${namespace}/checkUser`);
    }
  }

  async logOut() {
    try {
      await this.$store.dispatch(`${namespace}/logOut`);
      await this.$router.push('/login');
    } catch (err) {
      console.error(err);
    }
  }
}
</script>

<style scoped>
.q-layout__section--marginal {
  background-color: aliceblue;
}
</style>

<style scoped>
.main {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-columns: 55px calc(100vw - 55px);
  grid-template-rows: auto 1fr;
  grid-template-areas:
    'notification header'
    'notification contents';
}
</style>

<style global>
.q-tab__content {
  min-width: 70px !important;
}
</style>
