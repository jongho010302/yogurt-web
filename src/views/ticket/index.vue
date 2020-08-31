<template>
  <div class="q-pa-lg">
    <PageTitle :text="'총 ' + tickets.length + '개의 수강권'" class="q-mb-xl" />
    <div class="row q-col-gutter-lg">
      <div class="col-3" v-for="(ticket, index) in tickets" :key="`xl-${index}`">
        <TicketCard :ticket="ticket" />
      </div>
    </div>

    <q-page-sticky position="bottom-right" :offset="[45, 45]">
      <q-btn
        fab
        :icon="icon"
        color="red"
        @mouseover="icon = 'edit'"
        @mouseout="icon = 'add'"
        @click="$router.push('/ticket/create')"
      ></q-btn>
    </q-page-sticky>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import PageTitle from '@/components/base/PageTitle.vue';
import TicketCard from '@/components/ticket/TicketCard.vue';

const namespace = 'ticket';

@Component({
  components: {
    TicketCard,
    PageTitle,
  },
})
export default class Ticket extends Vue {
  data() {
    return {
      icon: 'add',
    };
  }

  get primary() {
    return this.$store.state.primary;
  }

  get tickets(): Ticket[] {
    return this.$store.getters[`${namespace}/getTickets`];
  }

  created() {
    this.getTickets();
  }

  getTickets() {
    this.$store.dispatch(`${namespace}/getTickets`);
  }
}
</script>

<style></style>
