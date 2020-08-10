<template>
  <div>
    <div class="row q-mb-lg">
      <span class="text-h5 text-weight-bold">아이디 찾기</span>
    </div>

    <div v-if="!usernames.length">
      <div class="q-mb-lg">이름을 입력해 주세요.</div>

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
        style="width: 250px; height: 40px"
        @click="routerTo('/login')"
      />
      <q-btn
        label="아이디 찾기"
        color="primary"
        class="q-mb-lg"
        style="width: 250px; height: 40px"
        @click="findMaskingUsername"
      />
    </div>

    <div v-else>
      <div>
        '전다연'님의 이름으로 찾은 아이디이며, 동명이인의 아이디가 검색될 수
        있습니다. 정확한 아이디가 기억나지 않으실 경우 '문자로 확인하기'를
        클릭해주세요.
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Methods } from '@/mixins';
import { ApiResponse } from '@/types';
import { yogurtAlert } from '@/util';

const namespace = 'auth';

@Component
export default class FindMaskingUsername extends mixins(Methods) {
  data() {
    return {
      name: '',
      usernames: [],
    };
  }

  async findMaskingUsername() {
    if (!this.$data.name) {
      yogurtAlert('이름을 입력해 주세요.');
      return;
    }

    const res: ApiResponse = await this.$store.dispatch(
      `${namespace}/findMaskingUsername`,
      {
        name: this.$data.name,
      },
    );

    if (!res.success) {
      return;
    }

    this.$data.usernames = res.data;
  }
}
</script>
