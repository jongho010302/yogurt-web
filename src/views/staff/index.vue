<template>
  <div class="padded">
    <h2>직원 관리</h2>
    <p v-if="staffs.data">총 {{ staffs.data.length }}명</p>

    <!-- 수강권 로딩 후 : 데이터가 있을 경우 -->
    <div v-if="staffsSuccess && staffs.data.length" class="staff-list">
      <StaffCard
        v-for="(staff, index) in staffs.data"
        :key="index"
        :staff="staff"
        style="width: 100%"
      />
    </div>

    <!-- 수강권 로딩 후 : 데이터가 없을 경우 -->
    <div v-if="staffsSuccess && !staffs.data.length">직원을 등록해주세요.</div>

    <!-- 수강권 로딩 중 -->
    <div v-if="staffsWaiting" class="staff-list">
      <div v-for="(dummy, index) in Array(20).fill(1)" :key="index">
        <Skeleton width="220px" height="238px" />
        <Skeleton width="220px" height="42px" />
      </div>
    </div>

    <div class="floating-action-button">
      <div class="plus" @click="$router.push('/staff/create')">+</div>
    </div>
  </div>
</template>
 
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Skeleton } from 'vue-loading-skeleton';
import StaffCard from '@/components/staff/StaffCard.vue';
import { AsyncStatus } from '@/store/types';

const namespace = 'staff';

// @ts-ignore
@Component({
  components: {
    StaffCard,
    Skeleton,
  },
})
export default class Staff extends Vue {
  data() {
    return {
      icon: 'add',
    };
  }

  get staffs() {
    return this.$store.getters[`${namespace}/getStaffs`];
  }

  get staffsWaiting() {
    return this.staffs.status === AsyncStatus.WAITING;
  }

  get staffsSuccess() {
    return this.staffs.status === AsyncStatus.SUCCESS;
  }

  async created() {
    await this.getStaffs();
  }

  async getStaffs() {
    await this.$store.dispatch(`${namespace}/getStaffs`);
  }
}
</script>

<style scoped>
.staff-list {
  display: grid;
  grid-template-columns: 220px;
  grid-gap: 10px;
  place-items: center;
  justify-content: center;
}
@media only screen and (min-width: 572px) {
  .staff-list {
    grid-template-columns: repeat(2, 220px);
    grid-gap: 20px;
  }
}
@media only screen and (min-width: 888px) {
  .staff-list {
    grid-template-columns: repeat(3, 220px);
    grid-gap: 20px;
  }
}
@media only screen and (min-width: 1160px) {
  .staff-list {
    grid-template-columns: repeat(4, 220px);
    grid-gap: 20px;
  }
}
@media only screen and (min-width: 1400px) {
  .staff-list {
    grid-template-columns: repeat(5, 220px);
    grid-gap: 20px;
  }
}
@media only screen and (min-width: 1680px) {
  .staff-list {
    grid-template-columns: repeat(6, 220px);
    grid-gap: 20px;
  }
}
</style>
