<template>
  <div class="padded">
    <h2 v-if="ticketsSuccess && tickets.data">총 {{ tickets.data.length }}개의 수강권</h2>
    <h2 v-if="ticketsWaiting">수강권 로딩중</h2>

    <div class="product-filter">
      <el-select v-model="isSelling">
        <el-option
          v-for="item in isSellingOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>

      <el-select v-model="classType" style="margin-left: 10px">
        <el-option
          v-for="item in classTypeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>

    <!-- 수강권 로딩 후 : 데이터가 있을 경우 -->
    <div v-if="ticketsSuccess && tickets.data.length" class="product-list">
      <TicketCard
        v-for="(ticket, index) in tickets.data"
        :key="index"
        :ticket="ticket"
        :hideBottom="false"
        style="width: 100%"
      />
    </div>

    <!-- 수강권 로딩 후 : 데이터가 없을 경우 -->
    <div v-if="ticketsSuccess && !tickets.data.length">수강권을 등록해주세요.</div>

    <!-- 수강권 로딩 중 -->
    <div v-if="ticketsWaiting" class="product-list">
      <div v-for="(dummy, index) in (Array(20)).fill(1)" :key="index">
        <Skeleton width="256px" height="170px" />
        <Skeleton width="256px" height="60px" />
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
import { Skeleton } from 'vue-loading-skeleton';
import TicketCard from '@/components/ticket/TicketCard.vue';
import { AsyncStatus } from '@/store/types';
import { Watch } from 'vue-property-decorator';

const namespace = 'ticket';

// @ts-ignore
@Component({
  components: {
    TicketCard,
    Skeleton,
  },
})
export default class Ticket extends Vue {
  data() {
    return {
      icon: 'add',
      isSelling: '',
      isSellingOptions: [
        {
          label: '모든 수강권',
          value: '',
        },
        {
          label: '판매중인 수강권',
          value: true,
        },
        {
          label: '판매중지 수강권',
          value: false,
        },
      ],
      classType: '',
      classTypeOptions: [
        {
          label: '모든 수업',
          value: '',
        },
        {
          label: '그룹형',
          value: 'GROUP',
        },
        {
          label: '프라이빗형',
          value: 'PRIVATE',
        },
      ],
    };
  }

  get tickets() {
    return this.$store.getters[`${namespace}/getTickets`];
  }

  get ticketsWaiting() {
    return this.tickets.status === AsyncStatus.WAITING;
  }

  get ticketsSuccess() {
    return this.tickets.status === AsyncStatus.SUCCESS;
  }

  created() {
    this.getTickets();
  }

  getTickets() {
    this.$store.dispatch(`${namespace}/getTickets`, {
      isSelling: this.$data.isSelling,
      classType: this.$data.classType,
    });
  }

  @Watch('isSelling')
  onIsSellingChange() {
    this.getTickets();
  }

  @Watch('classType')
  onClassTypeChange() {
    this.getTickets();
  }
}
</script>

<style>
.product-filter {
  margin-top: 5px;
  margin-bottom: 20px;
}
.product-list {
  display: grid;
  grid-template-columns: 256px;
  grid-gap: 10px;
  place-items: center;
  justify-content: center;
}
@media only screen and (min-width: 572px) {
  .product-list {
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
@media only screen and (min-width: 1160px) {
  .product-list {
    grid-template-columns: repeat(4, 256px);
    grid-gap: 20px;
  }
}
@media only screen and (min-width: 1400px) {
  .product-list {
    grid-template-columns: repeat(5, 256px);
    grid-gap: 20px;
  }
}
@media only screen and (min-width: 1680px) {
  .product-list {
    grid-template-columns: repeat(6, 256px);
    grid-gap: 20px;
  }
}
</style>
