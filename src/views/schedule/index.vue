<template>
  <div class="padded">
    <div class="calendar-header">
      <div>
        <h2>{{ getTitle() }}</h2>
        <el-date-picker
          v-if="calendarView === 'dayGridMonth'"
          v-model="dateFilter"
          type="month"
          format="yyyy-MM"
          value-format="yyyy-MM"
          @change="onMonthChange"
        >
        </el-date-picker>
        <el-date-picker
          v-if="calendarView === 'timeGridWeek'"
          v-model="dateFilter"
          type="week"
          :clearable="false"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          :picker-options="{ firstDayOfWeek: 1 }"
        ></el-date-picker>
        <el-date-picker
          v-if="calendarView === 'timeGridDay'"
          v-model="dateFilter"
          type="date"
          :clearable="false"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          :picker-options="{ firstDayOfWeek: 1 }"
        ></el-date-picker>
      </div>

      <div>
        <el-button size="mini" @click="onPrevClick">
          <i class="el-icon-arrow-left" />
        </el-button>
        <el-button size="mini" @click="onThisWeekClick">이번주</el-button>
        <el-button size="mini" style="margin-right: 8px" @click="onNextClick">
          <i class="el-icon-arrow-right" />
        </el-button>
        <staff-check-box v-model="staffs"></staff-check-box>
        <el-radio-group
          v-model="calendarView"
          size="mini"
          @change="onCalendarViewChange"
        >
          <el-radio-button label="dayGridMonth">월간</el-radio-button>
          <el-radio-button label="timeGridWeek">주간</el-radio-button>
          <el-radio-button label="timeGridDay">일간</el-radio-button>
        </el-radio-group>
      </div>
    </div>

    <FullCalendar ref="fullCalendar" :options="calendarOptions" />
    <schedule-add-btn v-model="showModal"></schedule-add-btn>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import FullCalendar from '@fullcalendar/vue';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import timeGridPlugin from '@fullcalendar/timegrid';
import { parseDate, getWeek, getCurrentDate } from '@/util/date';
import StaffCheckBox from '@/components/staff/StaffCheckBox.vue';
import ScheduleAddBtn from '@/components/schedule/floating/ScheduleAddBtn.vue';
import { LecturesData } from '@/store/lecture/types';
import { Watch } from 'vue-property-decorator';

const lectureNamespace = 'lecture';

enum CalendarType {
  Month = 'dayGridMonth',
  Week = 'timeGridWeek',
  Day = 'timeGridDay',
}

@Component({
  components: {
    FullCalendar,
    ScheduleAddBtn,
    StaffCheckBox,
  },
})
export default class Schedule extends Vue {
  data() {
    return {
      // 일정 등록 모달
      showModal: false,

      // 캘린더 날짜
      dateFilter: parseDate(getCurrentDate(), 'yyyy-mm-dd'),

      // 강사
      staffs: [],

      // 캘린더 타입
      calendarView: CalendarType.Week,

      // 캘린더 옵션
      calendarOptions: {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        initialView: CalendarType.Week,
        editable: true,
        eventClick: (info: any) => {
          console.log(info);
        },
        selectable: true,
        firstDay: 1,
        events: [
          {
            title: 'event 1',
            start: '2021-02-14 12:30:00',
            end: '2021-02-14 12:50:00',
          },
          { title: 'event 2', date: '2021-02-15' },
          { title: 'event 2', date: '2021-02-15' },
        ],
        dayHeaderFormat: this.weekHeaderFormat,
        select: this.onDateSelect,
        headerToolbar: {
          left: '',
          right: '',
        },
      },
    };
  }

  get lectures(): LecturesData {
    return this.$store.getters[`${lectureNamespace}/getLectures`];
  }

  async created() {
    await this.getLectures();
  }

  async getLectures() {
    try {
      this.$store.dispatch(`${lectureNamespace}/getLectures`, {
        startAt: this.$data.dateFilter,
        endAt: `${this.$data.dateFilter} 23:59`,
      });
    } catch (err) {
      console.error(err);
    }
  }

  getTitle() {
    return this.$data.dateFilter;
  }

  onPrevClick() {
    const calendarRef = this.$refs.fullCalendar as any;
    calendarRef.getApi().prev();
    this.setCalendarDate();
  }

  onThisWeekClick() {
    const calendarRef = this.$refs.fullCalendar as any;
    calendarRef.getApi().today();
    this.setCalendarDate();
  }

  onNextClick() {
    const calendarRef = this.$refs.fullCalendar as any;
    calendarRef.getApi().next();
    this.setCalendarDate();
  }

  setCalendarDate() {
    const calendarRef = this.$refs.fullCalendar as any;
    const date = calendarRef.getApi().currentData.currentDate;

    this.$data.dateFilter = parseDate(date, 'yyyy-mm-dd');
  }

  onDateSelect() {
    this.$data.showModal = true;
  }

  onCalendarViewChange(label: string) {
    const calendarRef = this.$refs.fullCalendar as any;
    // Calendar Type 변경
    calendarRef.getApi().changeView(label);

    // Column Header Format 변경
    if (label === CalendarType.Month) {
      this.$data.calendarOptions.dayHeaderFormat = this.monthHeaderFormat;
    } else if (label === CalendarType.Week) {
      this.$data.calendarOptions.dayHeaderFormat = this.weekHeaderFormat;
    } else if (label === CalendarType.Day) {
      this.$data.calendarOptions.dayHeaderFormat = this.dayHeaderFormat;
    }
  }

  monthHeaderFormat(data: any) {
    const date = data.date.marker as Date;
    return `${getWeek(date)}`;
  }

  weekHeaderFormat(data: any) {
    const date = data.date.marker as Date;
    return `${date.getDate()} (${getWeek(date)})`;
  }

  dayHeaderFormat(data: any) {
    const date = data.date.marker as Date;
    return `${date.getDate()} (${getWeek(date)})`;
  }

  onMonthChange(date: string) {
    const calendarRef = this.$refs.fullCalendar as any;
    calendarRef.getApi().gotoDate(date);
  }

  onWeekChange(date: string) {
    const calendarRef = this.$refs.fullCalendar as any;
    calendarRef.getApi().gotoDate(date);
  }

  @Watch('dateFilter')
  onDayChange(date: string) {
    const calendarRef = this.$refs.fullCalendar as any;
    calendarRef.getApi().gotoDate(date);
  }
}
</script>

<style>
/* Calendar */
.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.calendar-header .el-button + .el-button {
  margin-left: 0px;
}

/* Row Height */
.fc .fc-timegrid-slot {
  height: 4em;
}

/* Table Top Margin */
.fc .fc-toolbar.fc-header-toolbar {
  margin-bottom: 0.5em;
}

/* Today Background Color */
.fc-day-today {
  background: #fff !important;
}

/* Divider */
.el-divider--horizontal {
  margin: 12px 0px;
}
</style>
