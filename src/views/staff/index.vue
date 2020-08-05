<template>
  <div class="q-pa-lg">
    <PageTitle text="강사 관리" />

    <div class="q-mb-xl text-weight-bold">총 {{ staffs.length }}명</div>

    <div class="q-pl-xl q-pr-xl row q-col-gutter-lg">
      <div v-if="!staffs.length">Please add staff.</div>
      <div class="col-12 col-md-3" v-for="(staff, index) in staffs" :key="`xl-${index}`">
        <StaffCard :staff="staff" />
      </div>
    </div>

    <q-page-sticky position="bottom-right" :offset="[55, 55]">
      <q-btn fab icon="edit" color="red" @click="routerTo('/staff/create')"></q-btn>
    </q-page-sticky>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import PageTitle from '@/components/base/PageTitle.vue';
import StaffCard from '@/components/staff/StaffCard.vue';

const namespace = 'staff';

@Component({
  components: {
    StaffCard,
    PageTitle
  },
})
export default class Staff extends Vue {
  get primaryColor() {
    return this.$store.state.primaryColor;
  }

  get staffs() {
    return this.$store.getters[`${namespace}/getStaffs`];
  }

  async created() {
    await this.getStaffs();
  }

  async getStaffs() {
    await this.$store.dispatch(`${namespace}/getStaffs`);
  }
}
</script>
