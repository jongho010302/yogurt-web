<template>
  <div class="padded">
    <h3>{{ getTitle() }}</h3>
    <FullCalendar :options="calendarOptions" />

    <div class="floating-action-button">
      <div class="plus" @click="showModal = true">+</div>
    </div>
    <el-dialog title="일정등록" :visible.sync="showModal" width="30%">
      <div class="create-lesson-modal__body">
        <a @click="$router.push('/schedule/private/create')">
          <div>
            <h5>프라이빗 수업</h5>
            <p>개인/듀엣/트리플 레슨 (예약 필수)</p>
          </div>
        </a>
        <a @click="$router.push('/schedule/group/create')">
          <div>
            <h5>그룹 수업</h5>
            <p>고정된 스케쥴의 오픈형 수업 과정 (자유 수강형/예약 필수)</p>
          </div>
        </a>
      </div>
      <div class="create-lesson-modal__footer">
        <p>
          수업/클래스란?
          <br />수업은 말 그대로 하루 한 회차의 수업을 의미하며, 그런 수업들이
          모여 <br />이루어진 프로그램을 일컬어 클래스라 칭합니다.
        </p>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import FullCalendar from '@fullcalendar/vue';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import timeGridPlugin from '@fullcalendar/timegrid';
import VueCal from 'vue-cal';
import { parseDate, getWeek } from '@/util/date';
import { createEventId } from '@/util/event-utils';
import 'vue-cal/dist/i18n/zh-cn';
import 'vue-cal/dist/vuecal.css';

@Component({
  components: {
    VueCal,
    FullCalendar,
  },
})
export default class Schedule extends Vue {
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        initialView: 'timeGridWeek',
        editable: true,
        eventClick: (info: any) => {
          console.log(info);
        },
        // headerToolbar: {
        //   left: 'prev,next today',
        //   center: 'title',
        //   right: 'dayGridMonth,timeGridWeek,timeGridDay',
        // },
        selectable: true,
        events: [
          {
            title: 'event 1',
            start: '2021-02-14 12:30:00',
            end: '2021-02-14 12:50:00',
          },
          { title: 'event 2', date: '2021-02-15' },
          { title: 'event 2', date: '2021-02-15' },
        ],
        select: this.onDateSelect,

        themeSystem: 'bootstrap',

        headerToolbar: {
          left: '',
          right: 'prev,today,next dayGridMonth,timeGridWeek,timeGridDay',
        },
      },
      showModal: false,
    };
  }

  onDateSelect(selectInfo: any) {
    let title = prompt('Please enter a new title for your event');
    console.log(selectInfo);
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  }

  getTitle() {
    const currentDate = new Date();
    return `${parseDate(currentDate, 'yyyy월 mm월 dd일')} (${getWeek(
      currentDate,
    )})`;
  }

  handleClose(done: any) {
    this.$confirm('Are you sure to close this dialog?')
      .then(() => {
        done();
      })
      .catch(() => {
        console.log('hi');
      });
  }
}
</script>

<style gloabl>
/* Row Height */
.fc .fc-timegrid-slot {
  height: 4em;
}
</style>

<style>
.el-dialog__title {
  font-size: 24px;
  font-weight: 700;
  padding-left: 30px;
}
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
.create-lesson-modal__body a:hover {
  cursor: pointer;
  text-decoration: underline;
}
.create-lesson-modal__body a:hover div {
  background: #eee;
}
.create-lesson-modal__body a:first-child div {
  border-bottom: 1px solid #eee;
}
.create-lesson-modal__body a div {
  padding: 20px 10px;
  transition: 0.15s;
}
.create-lesson-modal__body h5 {
  font-size: 14px;
  font-weight: 700;
  color: black;
}
.create-lesson-modal__footer {
  background: rgba(250, 251, 251, 0.5);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 2px;
  margin-top: 15px;
  padding: 15px;
}
.create-lesson-modal__footer p {
  font-size: 10px;
}
</style>
