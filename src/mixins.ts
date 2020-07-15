import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export class Methods extends Vue {
  routerTo(path: string) {
    this.$router.push({ path });
  }
}
