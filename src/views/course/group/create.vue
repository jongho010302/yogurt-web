<template>
  <div>
    <!-- Header -->
    <div class="create-header">
      <div class="create-header-block">
        <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 12px;">
          <el-breadcrumb-item :to="{ path: '/schedule' }">일정</el-breadcrumb-item>
          <el-breadcrumb-item>수강권등록</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="create-header-block__title">
          <h3>수강권 생성</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

// const namespace = 'lecture';

@Component
export default class TicketCard extends Vue {
  data() {
    return {};
  }
}
</script>

<style></style>
