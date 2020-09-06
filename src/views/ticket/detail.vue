<template>
  <div>
    <section style="background-image: linear-gradient(#b7e9f7, #87cefa)">
      <div v-if="ticket" class="product-detail__inner">
        <!-- Breadcrumb -->
        <el-breadcrumb class="product-detail__breadcrumb" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/ticket' }">
            <span style="margin-bottom: 12px; color: #fff">수강권</span>
          </el-breadcrumb-item>
          <el-breadcrumb-item>
            <span style="margin-bottom: 12px; color: #fff">수강권 상세보기</span>
          </el-breadcrumb-item>
        </el-breadcrumb>

        <!-- Header: title -->
        <h1 class="product-detail-header__title">{{ ticket.title }}</h1>

        <!-- Header: card -->
        <TicketCard :ticket="ticket" :hideBottom="true" class="product-detail-header__card" />

        <!-- Header: buttons -->
        <div class="product-detail-header__buttons">
          <el-button size="mini" style="color: #409EFF; border-radius: 3px" @click="edit">수정</el-button>
          <el-button size="mini" style="color: #409EFF; border-radius: 3px" @click="edit">판매 정지</el-button>
          <el-button size="mini" style="color: #409EFF; border-radius: 3px" @click="edit">수강권 일괄 연장</el-button>
        </div>

        <!-- Price -->
        <div class="product-detail-header__prices">
          <h2>판매가 {{ numberCommaFormat(ticket.price) }}원</h2>
        </div>
      </div>
    </section>

    <div class="product-detail__body__inner">
      <el-tabs v-model="tab" @tab-click="handleClick">
        <el-tab-pane label="발급된 수강권" name="first">안녕</el-tab-pane>
        <el-tab-pane label="이 수강권으로 수강 가능한 클래스" name="second">이 수강권으로 수강 가능한 클래스</el-tab-pane>
      </el-tabs>
    </div>

    <!-- {{ ticket }} -->
  </div>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import TicketCard from '@/components/ticket/TicketCard.vue';
import { Methods } from '@/mixins';
import { Ticket } from '@/store/ticket/types';

const namespace = 'ticket';

@Component({
  components: {
    TicketCard,
  },
})
export default class TicketDetail extends mixins(Methods) {
  data() {
    return {
      tab: 'first',
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
          name: 'lectureDate',
          align: 'center',
          label: '수업일시',
          field: 'lectureDate',
        },
        { name: 'entry', align: 'center', label: '잔여 횟수', field: 'entry' },
      ],
    };
  }

  get ticket(): Ticket {
    return this.$store.getters[`${namespace}/getTicket`];
  }

  created() {
    this.getTicket(this.$route.params.id);
  }

  getTicket(id: string) {
    this.$store.dispatch(`${namespace}/getTicket`, {
      id,
    });
  }

  edit() {
    console.log(this.$data.tab);
  }

  handleClick(tab: any, event: any) {
    console.log(tab, event);
  }
}
</script>

<style>
.product-detail__inner {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: 5px;
  grid-template-areas:
    'breadcrumb .'
    'title card'
    'tags card'
    'buttons card'
    'prices card';
  padding-top: 36px;
  max-width: 1080px;
  margin: auto;
}
.product-detail__breadcrumb {
  grid-area: breadcrumb;
  padding-left: 5px;
}
.product-detail-header__title {
  grid-area: title;
  color: #fff;
  font-size: 36px;
  font-weight: 700;
  padding: 5px 15px;
}
.product-detail-header__card {
  grid-area: card;
  align-self: start;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  padding: 15px;
}
.product-detail-header__buttons {
  grid-area: buttons;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 5px 15px;
}
.product-detail-header__prices {
  display: flex;
  grid-area: prices;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 15px;
}
.product-detail-header__prices h2 {
  color: #fff;
  font-size: 20px;
  font-weight: 500;
}
.product-detail__body__inner {
  max-width: 1077px;
  margin: auto;
  padding: 0 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}
</style>
