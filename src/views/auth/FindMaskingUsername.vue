<template>
  <div>
    <div class="auth__header">
      <h2>아이디 찾기</h2>
    </div>

    <div class="auth__form">
      <div v-if="!maskingUsernames">
        <div class="auth__form-description">
          <p>이름을 입력해 주세요.</p>
        </div>

        <div class="auth__input-group">
          <el-input v-model="name" placeholder="이름" />
        </div>

        <div class="auth__button-group">
          <el-button type="info" @click="routerTo('/login')">로그인 화면으로</el-button>
          <el-button type="primary" @click="findMaskingUsername">아이디 찾기</el-button>
        </div>
      </div>

      <div v-else>
        <div>
          '{{ name }}'님의 이름으로 찾은 아이디이며, 동명이인의 아이디가 검색될 수
          있습니다.
        </div>
        <div>정확한 아이디가 기억나지 않으실 경우 '이메일로 확인하기'를 클릭해주세요.</div>

        <hr />

        <div v-for="(maskingUsername, index) in maskingUsernames" :key="index">
          <div>{{ maskingUsername }}</div>
        </div>

        <div class="auth__button-group" style="margin-top: 20px;">
          <el-button type="info" @click="routerTo('/login')">로그인 화면으로</el-button>
          <el-button type="primary" @click="routerTo('/find/username')">이메일로 확인하기</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Methods } from '@/mixins';
import { warningAlert } from '@/util/ui';
import './auth.css';

const namespace = 'user';

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
    } catch (err) {
      console.error(err);
    }
  }
}
</script>
