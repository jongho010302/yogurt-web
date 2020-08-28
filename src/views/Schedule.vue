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
    <button id="show-modal" @click="showModal = true">Show Modal</button>
    <Modal v-if="showModal" @close="showModal = false" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import VueCal from 'vue-cal';
import PageTitle from '@/components/base/PageTitle.vue';
import Modal from '@/components/schedule/Modal.vue';
import { parseDate, getWeek } from '@/util/date';
import 'vue-cal/dist/i18n/zh-cn';
import 'vue-cal/dist/vuecal.css';

// const namespace = 'schedule';
const dailyHours = { from: 9 * 60, to: 18 * 60, class: 'business-hours' };

@Component({
  components: {
    VueCal,
    PageTitle,
    Modal,
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
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
