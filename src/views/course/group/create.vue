<template>
  <div>
    <!-- Header -->
    <div class="content-header">
      <div class="content-header__inner">
        <q-breadcrumbs align="left" style="margin-bottom: 12px;">
          <q-breadcrumbs-el label="수강권" />
          <q-breadcrumbs-el label="수강권등록" />
        </q-breadcrumbs>
        <div class="content-title">
          <h3>수강권 생성</h3>
          <q-select
            v-model="classType"
            :options="classTypeOptions"
            color="primary"
            outlined
            dense
            style="margin-left: 8px;"
          />
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
