<template>
  <div>
    <div class="row" :style="ticketStyle">
      <div class="col-2"></div>
      <div v-if="ticket" class="col-6">
        <div class="q-mb-lg q-mt-lg text-caption text-white">수강권 > 수강권 상세보기</div>

        <div class="q-mb-lg q-mt-lg text-h4 text-weight-bold text-white">{{ ticket.title }}</div>

        <div class="q-mb-lg q-mt-lg q-gutter-x-md">
          <q-btn color="white" size="sm" class="text-blue text-weight-bold" @click="edit">수정</q-btn>
          <q-btn color="white" size="sm" class="text-blue text-weight-bold">판매 정지</q-btn>
          <q-btn color="white" size="sm" class="text-blue text-weight-bold">수강권 일괄 연장</q-btn>
        </div>

        <div class="q-mb-lg q-mt-lg text-h6 text-white">판매가 {{ numberCommaFormat(ticket.price) }}원</div>
      </div>
      <div class="col-2"></div>
    </div>

    <div class="row">
      <div class="col-2"></div>
      <div class="col-6">
        <div style="max-width: 600px">
          <q-tabs
            v-model="tab"
            active-color="primary"
            align="justify"
            narrow-indicator
            class="q-mb-lg"
          >
            <q-tab name="issuedTicket" label="발급된 수강권" />
            <q-tab name="availableClass" label="이 수강권으로 수강 가능한 클래스" />
          </q-tabs>

          <div class="q-gutter-y-sm">
            <q-tab-panels v-model="tab" animated transition-prev="scale" transition-next="scale">
              <q-tab-panel name="issuedTicket">
                <q-table :data="ticket" :columns="columns" color="primary" row-key="name" />
              </q-tab-panel>

              <q-tab-panel name="availableClass">
                <div class="text-h6">Alarms</div>Ad molestiae non facere animi nobis, similique nemo velit reiciendis corporis impedit nam in.
              </q-tab-panel>
            </q-tab-panels>
          </div>
        </div>
      </div>
      <div class="col-2"></div>
    </div>
    {{ ticket }}
  </div>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Methods } from '@/mixins';
import { Ticket } from '@/store/ticket/types';

const namespace = 'ticket';

@Component
export default class TicketDetail extends mixins(Methods) {
  data() {
    return {
      tab: 0,
      tabPannel: 0,
      columns: [
        {
          name: 'name',
          required: true,
          label: '회원',
          align: 'center',
          field: (row: any) => row.name,
          sortable: true,
        },
        { name: 'phone', align: 'center', label: '전화번호', field: 'phone' },
        {
          name: 'lessonDate',
          align: 'center',
          label: '수업일시',
          field: 'lessonDate',
        },
        { name: 'entry', align: 'center', label: '잔여 횟수', field: 'entry' },
      ],
    };
  }

  get primaryColor() {
    return this.$store.state.primaryColor;
  }

  get ticketStyle() {
    return this.$store.state.ticketStyle;
  }

  get ticket(): Ticket {
    return this.$store.getters[`${namespace}/getTicket`];
  }

  created() {
    this.getTicket(this.$route.query.id.toString());
  }

  getTicket(id: string) {
    this.$store.dispatch(`${namespace}/getTicket`, {
      id,
    });
  }

  edit() {
    console.log(this.$data.tab);
  }
}
</script>

<style>
</style>
