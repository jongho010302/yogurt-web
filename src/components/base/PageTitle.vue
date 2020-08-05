<template>
  <div class="text-h5 text-weight-bolder">{{ text }}</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component
export default class PageTitle extends Vue {
  @Prop() text!: string;
}
</script>
