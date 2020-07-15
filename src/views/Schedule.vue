<template>
  <div>
    <vue-cal
      :time-from="8 * 60"
      :time-to="20 * 60"
      :special-hours="specialHours"
      :disable-views="['years', 'year', 'month']"
      :events="events"
    />
    <q-icon></q-icon>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import VueCal from 'vue-cal';
import 'vue-cal/dist/i18n/zh-cn';
import 'vue-cal/dist/vuecal.css';

// const namespace = 'schedule';
const dailyHours = { from: 9 * 60, to: 18 * 60, class: 'business-hours' };

@Component({
  components: {
    VueCal,
  },
})
export default class Schedule extends Vue {
  data() {
    return {
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
          class: 'sport'
        },
        {
          start: '2020-04-05 10:00',
          end: '2020-04-05 10:50',
          title: 'Golf with John',
          class: 'sport'
        },
        {
          start: '2020-04-06 09:00',
          end: '2020-04-06 09:50',
          title: 'Dad\'s birthday!',
          class: 'sport'
        }
      ],
    };
  }

  // Life Cycle
  created() {
    console.log('created');
  }

  // Methods
}
</script>

<style global>
/* Green-theme. */
.vuecal__menu, .vuecal__cell-events-count {background-color: #027be3; color: white}
.vuecal__title-bar {background-color: rgb(73, 166, 248);}
.vuecal__cell--today, .vuecal__cell--current {background-color: rgba(240, 240, 255, 0.4);}
.vuecal:not(.vuecal--day-view) .vuecal__cell--selected {background-color: rgba(28, 148, 196, 0.4);}
.vuecal__cell--selected:before {border-color: rgba(28, 148, 196, 0.5);}
/* Cells and buttons get highlighted when an event is dragged over it. */
.vuecal__cell--highlighted:not(.vuecal__cell--has-splits),
.vuecal__cell-split--highlighted {background-color: rgba(195, 255, 225, 0.5);}
.vuecal__arrow.vuecal__arrow--highlighted,
.vuecal__view-btn.vuecal__view-btn--highlighted {background-color: rgba(136, 236, 191, 0.25);}
.sport {
  background-color:rgb(73, 166, 248)
}
</style>
