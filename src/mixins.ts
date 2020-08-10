import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export class Methods extends Vue {
  async routerTo(path: string) {
    this.$router.push({ path });
  }

  numberCommaFormat(inputNumber: number) {
    if (inputNumber === 0 || inputNumber === undefined) {
      return 0;
    }

    return inputNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  notify(configuration: any) {
    // @ts-ignore
    this.$q.notify(configuration);
  }
}
