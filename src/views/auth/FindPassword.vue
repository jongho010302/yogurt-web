<template>
  <div>
    <p class="q-mb-lg text-h5 text-weight-bold">비밀번호 재설정</p>

    <div v-if="status === 'init'">
      <p class="q-mb-lg">이메일 입력 시 비밀번호 변경 인증번호가 전송됩니다.</p>

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
        @click="sendFindPasswordCode"
      />
    </div>

    <div v-if="status === 'send'">
      <p class="q-mb-lg">인증번호를 입력해 주세요.</p>

      <q-input
        v-model="verifyCode"
        placeholder="인증코드"
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
        label="인증하기"
        color="primary"
        class="q-mb-lg"
        style="width: 250px; height: 40px;"
        @click="verifyFindPasswordCode"
      />
    </div>

    <div v-if="status === 'verified'">
      <p class="q-mb-lg">변경할 비밀번호를 입력해 주세요.</p>

      <q-input
        v-model="password"
        type="password"
        placeholder="비밀번호"
        outlined
        dense
        class="q-mb-sm"
        style="width: 500px;"
      />
      <q-input
        v-model="secondPassword"
        type="password"
        placeholder="다시 입력해 주세요."
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
        label="변경하기"
        color="primary"
        class="q-mb-lg"
        style="width: 250px; height: 40px;"
        @click="changePassword"
      />
    </div>
  </div>
</template>
<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Methods } from '../../mixins';
import { warningAlert } from '@/util/ui';
import router from '@/router';

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

  async changePassword() {
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
