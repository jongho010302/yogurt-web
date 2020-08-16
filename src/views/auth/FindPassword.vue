<template>
  <div>
    <div class="row q-mb-lg">
      <span class="text-h5 text-weight-bold">비밀번호 재설정</span>
    </div>

    <div class="q-mb-lg">
      아이디와 비밀번호 입력 시 해당 계정과 연결된 이메일로 재설정 링크가
      전송됩니다.
    </div>
    <div>
      <q-input
        v-model="username"
        placeholder="아이디"
        outlined
        dense
        class="q-mb-sm"
        style="width: 500px;"
      />
      <q-input
        v-model="email"
        placeholder="이메일"
        outlined
        dense
        class="q-mb-sm"
        style="width: 500px;"
      />
      <q-btn
        label="로그인 화면으로"
        color="grey-9"
        class="q-mb-lg q-mr-sm"
        style="width: 250px; height: 40px;"
        @click="routerTo('/login')"
      />
      <q-btn
        label="비밀번호 변경 링크 받기"
        color="primary"
        class="q-mb-lg"
        style="width: 250px; height: 40px;"
        @click="findPassword"
      />
    </div>
  </div>
</template>
<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Methods } from '../../mixins';

const namespace = 'auth';

@Component
export default class Login extends mixins(Methods) {
  data() {
    return {
      username: '',
      email: '',
    };
  }

  async findPassword() {
    await this.$store.dispatch(`${namespace}/findPassword`, {
      username: this.$data.username,
      email: this.$data.email,
    });
  }
}
</script>
