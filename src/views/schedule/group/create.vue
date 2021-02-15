<template>
  <div>
    <!-- Header -->
    <div class="create-header">
      <div class="create-header-block">
        <el-breadcrumb
          separator-class="el-icon-arrow-right"
          style="margin-bottom: 12px"
        >
          <el-breadcrumb-item :to="{ path: '/schedule' }"
            >일정</el-breadcrumb-item
          >
          <el-breadcrumb-item>그룹 수업 등록</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="create-header-block__title">
          <h3>그룹 수업 등록</h3>
        </div>
      </div>
    </div>

    <!-- Middle -->
    <div class="create-form">
      <!-- 수업명 -->
      <div class="create-form-block">
        <div class="create-form-block__index">01</div>
        <div class="create-form-block__content">
          <div class="create-form-block__label">
            <div class="create-form-block__label__title">수업명</div>
          </div>
          <div class="create-form-block__input">
            <el-input v-model="title" class="el-custom-input" />
          </div>
        </div>
      </div>

      <!-- 수업 소개 -->
      <div class="create-form-block">
        <div class="create-form-block__index">02</div>
        <div class="create-form-block__content">
          <div class="create-form-block__label">
            <div class="create-form-block__label__title">수업 소개</div>
          </div>
          <div class="create-form-block__input">
            <el-input v-model="description" class="el-custom-input" />
          </div>
        </div>
      </div>

      <!-- 담당 강사 -->
      <div class="create-form-block">
        <div class="create-form-block__index">03</div>
        <div class="create-form-block__content">
          <div class="create-form-block__label">
            <div class="create-form-block__label__title">담당 강사</div>
          </div>
          <div class="create-form-block__input">
            <StaffSelect v-model="staff" class="el-custom-input" />
          </div>
        </div>
      </div>

      <!-- 수강 인원 -->
      <div class="create-form-block">
        <div class="create-form-block__index">04</div>
        <div class="create-form-block__content">
          <div class="create-form-block__label">
            <div class="create-form-block__label__title">수강 인원</div>
          </div>
          <div class="create-form-block__input">
            <div class="create-form-block__trainee">
              <div>
                <label>최대 수강 인원</label>
                <el-input-number
                  v-model.number="maxTrainee"
                  :min="1"
                ></el-input-number>
              </div>
              <div>
                <label>최소 수강 인원</label>
                <el-input-number
                  v-model.number="minTrainee"
                  :min="1"
                  :max="maxTrainee"
                ></el-input-number>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 에약 / 취소 / 변경 가능 시간 -->
      <div class="create-form-block">
        <div class="create-form-block__index">05</div>
        <div class="create-form-block__content">
          <div class="create-form-block__label">
            <div class="create-form-block__label__title">
              에약 / 취소 / 변경 가능 시간 (HH:MM)
            </div>
          </div>
          <div class="create-form-block__input">
            <div class="create-form-block__booking-time">
              <el-time-select
                v-model="bookingEndTime"
                :clearable="false"
                :picker-options="{
                  start: '00:00',
                  step: '00:05',
                  end: '47:55',
                }"
                style="width: 120px"
              ></el-time-select>
              <span>
                시간 전까지
                <b>예약 가능</b>합니다.
              </span>
            </div>

            <div class="create-form-block__booking-time">
              <el-time-select
                v-model="bookingCancelEndTime"
                :clearable="false"
                :picker-options="{
                  start: '00:00',
                  step: '00:05',
                  end: '47:55',
                }"
                style="width: 120px"
              ></el-time-select>
              <span>
                시간 전까지
                <b>예약 취소 가능</b>합니다.
              </span>
            </div>

            <div class="create-form-block__booking-time">
              <el-time-select
                v-model="bookingChangeEndTime"
                :clearable="false"
                :picker-options="{
                  start: '00:00',
                  step: '00:05',
                  end: '47:55',
                }"
                style="width: 120px"
              ></el-time-select>
              <span>
                시간 전까지
                <b>예약 변경 가능</b>합니다.
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- 수업 일정 -->
      <div class="create-form-block">
        <div class="create-form-block__index">06</div>
        <div class="create-form-block__content">
          <div class="create-form-block__label">
            <div class="create-form-block__label__title">수업 일정</div>
          </div>
          <div class="create-form-block__input">
            <!-- 기간 날짜 -->
            <div class="el-custom-input">
              <el-date-picker
                v-model="courseDate"
                type="daterange"
                :clearable="false"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                style="margin-left: 10px"
              ></el-date-picker>
            </div>

            <div style="margin-top: 10px">
              <el-button
                size="mini"
                class="week-button"
                :class="hasMonClass ? 'button--primary' : null"
                @click="hasMonClass = !hasMonClass"
                >월</el-button
              >
              <el-button
                size="mini"
                class="week-button"
                :class="hasTueClass ? 'button--primary' : null"
                @click="hasTueClass = !hasTueClass"
                >화</el-button
              >
              <el-button
                size="mini"
                class="week-button"
                :class="hasWedClass ? 'button--primary' : null"
                @click="hasWedClass = !hasWedClass"
                >수</el-button
              >
              <el-button
                size="mini"
                class="week-button"
                :class="hasThuClass ? 'button--primary' : null"
                @click="hasThuClass = !hasThuClass"
                >목</el-button
              >
              <el-button
                size="mini"
                class="week-button"
                :class="hasFriClass ? 'button--primary' : null"
                @click="hasFriClass = !hasFriClass"
                >금</el-button
              >
              <el-button
                size="mini"
                class="week-button"
                :class="hasSatClass ? 'button--primary' : null"
                @click="hasSatClass = !hasSatClass"
                >토</el-button
              >
              <el-button
                size="mini"
                class="week-button"
                :class="hasSunClass ? 'button--primary' : null"
                @click="hasSunClass = !hasSunClass"
                >일</el-button
              >
            </div>

            <course-week-detail
              v-if="hasMonClass"
              v-model="monClassTime"
              day="월요일"
            ></course-week-detail>
            <course-week-detail
              v-if="hasTueClass"
              v-model="tueClassTime"
              day="화요일"
            ></course-week-detail>
            <course-week-detail
              v-if="hasWedClass"
              v-model="wedClassTime"
              day="수요일"
            ></course-week-detail>
            <course-week-detail
              v-if="hasThuClass"
              v-model="thuClassTime"
              day="목요일"
            ></course-week-detail>
            <course-week-detail
              v-if="hasFriClass"
              v-model="friClassTime"
              day="금요일"
            ></course-week-detail>
            <course-week-detail
              v-if="hasSatClass"
              v-model="satClassTime"
              day="토요일"
            ></course-week-detail>
            <course-week-detail
              v-if="hasSunClass"
              v-model="sunClassTime"
              day="일요일"
            ></course-week-detail>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom -->
    <div class="bottom-action-bar">
      <span @click="$router.push('/schedule')" style="cursor: pointer">
        <i
          class="el-icon-arrow-left"
          style="font-size: 14px; margin-right: 8px"
        />뒤로가기
      </span>
      <div class="space"></div>
      <el-button @click="onSubmit" style="color: black"
        >그룹 수업 등록 완료</el-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import StaffSelect from '@/components/staff/StaffSelect.vue';
import CourseWeekDetail from '@/components/course/CourseWeekDetail.vue';
import { getCurrentDate, getDateByCalculateDay, parseDate } from '@/util/date';
import { warningAlert } from '@/util/ui';

const courseNamespace = 'course';
const userNamespace = 'user';

@Component({
  components: {
    StaffSelect,
    CourseWeekDetail,
  },
})
export default class TicketCard extends Vue {
  data() {
    return {
      title: '',
      description: '',
      staff: null,
      maxTrainee: 3,
      minTrainee: 1,
      bookingEndTime: '00:10',
      bookingCancelEndTime: '00:10',
      bookingChangeEndTime: '00:10',
      courseDate: [
        parseDate(getCurrentDate(), 'yyyy-mm-dd'),
        parseDate(getDateByCalculateDay(getCurrentDate(), 30), 'yyyy-mm-dd'),
      ],
      hasMonClass: false,
      hasTueClass: false,
      hasWedClass: false,
      hasThuClass: false,
      hasFriClass: false,
      hasSatClass: false,
      hasSunClass: false,
      monClassTime: ['09:00', '09:50'],
      tueClassTime: ['09:00', '09:50'],
      wedClassTime: ['09:00', '09:50'],
      thuClassTime: ['09:00', '09:50'],
      friClassTime: ['09:00', '09:50'],
      satClassTime: ['09:00', '09:50'],
      sunClassTime: ['09:00', '09:50'],
    };
  }

  get user() {
    return this.$store.getters[`${userNamespace}/getUser`];
  }

  get studio() {
    return this.$store.getters[`${userNamespace}/getStudio`];
  }

  async onSubmit() {
    if (!this.$data.title) {
      warningAlert('01. 수업명을 입력해 주세요.');
      return;
    }
    if (!this.$data.description) {
      warningAlert('02. 수업 소개를 입력해 주세요.');
      return;
    }
    if (!this.$data.staff) {
      warningAlert('03. 담당 강사를 선택해 주세요.');
      return;
    }
    if (!this.$data.maxTrainee) {
      warningAlert('04. 최대 수강 인원을 입력해 주세요.');
      return;
    }
    if (!this.$data.minTrainee) {
      warningAlert('04. 최소 수강 인원을 입력해 주세요.');
      return;
    }
    if (!this.$data.bookingEndTime) {
      warningAlert('05. 예약 가능 시간을 입력해 주세요.');
      return;
    }
    if (!this.$data.bookingCancelEndTime) {
      warningAlert('05. 예약 취소 시간을 입력해 주세요.');
      return;
    }
    if (!this.$data.bookingChangeEndTime) {
      warningAlert('05. 예약 변경 시간을 입력해 주세요.');
      return;
    }
    if (!this.$data.courseDate[0] || !this.$data.courseDate[1]) {
      warningAlert('06. 수업 일정 날짜를 입력해 주세요.');
      return;
    }
    if (
      (this.$data.hasMonClass && !this.$data.monClassTime[0]) ||
      !this.$data.monClassTime[1]
    ) {
      warningAlert('06. 월요일 수업 시간을 입력해 주세요.');
      return;
    }
    if (
      (this.$data.hasTueClass && !this.$data.tueClassTime[0]) ||
      !this.$data.tueClassTime[1]
    ) {
      warningAlert('06. 화요일 수업 시간을 입력해 주세요.');
      return;
    }
    if (
      (this.$data.hasWedClass && !this.$data.wedClassTime[0]) ||
      !this.$data.wedClassTime[1]
    ) {
      warningAlert('06. 수요일 수업 시간을 입력해 주세요.');
      return;
    }
    if (
      (this.$data.hasThuClass && !this.$data.thuClassTime[0]) ||
      !this.$data.thuClassTime[1]
    ) {
      warningAlert('06. 목요일 수업 시간을 입력해 주세요.');
      return;
    }
    if (
      (this.$data.hasFriClass && !this.$data.friClassTime[0]) ||
      !this.$data.friClassTime[1]
    ) {
      warningAlert('06. 금요일 수업 시간을 입력해 주세요.');
      return;
    }
    if (
      (this.$data.hasSatClass && !this.$data.satClassTime[0]) ||
      !this.$data.satClassTime[1]
    ) {
      warningAlert('06. 토요일 수업 시간을 입력해 주세요.');
      return;
    }
    if (
      (this.$data.hasSunClass && !this.$data.sunClassTime[0]) ||
      !this.$data.sunClassTime[1]
    ) {
      warningAlert('06. 일요일 수업 시간을 입력해 주세요.');
      return;
    }

    try {
      await this.$store.dispatch(`${courseNamespace}/saveCourses`, {
        studioId: this.studio.id,
        staffId: this.$data.staff.value,
        classType: 'GROUP',
        title: this.$data.title,
        description: this.$data.description,
        maxTrainee: this.$data.maxTrainee,
        minTrainee: this.$data.minTrainee,
        startDate: this.$data.courseDate[0],
        endDate: this.$data.courseDate[1],
        bookingEndTime: this.$data.bookingEndTime,
        bookingCancelEndTime: this.$data.bookingCancelEndTime,
        bookingChangeEndTime: this.$data.bookingChangeEndTime,
        hasMonClass: this.$data.hasMonClass,
        monClassStartTime: this.$data.monClassTime[0],
        monClassEndTime: this.$data.monClassTime[1],
        hasTueClass: this.$data.hasTueClass,
        tueClassStartTime: this.$data.tueClassTime[0],
        tueClassEndTime: this.$data.tueClassTime[1],
        hasWedClass: this.$data.hasWedClass,
        wedClassStartTime: this.$data.wedClassTime[0],
        wedClassEndTime: this.$data.wedClassTime[1],
        hasThuClass: this.$data.hasThuClass,
        thuClassStartTime: this.$data.thuClassTime[0],
        thuClassEndTime: this.$data.thuClassTime[1],
        hasFriClass: this.$data.hasFriClass,
        friClassStartTime: this.$data.friClassTime[0],
        friClassEndTime: this.$data.friClassTime[1],
        hasSatClass: this.$data.hasSatClass,
        satClassStartTime: this.$data.satClassTime[0],
        satClassEndTime: this.$data.satClassTime[1],
        hasSunClass: this.$data.hasSunClass,
        sunClassStartTime: this.$data.sunClassTime[0],
        sunClassEndTime: this.$data.sunClassTime[1],
      });
      this.$router.push({ path: '/' });
    } catch (err) {
      console.error(err);
    }
  }
}
</script>

<style scoped>
@import '../../../css/Create.scss';

.create-form-block__trainee {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 200px));
  grid-gap: 12px;
}
.create-form-block__booking-time:not(:first-child) {
  margin-top: 5px;
}
.create-form-block__booking-time span {
  margin-left: 5px;
}
.week-button {
  border-radius: 50%;
  padding: 9px;
}
.button--primary {
  background-color: #6cadf4;
  border-color: #6cadf4;
  color: #fff;
}
</style>
