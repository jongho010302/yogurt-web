<template>
  <div>
    <div class="auth__header">
      <h2>비밀번호 재설정</h2>
    </div>

    <div v-if="status === 'init'" class="auth__form">
      <div class="auth__form-description">
        <p>이메일 입력 시 비밀번호 변경 인증번호가 전송됩니다.</p>
      </div>

      <div class="auth__input-group">
        <el-input v-model="email" placeholder="이메일" />
      </div>

      <div class="auth__button-group">
        <el-button type="info" @click="routerTo('/login')">로그인 화면으로</el-button>
        <el-button type="primary" @click="sendFindPasswordCode">비밀번호 변경 링크 받기</el-button>
      </div>
    </div>

    <div v-if="status === 'send'" class="auth__form">
      <div class="auth__form-description">
        <p>인증번호를 입력해 주세요.</p>
      </div>

      <div class="auth__input-group">
        <el-input v-model="verifyCode" placeholder="인증코드" />
      </div>

      <div class="auth__button-group">
        <el-button type="info" @click="routerTo('/login')">로그인 화면으로</el-button>
        <el-button type="primary" @click="verifyFindPasswordCode">인증하기</el-button>
      </div>
    </div>

    <div v-if="status === 'verified'" class="auth__form">
      <div class="auth__contents-description">
        <p>변경할 비밀번호를 입력해 주세요.</p>
      </div>

      <div class="auth__input-group">
        <el-input v-model="password" type="password" placeholder="비밀번호" />
        <el-input
          v-model="secondPassword"
          type="password"
          placeholder="다시 입력해 주세요."
          style="margin-top: 5px"
        />
      </div>
      <div class="auth__button-group">
        <el-button type="info" @click="routerTo('/login')">로그인 화면으로</el-button>
        <el-button type="primary" @click="handleChangePassword">로그인 화면으로</el-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Methods } from '../../mixins';
import { warningAlert } from '@/util/ui';
import router from '@/router';
import './auth.css';

const namespace = 'user';

@Component
export default class Login extends mixins(Methods) {
  data() {
    return {
      status: 'init',
      email: '',
      verifyCode: '',
      password: '',
      secondPassword: '',
    };
  }

  async sendFindPasswordCode() {
    if (!this.$data.email) {
      warningAlert('이메일을 입력해 주세요.');
      return;
    }

    await this.$store.dispatch(`${namespace}/sendFindPasswordCode`, {
      email: this.$data.email,
    });
    this.$data.status = 'send';
  }

  async verifyFindPasswordCode() {
    if (!this.$data.verifyCode) {
      warningAlert('인증코드를 입력해 주세요.');
      return;
    }

    await this.$store.dispatch(`${namespace}/verifyFindPasswordCode`, {
      email: this.$data.email,
      verifyCode: this.$data.verifyCode,
    });
    this.$data.status = 'verified';
  }

  async handleChangePassword() {
    if (!this.$data.password) {
      warningAlert('비밀번호를 입력해 주세요.');
      return;
    } else if (!this.$data.secondPassword) {
      warningAlert('비밀번호를 입력해 주세요.');
      return;
    } else if (!(this.$data.password === this.$data.secondPassword)) {
      warningAlert('비밀번호가 다릅니다.');
      return;
    }

    try {
      await this.$store.dispatch(`${namespace}/changePassword`, {
        email: this.$data.email,
        password: this.$data.password,
        verifyCode: this.$data.verifyCode,
      });
      await router.push('/login');
    } catch (err) {
      console.error(err);
    }
  }
}
</script>

