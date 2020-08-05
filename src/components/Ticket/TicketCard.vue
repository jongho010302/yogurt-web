<template>
  <q-card class="my-card cursor-pointer" @click="routerTo(`/ticket/detail?id=${ticket.id}`)">
    <q-card-section class="text-white" :style="ticketStyle">
      <div class="text-overline">{{ ticket.ticketType }} 수강권</div>
      <div class="text-h6 q-mb-lg">{{ ticket.title }}</div>
      <div class="text-subtitle2">{{ ticket.availableDays }}일 {{ ticket.maxCoupon }}회</div>
    </q-card-section>

    <q-card-actions vertical align="left">
      <div class="text-body2 text-weight-bold">판매 금액 {{  numberCommaFortmat(ticket.price) }}원</div>
      <div class="text-caption">회당 가격 {{ numberCommaFortmat(ticket.price / ticket.maxCoupon) }}원</div>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { Ticket } from '../../store/ticket/types';

@Component
export default class TicketCard extends Vue {
  @Prop() ticket!: Ticket

  data() {
    return {
    };
  }

  get ticketStyle() {
    return this.$store.state.ticketStyle;
  }

  navigateToTicketDetail(id: number) {
    this.$router.push({ path: `/ticket/detail?id=${id}` });
  }
}
</script>
