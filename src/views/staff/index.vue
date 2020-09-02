<template>
  <div class="padded">
    <h3>강사 관리</h3>

    <div class="q-mb-xl text-weight-bold">총 {{ staffs.length }}명</div>

    <div class="q-pl-xl q-pr-xl row q-col-gutter-lg">
      <div v-if="!staffs.length">Please add staff.</div>
      <div class="col-12 col-md-3" v-for="(staff, index) in staffs" :key="`xl-${index}`">
        <StaffCard :staff="staff" />
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
import StaffCard from '@/components/staff/StaffCard.vue';

const namespace = 'staff';

@Component({
  components: {
    StaffCard,
  },
})
export default class Staff extends Vue {
  data() {
    return {
      icon: 'add',
    };
  }

  get primary() {
    return this.$store.state.primary;
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
