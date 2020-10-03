<template>
  <div>
    <div class="auth__header">
      <img src="@/assets/logo.jpg" width="40" />
      <h2>서울숲 필라테스</h2>
    </div>

    <div class="auth__form">
      <div class="auth__input-group">
        <el-input
          v-model="username"
          type="text"
          placeholder="아이디"
          @keyup.enter.native="handleLogin"
        />
        <el-input
          v-model="password"
          type="password"
          placeholder="비밀번호"
          style="margin-top: 5px"
          @keyup.enter.native="handleLogin"
        />
      </div>

      <el-button class="login__form-button" type="primary" @click="handleLogin"
        >로그인</el-button
      >
    </div>

    <hr class="auth__seperator" />

    <div>
      <span class="find__item-1">
        <i class="el-icon-lock find-lock-icon"></i>계정을 잊으셨나요?
      </span>
      <span class="find__item-2">
        <a class="find__item" @click="routerTo('/find/password')"
          >비밀번호 재설정</a
        >
        ·
        <a class="find__item" @click="routerTo('/find/masking-username')"
          >아이디 찾기</a
        >
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Methods } from '@/mixins';
import './auth.css';

const namespace = 'user';

@Component
export default class Login extends mixins(Methods) {
  data() {
    return {
      username: 'jongho.dev',
      password: 'Wldms0302!',
    };
  }

  async handleLogin() {
    try {
      await this.$store.dispatch(`${namespace}/logIn`, {
        username: this.$data.username,
        password: this.$data.password,
      });
      await this.$router.push('/schedule');
    } catch (err) {
      console.error(err);
    }
  }
}
</script>

<style>
.find__item:hover {
  text-decoration: underline;
  cursor: pointer;
}
.find__item-1 i {
  font-size: 20px;
  margin-right: 3px;
}
.find__item-2 {
  float: right;
  color: #409eff;
}
</style>
