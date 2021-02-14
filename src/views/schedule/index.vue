<template>
  <div class="padded">
    <h3>{{ getTitle }}</h3>
    <div class="calendar-header">
      <el-button size="mini" @click="onPrevClick">
        <i class="el-icon-arrow-left" />
      </el-button>
      <el-button size="mini" @click="onThisWeekClick">이번주</el-button>
      <el-button size="mini" style="margin-right: 8px" @click="onNextClick">
        <i class="el-icon-arrow-right" />
      </el-button>
      <el-dropdown trigger="click">
        <el-button size="mini" style="margin-right: 8px">강사별보기</el-button>
        <el-dropdown-menu slot="dropdown" style="padding: 20px">
          <el-checkbox
            v-model="checkAllInstructors"
            :indeterminate="isIndeterminate"
            @change="onCheckAllInstructorsChange"
            >전체 선택</el-checkbox
          >
          <el-divider></el-divider>
          <el-checkbox-group
            v-model="instructors"
            @change="onCheckedInstructorsChange"
          >
            <div
              v-for="(value, index) in staffs.data"
              :key="index"
              style="margin-bottom: 6px"
            >
              <el-checkbox :label="value.id">{{ value.name }}</el-checkbox>
            </div>
          </el-checkbox-group>
        </el-dropdown-menu>
      </el-dropdown>
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

    <FullCalendar ref="fullCalendar" :options="calendarOptions" />

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
import { parseDate, getWeek } from '@/util/date';
import { StaffData } from '@/store/staff/types';
import { LecturesData } from '@/store/lecture/types';

const lectureNamespace = 'lecture';
const staffNamespace = 'staff';

@Component({
  components: {
    FullCalendar,
  },
})
export default class Schedule extends Vue {
  data() {
    return {
      // 일정 등록 모달
      showModal: false,

      // 강사
      instructors: [],
      isIndeterminate: true,
      checkAllInstructors: true,

      // 캘린더 타입
      calendarView: 'timeGridWeek',

      // 캘린더 제목
      calendarDate: new Date(),

      // 캘린더 옵션
      calendarOptions: {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        initialView: 'timeGridWeek',
        editable: true,
        eventClick: (info: any) => {
          console.log(info);
        },
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
        headerToolbar: {
          left: '',
          right: '',
        },
      },
    };
  }

  get staffs(): StaffData {
    return this.$store.getters[`${staffNamespace}/getStaffs`];
  }

  get lectures(): LecturesData {
    return this.$store.getters[`${lectureNamespace}/getLectures`];
  }

  async created() {
    await Promise.all([this.getLectures(), this.getStaffs()]);
    this.onCheckAllInstructorsChange(true);
  }

  async getStaffs() {
    try {
      await this.$store.dispatch(`${staffNamespace}/getStaffs`);
    } catch (err) {
      console.error(err);
    }
  }

  async getLectures() {
    try {
      const searchType = this.$data.searchType;
      if (searchType === 'date') {
        this.$store.dispatch(`${lectureNamespace}/getLectures`, {
          startAt: this.$data.dateFilter,
          endAt: `${this.$data.dateFilter} 23:59`,
        });
      } else if (searchType === 'period') {
        this.$store.dispatch(`${lectureNamespace}/getLectures`, {
          startAt: this.$data.periodFilter[0],
          endAt: this.$data.periodFilter[1],
        });
      } else {
        console.error('searchType error occured.');
      }
    } catch (err) {
      console.error(err);
    }
  }

  get getTitle() {
    const currentDate = this.$data.calendarDate;
    return `${parseDate(currentDate, 'yyyy월 mm월 dd일')} (${getWeek(
      currentDate,
    )})`;
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
    this.$data.calendarDate = calendarRef.getApi().currentData.currentDate;
  }

  onDateSelect() {
    this.$data.showModal = true;
  }

  onCalendarViewChange(label: string) {
    const calendarRef = this.$refs.fullCalendar as any;
    calendarRef.getApi().changeView(label);
  }

  onCheckAllInstructorsChange(val: boolean) {
    this.$data.instructors = val
      ? this.staffs.data.map((staff) => staff.id)
      : [];
    this.$data.isIndeterminate = false;
  }

  onCheckedInstructorsChange(value: number[]) {
    const checkedCount = value.length;
    this.$data.checkAllInstructors = checkedCount === this.staffs.data.length;
    this.$data.isIndeterminate =
      checkedCount > 0 && checkedCount < this.staffs.data.length;
  }
}
</script>

<style>
/* Row Height */
.fc .fc-timegrid-slot {
  height: 4em;
}

/* Table Top Margin */
.fc .fc-toolbar.fc-header-toolbar {
  margin-bottom: 0.5em;
}

/* Calendar */
.calendar-header {
  display: flex;
  justify-content: flex-end;
}
.calendar-header .el-button + .el-button {
  margin-left: 0px;
}

/* Divider */
.el-divider--horizontal {
  margin: 12px 0px;
}

/* Dialog */
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
  font-size: 12px;
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
