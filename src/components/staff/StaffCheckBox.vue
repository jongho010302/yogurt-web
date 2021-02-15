<template>
  <el-dropdown trigger="click">
    <el-button size="mini" style="margin-right: 8px">강사별보기</el-button>
    <el-dropdown-menu slot="dropdown" style="padding: 20px">
      <el-checkbox
        v-model="checkAllInstructors"
        :indeterminate="isIndeterminate"
        @change="onCheckAllInstructorsChange"
        >전체 선택</el-checkbox
      >
      <el-divider></el-divider>
      <el-checkbox-group
        v-model="checkedStaffs"
        @change="onCheckedInstructorsChange"
      >
        <div
          v-for="(value, index) in staffs.data"
          :key="index"
          style="margin-bottom: 6px"
        >
          <el-checkbox :label="value.id">{{ value.name }}</el-checkbox>
        </div>
      </el-checkbox-group>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { StaffData } from '@/store/staff/types';

const namespace = 'staff';

@Component
export default class StaffCheckBox extends Vue {
  @Prop() value!: number[];

  data() {
    return {
      isIndeterminate: true,
      checkAllInstructors: true,
    };
  }

  get checkedStaffs() {
    return this.value;
  }

  set checkedStaffs(val) {
    this.$emit('input', val);
  }

  get staffs(): StaffData {
    return this.$store.getters[`${namespace}/getStaffs`];
  }

  async created() {
    await this.getStaffs();
  }

  async getStaffs() {
    await this.$store.dispatch(`${namespace}/getStaffs`);
    this.onCheckAllInstructorsChange(true);
  }

  onCheckAllInstructorsChange(val: boolean) {
    this.checkedStaffs = val ? this.staffs.data.map((staff) => staff.id) : [];
    this.$data.isIndeterminate = false;
  }

  onCheckedInstructorsChange(value: number[]) {
    const checkedCount = value.length;
    this.$data.checkAllInstructors = checkedCount === this.staffs.data.length;
    this.$data.isIndeterminate =
      checkedCount > 0 && checkedCount < this.staffs.data.length;
  }
}
</script>

<style></style>
