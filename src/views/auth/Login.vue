<template>
  <div>
    <div class="row q-mb-lg">
      <img src="../../assets/logo.jpg" width="40" /> <span class="text-h5 text-weight-bold">서울숲 필라테스</span>
    </div>
    <q-input v-model="username" placeholder="아이디" outlined dense class="q-mb-sm" style="width: 500px;" />
    <q-input v-model="password" placeholder="비밀번호" outlined dense type="password" class="q-mb-md" style="width: 500px;" @keyup.enter="handleLogin" />
    <q-btn label="로그인" color="primary" class="q-mb-lg" style="width: 500px" @click="handleLogin" />
    <q-separator class="q-mb-lg" />
    <div>
      <span><q-icon name="lock_open" size="sm" />계정을 잊으셨나요?</span>
      <span class="float-right text-primary"><a @click="routerTo('/find/password')">비밀번호 재설정</a> · <a @click="routerTo('/find/username')">아이디 찾기</a></span>
    </div>
  </div>
</template>
<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Methods } from '../../mixins';

import { ApiResponse } from '../../types';
import { yogurtAlert } from '../../assets/common';

const namespace = 'auth';

@Component
export default class Login extends mixins(Methods) {
  data() {
    return {
      username: 'thekireii',
      password: 'Whdghwhdgh0302!',
    };
  }

  get user() {
    return this.$store.getters[`${namespace}/getUser`];
  }

  async handleLogin() {
    const result: ApiResponse = await this.$store.dispatch(`${namespace}/handleLogin`, {
      username: this.$data.username,
      password: this.$data.password,
    });
    
    yogurtAlert(result.message);
    
    if(!result.success) {
      return;
    }

    this.$router.push({ path: '/' });
  }

  routerTo(path: string) {
    this.$router.push({ path });
  }
}

</script>

<style scoped>
  a:hover {
    text-decoration:underline;
    cursor: pointer;
  }
</style>
