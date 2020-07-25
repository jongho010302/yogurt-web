<template>
  <q-card class="my-card q-pt-md">
    {{ staff }}
    <!-- <q-card-section class="text-center">
      <q-avatar size="90px" class="q-mb-sm cursor-pointer" @click="navigateToStaffDetail(staff.id)">
        <img :src="staff.profileUrl" alt="default profile">
      </q-avatar>
      <div class="q-mb-sm text-h6">{{ staff.name }}</div>
      <div class="q-mb-md">{{ staff.phone }}</div>
      <q-chip :color="primaryColor" text-color="white" icon="star">{{ staff.staffType.name }}</q-chip>
      <div class="q-mb-lg">아이디: jongjjang03</div>
      <q-btn size="sm" :color="primaryColor" outline @click="resetPassword">비밀번호 재설정</q-btn>
    </q-card-section>

    <q-separator />

    <q-card-actions>
      <q-space></q-space>
      <q-btn color="negative" flat>삭제</q-btn>
      <q-btn :color="primaryColor" flat>수정</q-btn>
    </q-card-actions> -->

  </q-card>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component
export default class TicketCard extends Vue {
  @Prop() staff!: any
  
  get primaryColor() {
    return this.$store.state.primaryColor;
  }

  navigateToStaffDetail(id: number) {
    this.$router.push({ path: `/staff/detail?id=${id}` });
  }

  resetPassword() {
    console.log('1');
  }
}
</script>
