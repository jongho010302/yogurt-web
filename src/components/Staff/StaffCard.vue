<template>
  <q-card class="my-card q-pt-md">
    <q-card-section class="text-center">
      <q-avatar
        size="90px"
        class="q-mb-sm cursor-pointer"
        @click="navigateToStaffDetail(staff.id)"
      >
        <img :src="staff.user.profileUrl" alt="default profile" />
      </q-avatar>
      <div class="q-mb-sm text-h6">{{ staff.user.name }}</div>
      <div class="q-mb-md">{{ staff.user.phone }}</div>
      <div class="q-mb-lg">아이디: jongjjang03</div>
      <q-btn outline size="sm" :color="primaryColor" @click="resetPassword"
        >비밀번호 재설정</q-btn
      >
    </q-card-section>

    <q-separator />

    <q-card-actions>
      <q-space></q-space>
      <q-btn color="red" size="sm" @click="handleDeleteStaff">삭제</q-btn>
      <q-btn color="light-blue" size="sm">수정</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { Staff as StaffType } from '@/store/staff/types';
import { yogurtConfirm } from '@/util/common';

const namespace = 'staff';

@Component
export default class TicketCard extends Vue {
  @Prop() staff!: StaffType;

  get primaryColor() {
    return this.$store.state.primaryColor;
  }

  navigateToStaffDetail(id: number) {
    this.$router.push({ path: `/staff/detail?id=${id}` });
  }

  async resetPassword() {
    await this.$store.dispatch(`${namespace}/resetPassword`, {
      userId: this.staff.user.id,
    });
  }

  async handleDeleteStaff() {
    if (!yogurtConfirm('Are you sure want delete staff?')) {
      return;
    }

    await this.$store.dispatch(`${namespace}/deleteStaff`, {
      staffId: this.staff.id,
      userId: this.staff.user.id,
    });

    // Staff reload
    await this.$store.dispatch(`${namespace}/getStaffs`);
  }
}
</script>
