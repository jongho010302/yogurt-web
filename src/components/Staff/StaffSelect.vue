<template>
  <el-select v-model="staff" placeholder="강사 전체" style="width: 140px" @change="onChange">
    <el-option
      v-for="item in staffOptions"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    ></el-option>
  </el-select>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { StaffData } from '@/store/staff/types';

const namespace = 'staff';

@Component
export default class StaffSelect extends Vue {
  data() {
    return {
      staff: null,
    };
  }

  get staffOptions() {
    const staffs: StaffData = this.$store.getters[`${namespace}/getStaffs`];
    if (staffs.data) {
      return staffs.data.map((staff) => ({
        label: staff.user.name,
        value: staff.id,
      }));
    }
  }

  async created() {
    await this.getStaffs();
  }

  async getStaffs() {
    await this.$store.dispatch(`${namespace}/getStaffs`);
  }

  onChange(staffId: string) {
    this.$emit('onChange', staffId);
  }
}
</script>

<style>
</style>