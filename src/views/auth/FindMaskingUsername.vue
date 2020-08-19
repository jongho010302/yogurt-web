<template>
  <div>
    <p class="q-mb-lg text-h5 text-weight-bold">아이디 찾기</p>

    <div v-if="!maskingUsernames">
      <p class="q-mb-lg">이름을 입력해 주세요.</p>

      <q-input
        v-model="name"
        placeholder="이름"
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
        @click="findMaskingUsername"
      />
    </div>

    <div v-else>
      <div>
        '{{ name }}'님의 이름으로 찾은 아이디이며, 동명이인의 아이디가 검색될 수
        있습니다.
      </div>
      <div>
        정확한 아이디가 기억나지 않으실 경우 '이메일로 확인하기'를 클릭해주세요.
      </div>

      <hr />

      <div v-for="(maskingUsername, index) in maskingUsernames" :key="index">
        <div>{{ maskingUsername }}</div>
      </div>

      <q-btn
        label="로그인 화면으로"
        color="grey-9"
        class="q-mt-lg q-mr-sm"
        style="width: 250px; height: 40px;"
        @click="routerTo('/login')"
      />
      <q-btn
        label="이메일로 확인하기"
        color="primary"
        class="q-mt-lg"
        style="width: 250px; height: 40px;"
        @click="routerTo('/find/username')"
      />
    </div>
  </div>
</template>
<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Methods } from '@/mixins';
import { warningAlert } from '@/util/ui';

const namespace = 'auth';

@Component
export default class FindMaskingUsername extends mixins(Methods) {
  data() {
    return {
      name: '',
    };
  }

  get maskingUsernames() {
    return this.$store.getters[`${namespace}/getMaskingUsernames`];
  }

  async findMaskingUsername() {
    try {
      if (!this.$data.name) {
        warningAlert('이름을 입력해 주세요.');
        return;
      }

      await this.$store.dispatch(`${namespace}/findMaskingUsername`, {
        name: this.$data.name,
      });
    } catch (err) {}
  }
}
</script>

<style scoped>
.p {
  margin: 0;
}
</style>
