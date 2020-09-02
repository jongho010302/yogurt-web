<template>
  <div class="padded">
    <h3>총 {{ tickets.length }}개의 수강권</h3>
    <div class="product-list">
      <div v-for="(ticket, index) in tickets" :key="index">
        <TicketCard :ticket="ticket" />
      </div>
    </div>

    <div class="floating-action-button">
      <div class="plus" @click="$router.push('/ticket/create')">+</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import TicketCard from '@/components/ticket/TicketCard.vue';

const namespace = 'ticket';

@Component({
  components: {
    TicketCard,
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

<style>
.product-list {
  display: grid;
  grid-template-columns: 256px;
  grid-gap: 10px;
  place-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}
@media only screen and (min-width: 572px) {
  .product-list[data-v-e56f1a3a] {
    grid-template-columns: repeat(2, 256px);
    grid-gap: 20px;
  }
}
@media only screen and (min-width: 888px) {
  .product-list {
    grid-template-columns: repeat(3, 256px);
    grid-gap: 20px;
  }
}
@media only screen and (min-width: 1164px) {
  .product-list {
    grid-template-columns: repeat(4, 256px);
    grid-gap: 20px;
  }
}
</style>
