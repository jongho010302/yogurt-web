<template>
  <div>
    <div class="row q-mb-lg">
      <img src="@/assets/logo.jpg" width="40" />
      <span class="text-h5 text-weight-bold">서울숲 필라테스</span>
    </div>
    <q-input
      v-model="username"
      placeholder="아이디"
      outlined
      dense
      class="q-mb-sm"
      style="width: 500px;"
    />
    <q-input
      v-model="password"
      placeholder="비밀번호"
      outlined
      dense
      type="password"
      class="q-mb-md"
      style="width: 500px;"
      @keyup.enter="logIn"
    />
    <q-btn
      label="로그인"
      :color="primaryColor"
      class="q-mb-lg"
      style="width: 500px;"
      @click="logIn"
    />
    <q-separator class="q-mb-lg" />
    <div>
      <span> <q-icon name="lock_open" size="sm" />계정을 잊으셨나요? </span>
      <span class="float-right text-primary">
        <a @click="routerTo('/find/password')">비밀번호 재설정</a> ·
        <a @click="routerTo('/find/masking-username')">아이디 찾기</a>
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Methods } from '@/mixins';

const namespace = 'auth';

@Component
export default class Login extends mixins(Methods) {
  data() {
    return {
      username: 'jongho010302',
      password: 'Wldms0302!',
    };
  }

  get primaryColor() {
    return this.$store.state.primaryColor;
  }

  async logIn() {
    await this.$store.dispatch(`${namespace}/logIn`, {
      username: this.$data.username,
      password: this.$data.password,
    });
  }
}
</script>

<style scoped>
a:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>
