<template>
  <div @click="routerTo(`/ticket/detail/${ticket.id}`)">
    <el-card class="ticket-card cursor-pointer" :body-style="{ padding: '0px' }">
      <div class="ticket-card__contents">
        <div class="ticket-card__header">횟수제 · {{ ticketClassType }} · {{ ticket.maxTrainee }}:1</div>
        <div class="ticket-card__body">{{ ticket.title }}</div>
        <div class="ticket-card__footer">{{ ticket.availableDays }}일 {{ ticket.maxCoupon }}회</div>
      </div>

      <div class="ticket-card__action">
        <div class="text-body2 text-weight-bold">판매 금액 {{ numberCommaFormat(ticket.price) }}원</div>
        <div class="text-caption">회당 가격 {{ numberCommaFormat(ticket.price / ticket.maxCoupon) }}원</div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { Methods } from '@/mixins';
import { Ticket } from '@/store/ticket/types';

@Component
export default class TicketCard extends mixins(Methods) {
  @Prop() ticket!: Ticket;

  data() {
    return {};
  }

  get ticketClassType() {
    if (this.ticket.classType === 'GROUP') {
      return '그룹형';
    } else if (this.ticket.classType === 'PRIVATE') {
      return '개인형';
    }
  }
}
</script>

<style>
.ticket-card {
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  width: 256px;
}
.ticket-card__contents {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 144px;
  padding: 12px;
  color: #fff;
  background-image: linear-gradient(#b7e9f7, #87cefa);
}
.ticket-card__header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
  font-size: 12px;
  font-weight: 400;
}
.ticket-card__body {
  display: flex;
  flex: 1;
  align-items: flex-start;
  -webkit-box-direction: normal;
  font-size: 18px;
  font-weight: 500;
}
.ticket-card__footer {
  font-size: 12px;
}
.ticket-card__action {
  padding: 12px;
}
</style>