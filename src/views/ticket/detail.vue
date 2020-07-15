<template>
  <div>
    <div class="row" :style="ticketStyle">
      <div class="col-2"></div>
      <div v-if="ticketDetail.ticket" class="col-6">
        <div class="q-mb-lg q-mt-lg text-caption text-white">수강권 > 수강권 상세보기</div>

        <div class="q-mb-lg q-mt-lg text-h4 text-weight-bold text-white">{{ ticketDetail.ticket.lectureTitle }}</div>

        <div class="q-mb-lg q-mt-lg q-gutter-x-md">
          <q-btn color="white" class="text-blue text-weight-bold" @click="edit">수정</q-btn>
          <q-btn color="white" class="text-blue text-weight-bold">판매 정지</q-btn>
          <q-btn color="white" class="text-blue text-weight-bold">수강권 일괄 연장</q-btn>
        </div>

        <div class="q-mb-lg q-mt-lg text-h6 text-white">판매가 {{ numberCommaFortmat(ticketDetail.ticket.price) }}원</div>
      </div>
      <div class="col-2"></div>
    </div>
      
    <div class="row">
      <div class="col-2"></div>
      <div class="col-6">
        <div style="max-width: 600px">
          <q-tabs
            v-model="tab"
            align="justify"
            narrow-indicator
            class="q-mb-lg"
          >
            <q-tab class="text-primary" name="issuedTicket" label="발급된 수강권" />
            <q-tab class="text-primary" name="availableClass" label="이 수강권으로 수강 가능한 클래스" />
          </q-tabs>

          <div class="q-gutter-y-sm">
            <q-tab-panels
              v-model="tab"
              animated
              transition-prev="scale"
              transition-next="scale"
            >
              <q-tab-panel name="issuedTicket">
                <q-table
                  :data="ticketDetail"
                  :columns="columns"
                  color="primary"
                  row-key="name"
                />
              </q-tab-panel>

              <q-tab-panel name="availableClass">
                <div class="text-h6">Alarms</div>
                Ad molestiae non facere animi nobis, similique nemo velit reiciendis corporis impedit nam in.
              </q-tab-panel>
            </q-tab-panels>
          </div>
        </div>
      </div>
      <div class="col-2"></div>
    </div>
    {{ ticketDetail }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

const namespace = 'ticket';

@Component
export default class Ticket extends Vue {
  data() {
    return {
      tab: 0,
      tabPannel: 0,
      columns: [
        { name: 'name', required: true, label: '회원', align: 'center', field: (row: any) => row.name, sortable: true },
        { name: 'phone', align: 'center', label: '전화번호', field: 'phone' },
        { name: 'lessonDate', align: 'center', label: '수업일시', field: 'lessonDate' },
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

  get ticketDetail() {
    return this.$store.getters[`${namespace}/getTicketDetail`];
  }

  created() {
    this.loadTicketDetail(this.$route.query.id.toString());
  }

  loadTicketDetail(id: string) {
    this.$store.dispatch(`${namespace}/loadTicketDetail`, {
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
