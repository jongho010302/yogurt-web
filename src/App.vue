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
            <q-avatar
              size="42px"
              class="q-mb-sm float-right cursor-pointer"
              @click="menu != menu"
            >
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

                  <div class="text-subtitle1 q-mt-md q-mb-xs">
                    {{ user.name }}
                  </div>

                  <q-btn
                    color="primary"
                    label="로그아웃"
                    push
                    size="sm"
                    v-close-popup
                    @click="logOut"
                  />
                </div>
              </div>
            </q-menu>
          </q-btn>
          {{ user.name }}
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

<style global>
.q-tab__content {
  min-width: 70px !important;
}
.container {
  padding: 60px 80px 120px;
}
.content-header {
  background: rgba(248, 249, 250, 0.5);
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
  width: 100%;
}
.content-header__inner {
  padding: 72px;
  padding-top: 50px;
  padding-bottom: 30px;
}
.content-title {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.content-title h3 {
  font-size: 28px;
  font-weight: 700;
  margin: 12px 8px;
}
.product-form {
  display: grid;
  grid-row-gap: 30px;
  padding: 60px 80px 120px;
  margin: auto;
}
.form-block {
  display: grid;
  grid-template-columns: 60px 1fr;
  color: #343a40;
  font-size: 15px;
  font-weight: 700;
}
.form-block__index {
  width: 60px;
}
.form-block__content {
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  padding-bottom: 30px;
}
.form-block__label {
  display: grid;
  grid-template-columns: 1fr 210px;
  grid-gap: 24px;
  margin-bottom: 12px;
}
.form-block__label__title {
  display: flex;
  flex-direction: row;
}
.form-block__label__check {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
.form-block__label {
  display: grid;
  grid-template-columns: 1fr 210px;
  grid-gap: 24px;
  margin-bottom: 12px;
}
.form-block__inputs {
  display: flex;
}
.custom-radio-group {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  margin: 10px 0;
}
.custom-radio-group label:first-child {
  border-width: 1px;
  border-radius: 4px 0 0 4px;
}
.custom-radio-group label:last-child {
  border-radius: 0 4px 4px 0;
}
.custom-radio-group label {
  border: solid #64aeff;
  border-width: 1px 1px 1px 0;
  color: #64aeff;
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
  padding: 7px;
  text-align: center;
  width: 100%;
  margin: 0;
  transition: background 0.2s;
}
.custom-radio-group label.active {
  background: #64aeff;
  color: #fff;
}
.bottom-action-bar {
  position: fixed;
  bottom: 0px;
  left: 56px;
  right: 0px;
  padding-left: 24px;
  padding-right: 24px;
  background-color: #64aeff;
  width: 97%;
  height: 60px;
  z-index: 1;
  display: flex;
  align-items: center;
  color: white;
}
</style>

<style global>
.v-modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  background: #000;
  z-index: 2023;
}
.el-dialog__wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  margin: 0;
}
.el-dialog__wrapper h3 {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
}
.el-dialog__wrapper h5 {
  margin: 0;
  font-size: 14px;
  font-weight: 700;
}
.el-dialog__wrapper a {
  color: #343a40;
}
.create-lesson-modal {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.el-dialog {
  width: 90%;
  max-width: 368px;
  position: relative;
  margin: 0 auto 50px;
  background: #fff;
  border-radius: 2px;
  box-sizing: border-box;
}
.el-dialog__header {
  padding: 20px;
  padding-bottom: 10px;
}
.create-lesson-modal__title {
  font-size: 36px;
  padding-left: 30px;
}
.el-dialog__headerbtn {
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 0;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 16px;
}
.el-dialog__body {
  padding: 30px 20px;
  color: #606266;
  font-size: 14px;
}
.create-lesson-modal__body {
  box-sizing: border-box;
}
.create-lesson-modal__footer {
  background: rgba(250, 251, 251, 0.5);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 2px;
  margin-top: 15px;
  padding: 15px;
}
</style>
