<template>
  <el-card
    class="staff-card"
    :body-style="{ padding: '0px' }"
    style="border: 0"
  >
    <div
      class="staff-card__content cursor-pointer"
      @click="navigateToStaffDetail(staff.id)"
    >
      <el-avatar
        :src="
          staff.user.profileUrl ||
          'https://seoulforest-image.s3.ap-northeast-2.amazonaws.com/default_profile.png'
        "
        :size="90"
      ></el-avatar>
      <p style="margin-bottom: 10px !important">{{ staff.user.name }}</p>
      <p style="margin-bottom: 8px !important">{{ staff.user.phone }}</p>
      <p style="margin-bottom: 8px !important">
        이메일: {{ staff.user.email }}
      </p>
      <el-button style="color: #409eff" size="mini" @click.stop="resetPassword"
        >비밀번호 재설정</el-button
      >
    </div>

    <div class="staff-card__action">
      <div class="space"></div>
      <el-button type="danger" size="mini" @click="handleDeleteStaff"
        >삭제</el-button
      >
      <el-button type="primary" size="mini">수정</el-button>
    </div>
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { Staff as StaffType } from '@/store/staff/types';
import { yogurtConfirm } from '@/util/ui';

const namespace = 'staff';

@Component
export default class TicketCard extends Vue {
  @Prop() staff!: StaffType;

  navigateToStaffDetail(id: number) {
    this.$router.push({ path: `/staff/detail/${id}` });
  }

  async resetPassword() {
    if (!yogurtConfirm('정말 해당 직원의 비밀번호를 초기화하시겠습니까?')) {
      return;
    }

    await this.$store.dispatch(`${namespace}/resetPassword`, {
      userId: this.staff.user.id,
    });
  }

  async handleDeleteStaff() {
    if (!yogurtConfirm('정말 해당 스태프를 삭제하시겠습니까?')) {
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

<style scoped>
.staff-card {
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  text-align: center;
}
.staff-card__content {
  padding: 16px;
}
.staff-card__action {
  background-color: hsla(0, 0%, 92.2%, 0.3);
  padding: 7px 11px;
  display: flex;
}
</style>
