<template>
  <div>
    <div class="auth__header">
      <h5>아이디 찾기</h5>
    </div>

    <div class="auth__form-description">
      <p>이메일 입력 시 해당 이메일로 아이디가 전송됩니다.</p>
    </div>

    <div class="auth__input-group">
      <el-input v-model="email" placeholder="이메일" />
    </div>

    <div class="auth__button-group">
      <el-button type="info" @click="routerTo('/login')">로그인 화면으로</el-button>
      <el-button type="primary" @click="findUsername">아이디 찾기</el-button>
    </div>
  </div>
</template>
<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Methods } from '@/mixins';
import router from '@/router';
import './auth.css';

const namespace = 'user';

@Component
export default class FindUsername extends mixins(Methods) {
  data() {
    return {
      email: '',
    };
  }

  async findUsername() {
    try {
      await this.$store.dispatch(`${namespace}/findUsername`, {
        email: this.$data.email,
      });
      await router.push('/login');
    } catch (err) {
      console.error(err);
    }
  }
}
</script>
