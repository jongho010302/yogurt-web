<template>
  <component :is="layout">
    <slot></slot>
  </component>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import MainLayout from '@/layouts/MainLayout.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';

@Component({
  components: {
    MainLayout,
    AuthLayout,
  },
})
export default class TheLayout extends Vue {
  get layout() {
    return this.$route.meta.layout;
  }
}
</script>
