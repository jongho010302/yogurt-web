<template>
  <div class="create-form-block__course-detail">
    {{ day }}
    <el-time-select
      v-model="classStartTime"
      align="center"
      :clearable="false"
      :picker-options="{
        start: '00:00',
        step: '00:05',
        end: '23:55'
      }"
      style="width: 120px;"
    ></el-time-select>
    <span style="margin: 0 5px; font-size: 20px">~</span>
    <el-time-select
      v-model="classEndTime"
      align="center"
      :clearable="false"
      :picker-options="{
        start: '00:00',
        step: '00:05',
        end: '23:55'
      }"
      style="width: 120px;"
    ></el-time-select>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component
export default class StaffSelect extends Vue {
  @Prop() value!: [string, string];
  @Prop() day!: string;

  get classStartTime() {
    return this.value[0];
  }

  set classStartTime(val) {
    this.$emit('input', [
      val ? val : '09:00',
      this.value[0] ? this.value[0] : '09:50',
    ]);
  }

  get classEndTime() {
    return this.value[1];
  }

  set classEndTime(val) {
    this.$emit('input', [
      this.value[0] ? this.value[0] : '09:00',
      val ? val : '09:50',
    ]);
  }
}
</script>

<style global>
.create-form-block__course-detail {
  display: grid;
  grid-template-columns: 50px 120px 15px 120px;
  align-items: center;
  margin-top: 10px;
}
</style>