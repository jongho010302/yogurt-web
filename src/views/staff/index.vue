<template>
  <div class="q-pa-lg">
    <div class="text-h5 text-weight-bolder q-mb-sm">스태프 관리</div>

    <div class="q-mb-xl text-weight-bold">총 인원: {{ staffList.length }}명</div>

    <div class="row q-col-gutter-lg">
      <div class="col-3" v-for="(staff, index) in staffList" :key="`xl-${index}`">
        <StaffCard :staff="staff" />
      </div>
    </div>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="edit" :color="primaryColor" @click="routerTo('/staff/create')"><span style="margin-left: 10px">강사 등록</span></q-btn>
    </q-page-sticky>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import StaffCard from '../../components/Staff/StaffCard.vue';

import { ApiResponse } from '../../types';
import { yogurtAlert } from '../../assets/common';

const namespace = 'staff';

@Component({
  components: {
    StaffCard,
  },
})
export default class Staff extends Vue {
  data() {
    return {
      staffList: [],
    };
  }

  get primaryColor() {
    return this.$store.state.primaryColor;
  }

  async created() {
    await this.loadStaffList();
  }

  async loadStaffList() {
    const result: ApiResponse = await this.$store.dispatch(`${namespace}/loadStaffList`);

    if(!result.success) {
      yogurtAlert(result.message);
      return;
    }

    this.$data.staffList = result.data;
  }
}
</script>
