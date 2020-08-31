<template>
  <div class="q-pa-lg">
    <PageTitle :text="getTitle()" class="q-mb-xl" />

    <vue-cal
      :time-from="8 * 60"
      :time-to="20 * 60"
      :special-hours="specialHours"
      :disable-views="['years', 'year', 'month']"
      :events="events"
    />
    <q-page-sticky position="bottom-right" :offset="[45, 45]">
      <q-btn
        fab
        :icon="icon"
        color="red"
        @mouseover="icon = 'edit'"
        @mouseout="icon = 'add'"
        @click="onCreateCourseButtonClick"
      ></q-btn>
    </q-page-sticky>
    <button @click="showModal = true">Show Modal</button>
    <el-dialog :visible.sync="showModal" width="30%">
      <div class="el-dialog__header">
        <div class="create-lesson-modal__title">
          <h3>일정등록</h3>
        </div>
        <button type="button" aria-label="Close" class="el-dialog__headerbtn">
          <i class="el-dialog__close el-icon el-icon-close"></i>
        </button>
      </div>
      <div class="el-dialog__body">
        <div class="create-lesson-modal__body">
          <a class=""
            ><div>
              <h5>프라이빗 수업</h5>
              <p>개인/듀엣/트리플 레슨 (예약 필수)</p>
            </div></a
          ><a class=""
            ><div>
              <h5>그룹 수업</h5>
              <p>
                고정된 스케쥴의 오픈형 수업 과정 (자유 수강형/예약 필수)
              </p>
            </div></a
          >
        </div>
        <div class="create-lesson-modal__footer">
          <p>
            수업/클래스란?<br />
            수업은 말 그대로 하루 한 회차의 수업을 의미하며, 그런 수업들이
            모여<br />
            이루어진 프로그램을 일컬어 클래스라 칭합니다.
          </p>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import VueCal from 'vue-cal';
import PageTitle from '@/components/base/PageTitle.vue';
import { parseDate, getWeek } from '@/util/date';
import 'vue-cal/dist/i18n/zh-cn';
import 'vue-cal/dist/vuecal.css';

// const namespace = 'schedule';
const dailyHours = { from: 9 * 60, to: 18 * 60, class: 'business-hours' };

@Component({
  components: {
    VueCal,
    PageTitle,
  },
})
export default class Schedule extends Vue {
  data() {
    return {
      showModal: false,
      icon: 'add',
      specialHours: {
        1: dailyHours,
        2: dailyHours,
        3: dailyHours,
        4: dailyHours,
        5: dailyHours,
      },
      events: [
        {
          start: '2020-04-05 09:00',
          end: '2020-04-05 09:50',
          title: 'Need to go shopping',
          class: 'sport',
        },
        {
          start: '2020-04-05 10:00',
          end: '2020-04-05 10:50',
          title: 'Golf with John',
          class: 'sport',
        },
        {
          start: '2020-04-06 09:00',
          end: '2020-04-06 09:50',
          title: "Dad's birthday!",
          class: 'sport',
        },
      ],
    };
  }

  getTitle() {
    const currentDate = new Date();
    return `${parseDate(currentDate, 'yyyy월 mm월 dd일')} (${getWeek(
      currentDate,
    )})`;
  }

  onCreateCourseButtonClick() {
    // this.$router.push('/course/create');
  }
}
</script>

<style global>
/* Green-theme. */
.vuecal__menu,
.vuecal__cell-events-count {
  background-color: #027be3;
  color: white;
}
.vuecal__title-bar {
  background-color: rgb(73, 166, 248);
}
.vuecal__cell--today,
.vuecal__cell--current {
  background-color: rgba(240, 240, 255, 0.4);
}
.vuecal:not(.vuecal--day-view) .vuecal__cell--selected {
  background-color: rgba(28, 148, 196, 0.4);
}
.vuecal__cell--selected:before {
  border-color: rgba(28, 148, 196, 0.5);
}
/* Cells and buttons get highlighted when an event is dragged over it. */
.vuecal__cell--highlighted:not(.vuecal__cell--has-splits),
.vuecal__cell-split--highlighted {
  background-color: rgba(195, 255, 225, 0.5);
}
.vuecal__arrow.vuecal__arrow--highlighted,
.vuecal__view-btn.vuecal__view-btn--highlighted {
  background-color: rgba(136, 236, 191, 0.25);
}
.sport {
  background-color: rgb(73, 166, 248);
}
</style>

<style scoped>
.create-lesson-modal {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.create-lesson-modal__title {
  font-size: 36px;
  padding-left: 30px;
}
.create-lesson-modal__body {
  box-sizing: border-box;
}
.create-lesson-modal__footer {
  background: rgba(250, 251, 251, 0.5);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 2px;
  margin-top: 15px;
  padding: 15px;
}
</style>
