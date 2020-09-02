<template>
  <div>
    Setting
    <el-button type="text" @click="dialogVisible = true">click to open the Dialog</el-button>

    <el-dialog :visible.sync="dialogVisible" width="30%">
      <span>This is a message</span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

// const namespace = 'schedule';

@Component
export default class Schedule extends Vue {
  data() {
    return {
      dialogVisible: false,
    };
  }
}
</script>
