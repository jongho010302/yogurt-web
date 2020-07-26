<template>
  <div class="q-pa-lg">
    <div class="text-h5 text-weight-bolder q-mb-sm">Manage Staff</div>

    <div class="q-mb-xl text-weight-bold">Total: {{ staffs.length }}</div>

    <div class="row q-col-gutter-lg">
      <div v-if="!staffs.length">
        Please add staff.
      </div>
      <div class="col-2" v-for="(staff, index) in staffs" :key="`xl-${index}`">
        <StaffCard :staff="staff" />
      </div>
    </div>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="edit" :color="primaryColor" @click="routerTo('/staff/create')"><span style="margin-left: 10px">Add staff</span></q-btn>
    </q-page-sticky>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import StaffCard from '../../components/Staff/StaffCard.vue';

const namespace = 'staff';

@Component({
  components: {
    StaffCard,
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
