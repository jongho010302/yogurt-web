<template>
  <div class="q-pa-lg">
    <div class="text-h6 text-weight-bold">총 {{ ticketList.length }}개의 수강권</div>
    <div class="row q-col-gutter-lg">
      <div class="col-3" v-for="(ticket, index) in ticketList" :key="`xl-${index}`">
        <TicketCard :ticket="ticket" />
      </div>
    </div>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="edit" :color="primaryColor" @click="routerTo('/ticket/create')"><span style="margin-left: 10px">수강권 등록</span></q-btn>
    </q-page-sticky>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import TicketCard from '../../components/Ticket/TicketCard.vue';

const namespace = 'ticket';

@Component({
  components: {
    TicketCard,
  },
})
export default class Ticket extends Vue {
  data() {
    return {

    };
  }
  
  get primaryColor() {
    return this.$store.state.primaryColor;
  }
  
  get ticketList() {
    return this.$store.getters[`${namespace}/getTicketList`];
  }

  created() {
    this.loadTicketList();
  }

  loadTicketList() {
    this.$store.dispatch(`${namespace}/loadTicketList`);
  }
}
</script>

<style>

</style>
