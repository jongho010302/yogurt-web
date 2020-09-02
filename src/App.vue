<template>
  <div>
    <div v-if="jwtToken" class="main">
      <!-- Left -->
      <aside class="main__sider">
        <button class="notification__toggle medium">
          <i class="el-icon-bell" />
        </button>
      </aside>

      <!-- Header -->
      <header class="main__header">
        <img
          src="@/assets/logo.jpg"
          width="50"
          class="main__header-logo"
          @click="$router.push('/schedule').catch(()=>{});"
          style="cursor: pointer"
        />
        <el-menu :default-active="tab" class="el-menu-demo" mode="horizontal" router>
          <el-menu-item index="/schedule">일정</el-menu-item>
          <el-menu-item index="/lecture">수업</el-menu-item>
          <el-menu-item index="/user">회원</el-menu-item>
          <el-menu-item index="/staff">강사</el-menu-item>
          <el-menu-item index="/ticket">수강권</el-menu-item>
          <el-menu-item index="/setting">설정</el-menu-item>
          <el-menu-item index="/sales">매출</el-menu-item>
        </el-menu>
        <div class="space"></div>
        <el-dropdown trigger="click" @command="handleCommand">
          <div class="main__header-profile">
            <el-avatar
              :src="user.profileUrl ||'https://seoulforest-image.s3.ap-northeast-2.amazonaws.com/default_profile.png'"
              style="margin-right: 5px"
            ></el-avatar>
            <span style="margin-right: 2px">{{ user.name }}님 {{ user.role }}</span>
            <i class="el-icon-arrow-down"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="mypage">마이페이지</el-dropdown-item>
            <el-dropdown-item command="logout">로그아웃</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </header>

      <!-- Contents -->
      <section class="main__contents">
        <router-view></router-view>
      </section>
    </div>

    <!-- Login -->
    <div v-else>
      <div class="auth">
        <img src="@/assets/login.svg" alt="login_image" style="width: 100%" />
      </div>
      <div class="auth__contents">
        <router-view></router-view>
      </div>
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
      tab: window.location.pathname,
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

  async handleLogOut() {
    console.log(1);
    try {
      await this.$store.dispatch(`${namespace}/logOut`);
      await this.$router.push('/login');
    } catch (err) {
      console.error(err);
    }
  }

  async handleCommand(command: string) {
    if (command === 'mypage') {
      this.$router.push('/staff/me');
    } else if (command === 'logout') {
      await this.handleLogOut();
    }
  }
}
</script>
