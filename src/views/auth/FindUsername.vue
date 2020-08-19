<template>
  <div>
    <p class="q-mb-lg text-h5 text-weight-bold">아이디 찾기</p>

    <p class="q-mb-lg">이메일 입력 시 해당 이메일로 아이디가 전송됩니다.</p>
    <div>
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
        label="아이디 찾기"
        color="primary"
        class="q-mb-lg"
        style="width: 250px; height: 40px;"
        @click="findUsername"
      />
    </div>
  </div>
</template>
<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Methods } from '@/mixins';
import router from '@/router';

const namespace = 'auth';

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
    } catch (err) {}
  }
}
</script>
