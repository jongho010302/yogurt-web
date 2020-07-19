<template>
  <div>
    <q-layout v-if="user" view="lHh Lpr lff">
      <!-- Header -->
      <q-header bordered>
        <q-toolbar class="text-black shadow-0 bg-white">
          <img src="@/assets/logo.jpg" width="50" class="q-mr-md q-ml-md" style="border-radius: 50%" />
          <q-tabs v-model="tab" active-color="black">
            <q-route-tab to="/schedule" label="Scheudle" />
            <q-route-tab to="/lesson" label="Lesson" />
            <q-route-tab to="/user" label="User" />
            <q-route-tab to="/staff" label="Staff" />
            <q-route-tab to="/ticket" label="Ticket" />
            <q-route-tab to="/setting" label="Setting" />
            <q-route-tab to="/sales" label="Sales" />
          </q-tabs>
          <q-space />

          <q-btn round flat>
            <q-avatar size="42px" class="q-mb-sm float-right cursor-pointer" @click="menu != menu">
              <img src="@/assets/dummy_profile_90x90.ee6508f9.png" alt="default profile" style="border-radius: 50%">
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
                    <img src="https://cdn.quasar.dev/img/avatar4.jpg">
                  </q-avatar>

                  <div class="text-subtitle1 q-mt-md q-mb-xs">{{ user.name }}</div>

                  <q-btn color="primary" label="Logout" push size="sm" v-close-popup @click="handleLogout" />
                </div>
              </div>
            </q-menu>
          </q-btn>
          {{ user.name }}
        </q-toolbar>
      </q-header>
      
      <!-- Left Sider -->
      <q-drawer
        v-model="drawer"
        show-if-above
        :width="60"
        bordered
      >
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
        <q-page padding>
          <router-view></router-view>
        </q-page>
      </q-page-container>
    </q-layout>

    <div v-else class="fit row justify-center items-center">
      <div class="q-mb-xl">
        <img src="@/assets/login.svg" alt="login_image">
      </div>
      <router-view></router-view>
    </div>
  </div>

</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Methods } from '@/mixins';
import Login from '@/views/auth/Login.vue';

import { ApiResponse } from '@/types';
import { yogurtAlert } from '@/util';

const authNamespace = 'auth';

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
      bluetooth: true
    };
  }

  get user() {
    return this.$store.getters[`${authNamespace}/getUser`];
  }

  get primaryColor() {
    return this.$store.state.primaryColor;
  }

  async handleLogout() {
    const result: ApiResponse = await this.$store.dispatch(`${authNamespace}/handleLogout`);

    if(!result.success) {
      yogurtAlert(result.message);
      return;
    }

    yogurtAlert(result.message);
    this.$router.push({ path: '/login' });
  }
}
</script>

<style scoped>
  .q-layout__section--marginal {
    background-color: aliceblue
  }
</style>
