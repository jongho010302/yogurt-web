<template>
  <div>
    <div v-if="user" class="main">
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
          @click="$router.push('/schedule').catch(() => {})"
          style="cursor: pointer"
        />
        <el-menu
          :default-active="activeLink"
          router
          class="el-menu-demo"
          mode="horizontal"
        >
          <el-menu-item index="/schedule">일정</el-menu-item>
          <el-menu-item index="/lecture">수업</el-menu-item>
          <el-menu-item index="/user">회원</el-menu-item>
          <el-menu-item index="/staff">직원</el-menu-item>
          <el-menu-item index="/ticket">수강권</el-menu-item>
          <el-menu-item index="/setting">설정</el-menu-item>
          <el-menu-item index="/sales">매출</el-menu-item>
        </el-menu>
        <div class="space"></div>
        <el-dropdown trigger="click" @command="handleCommand">
          <div class="main__header-profile">
            <el-avatar
              :src="user.profileUrl || defaultProfileUrl"
              :size="35"
              style="margin-right: 5px"
            ></el-avatar>
            <span style="margin-right: 2px"
              ><span style="font-weight: bold">{{ user.name }}님</span>
              {{ user.displayRole }}</span
            >
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

    <!-- Async Loading: Progress Bar -->
    <vue-progress-bar></vue-progress-bar>
  </div>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import { Methods } from '@/mixins';
import Login from '@/views/auth/Login.vue';
import { getAccessToken } from '@/util/storage';
import { defaultProfileUrl } from '@/util/image';
import './css/App.scss';
import './css/CustomElementUI.scss';

const namespace = 'user';

@Component({
  components: {
    Login,
  },
})
export default class App extends mixins(Methods) {
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

  defaultProfileUrl = defaultProfileUrl;

  get user() {
    return this.$store.getters[`${namespace}/getUser`];
  }

  async created() {
    const jwtToken = getAccessToken();
    if (jwtToken) {
      await this.$store.dispatch(`${namespace}/checkUser`);
    }
  }

  async handleLogOut() {
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

<style scoped>
.main {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-columns: 55px calc(100vw - 55px);
  grid-template-rows: auto 1fr;
  grid-template-areas:
    'sider header'
    'sider contents';
  font-family: Noto Sans KR, sans-serif;
}
.main__sider {
  grid-area: sider;
  display: flex;
  align-items: center;
  flex-direction: column;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.1);
  border-right: 1px solid #ebebeb;
  width: 56px;
  z-index: 101;
}
.notification__toggle {
  margin: 20px 10px;
}
.notification__toggle i {
  font-size: 18px;
}
.main__header {
  grid-area: header;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #ebebed;
  align-items: center;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.1);
  z-index: 99;
  height: 60px;
  padding: 0 12px;
}
.main__header .el-menu {
  border-bottom: 0;
}
.main__header-logo {
  margin: 5px 20px;
  border-radius: 50%;
}
.main__header-profile {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.main__contents {
  grid-area: contents;
  overflow-y: auto;
}
.padded {
  padding: 30px;
}
.auth {
  display: flex;
}
.auth__contents {
  display: flex;
  justify-content: center;
  padding-top: 60px;
}
</style>
