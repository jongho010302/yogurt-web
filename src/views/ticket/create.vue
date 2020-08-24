<template>
  <div>
    <!-- Header -->
    <div class="content-header">
      <div class="content-header__inner">
        <q-breadcrumbs align="left" style="margin-bottom: 12px;">
          <q-breadcrumbs-el label="수강권" />
          <q-breadcrumbs-el label="수강권등록" />
        </q-breadcrumbs>
        <div class="content-title">
          <h3>수강권 생성</h3>
          <q-select
            v-model="classType"
            :options="classTypeOptions"
            color="primary"
            outlined
            dense
            style="margin-left: 8px;"
          />
        </div>
      </div>
    </div>

    <!-- Middle -->
    <div class="product-form">
      <!-- 수강권 종류 -->
      <div class="form-block">
        <div class="form-block__index">01</div>
        <div class="form-block__content">
          <div class="form-block__label">
            <div class="form-block__label__title">수강권명 입력</div>
          </div>
          <div class="form-block__input">
            <q-input v-model="title" dense color="primary" style="max-width: 300px;" />
          </div>
        </div>
      </div>

      <!-- 설명 -->
      <div class="form-block">
        <div class="form-block__index">02</div>
        <div class="form-block__content">
          <div class="form-block__label">
            <div class="form-block__label__title">설명</div>
          </div>
          <div class="form-block__input">
            <q-input v-model="description" dense color="primary" style="max-width: 400px;" />
          </div>
        </div>
      </div>

      <!-- 총 이용 횟수 -->
      <div class="form-block">
        <div class="form-block__index">03</div>
        <div class="form-block__content">
          <div class="form-block__label">
            <div class="form-block__label__title">총 이용 횟수</div>
          </div>
          <div class="form-block__input">
            <q-input
              v-model.number="maxCoupon"
              type="number"
              dense
              color="primary"
              style="max-width: 200px;"
            />
          </div>
        </div>
      </div>

      <!-- 취소 가능 횟수 -->
      <div class="form-block">
        <div class="form-block__index">04</div>
        <div class="form-block__content">
          <div class="form-block__label">
            <div class="form-block__label__title">취소 가능 횟수</div>
          </div>
          <div class="form-block__input">
            <q-input
              v-model.number="maxCancel"
              type="number"
              dense
              color="primary"
              style="max-width: 200px;"
            />
          </div>
        </div>
      </div>

      <!-- 수강권 사용기한 -->
      <div class="form-block">
        <div class="form-block__index">05</div>
        <div class="form-block__content">
          <div class="form-block__label">
            <div class="form-block__label__title">수강권 사용기한</div>
          </div>
          <div class="form-block__input">
            <q-option-group
              v-model="availableDays"
              :options="availableDaysOptions1"
              color="primary"
              inline
            />
            <q-option-group
              v-model="availableDays"
              :options="availableDaysOptions2"
              color="primary"
              inline
            />
            <div v-if="isAvailableDaysSelf" class="q-mt-md">
              직접 입력 란
              <q-input
                v-model.number="selfAvailableDays"
                type="number"
                dense
                color="primary"
                style="max-width: 200px;"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- 수강 인원 -->
      <div class="form-block">
        <div class="form-block__index">06</div>
        <div class="form-block__content">
          <div class="form-block__label">
            <div class="form-block__label__title">수강 인원</div>
          </div>
          <div class="form-block__input">
            <q-input
              v-model.number="maxTrainee"
              type="number"
              dense
              color="primary"
              style="max-width: 200px;"
            />
          </div>
        </div>
      </div>

      <!--수 강권 판매 정보 입력 -->
      <div class="form-block">
        <div class="form-block__index">07</div>
        <div class="form-block__content">
          <div class="form-block__label">
            <div class="form-block__label__title">판매가 입력</div>
          </div>
          <div class="form-block__input">
            <q-input
              class
              v-model.number="price"
              dense
              color="primary"
              input-class="text-right"
              style="max-width: 200px;"
            />
          </div>
        </div>
      </div>

      <!-- 주간/월간 이용 횟수 설정 -->
      <div class="form-block">
        <div class="form-block__index">08</div>
        <div class="form-block__content">
          <div class="form-block__label">
            <div class="form-block__label__title">주간/월간 이용 횟수 설정</div>
          </div>
          <div class="form-block__input">
            <div class="custom-radio-group">
              <label
                :class="{ active: bookingLimitCriteria === 'week' }"
                @click="bookingLimitCriteria = 'week'"
              >주간 이용 횟수</label>
              <label
                :class="{ active: bookingLimitCriteria === 'month' }"
                @click="bookingLimitCriteria = 'month'"
              >월간 이용 횟수</label>
            </div>
            <q-option-group
              v-model="bookingLimit"
              :options="bookingLimitOptions1"
              color="primary"
              inline
            />
            <q-option-group
              v-model="bookingLimit"
              :options="bookingLimitOptions2"
              color="primary"
              inline
            />
            <div v-if="isBookingLimitSelf" class="q-mt-md">
              직접 입력 란
              <q-input
                v-model.number="selfBookingLimit"
                type="number"
                dense
                color="primary"
                style="max-width: 200px;"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- 당일 예약 변경 -->
      <div class="form-block">
        <div class="form-block__index">09</div>
        <div class="form-block__content">
          <div class="form-block__label">
            <div class="form-block__label__title">당일 예약 변경</div>
            <div class="form-block__label__check">
              <q-checkbox v-model="isUseDailyBookingChangeLimit" color="primary" dense />
            </div>
          </div>
          <div class="form-block__input">
            <q-input
              v-model.number="dailyBookingChangeLimit"
              :disable="!isUseDailyBookingChangeLimit"
              dense
              color="primary"
              style="max-width: 200px;"
            />당일 수업 예약을 최대 변경 가능한 횟수입니다.
          </div>
        </div>
      </div>

      <!-- 예약 가능한 시간 설정 -->
      <div class="form-block">
        <div class="form-block__index">10</div>
        <div class="form-block__content">
          <div class="form-block__label">
            <div class="form-block__label__title">예약 가능한 시간 설정</div>
            <div class="form-block__label__check">
              <q-checkbox v-model="isUseBookingTime" color="primary" dense />
            </div>
          </div>
          <div class="form-block__input" style="display: flex">
            <q-input
              v-model.number="bookingStartTime"
              dense
              placeholder="시작시각"
              :disable="!isUseBookingTime"
              color="primary"
              mask="##:##"
              style="max-width: 100px;"
              input-class="q-py-none"
              input-style="height: 50px"
            />
            <span style="align-self: flex-end; font-size: 20px; font-weight: 300; margin: 0 12px;">~</span>
            <q-input
              v-model.number="bookingEndTime"
              dense
              placeholder="종료시각"
              :disable="!isUseBookingTime"
              color="primary"
              mask="##:##"
              style="max-width: 100px;"
              input-class="q-py-none"
              input-style="height: 50px"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom -->
    <div class="bottom-action-bar">
      <span @click="$router.push('/ticket')" style="cursor: pointer;">
        <q-icon name="keyboard_arrow_left" />뒤로가기
      </span>
      <q-space />
      <q-btn label="수강권 등록 완료" color="white" text-color="black" @click="onSubmit"></q-btn>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';

const userNamespace = 'user';
const namespace = 'ticket';

@Component
export default class TicketCard extends Vue {
  data() {
    return {
      step: 1,
      // Step 1
      classType: {
        label: '그룹형 수업 전용',
        value: 'GROUP',
      },
      classTypeOptions: [
        {
          label: '그룹형 수업 전용',
          value: 'GROUP',
        },
        {
          label: '프라이빗형 수업 전용',
          value: 'PRIVATE',
        },
      ],
      title: '',
      description: '',
      maxCoupon: 10,
      maxCancel: 10,
      availableDays: 30,
      selfAvailableDays: 1,
      availableDaysOptions1: [
        {
          label: '1개월 (30일)',
          value: 30,
        },
        {
          label: '2개월 (60일)',
          value: 60,
        },
        {
          label: '3개월 (90일)',
          value: 90,
        },
      ],
      availableDaysOptions2: [
        {
          label: '6개월 (180일)',
          value: 180,
        },
        {
          label: '1년 (365일)',
          value: 365,
        },
        {
          label: '직접 입력',
          value: -1,
        },
      ],
      isAvailableDaysSelf: false,
      maxTrainee: 4,
      price: 0,
      bookingLimitCriteria: 'week',
      bookingLimit: 0,
      bookingLimitOptions1: [
        {
          label: '제한없음',
          value: 0,
        },
        {
          label: '1회',
          value: 1,
        },
        {
          label: '2회',
          value: 2,
        },
      ],
      bookingLimitOptions2: [
        {
          label: '3회',
          value: 3,
        },
        {
          label: '4회',
          value: 4,
        },
        {
          label: '직접 입력',
          value: -1,
        },
      ],
      isBookingLimitSelf: false,
      selfBookingLimit: 1,
      isUseDailyBookingChangeLimit: false,
      dailyBookingChangeLimit: 0,
      isUseBookingTime: false,
      bookingStartTime: null,
      bookingEndTime: null,
    };
  }

  get user() {
    return this.$store.getters[`${userNamespace}/getUser`];
  }

  onSubmit() {
    const availableDays = this.$data.isAvailableDaysSelf
      ? this.$data.selfAvailableDays
      : this.$data.availableDays;

    const bookingLimit = this.$data.isBookingLimitSelf
      ? this.$data.selfBookingLimit
      : this.$data.bookingLimit;

    let bookingLimitPerWeek;
    let bookingLimitPerMonth;

    if (this.$data.bookingLimitCriteria === 'week') {
      bookingLimitPerWeek = bookingLimit;
      bookingLimitPerMonth = 0;
    } else if (this.$data.bookingLimitCriteria === 'month') {
      bookingLimitPerWeek = 0;
      bookingLimitPerMonth = bookingLimit;
    }

    let bookingStartTime = 0;
    let bookingEndTime = 0;
    if (this.$data.isUseBookingTime) {
      bookingStartTime = this.$data.bookingStartTime;
      bookingEndTime = this.$data.bookingEndTime;
    }

    try {
      this.$store.dispatch(`${namespace}/saveTicket`, {
        studioId: this.user.studio.id,
        classType: this.$data.classType.value,
        title: this.$data.title,
        description: this.$data.description,
        maxCoupon: this.$data.maxCoupon,
        maxCancel: this.$data.maxCancel,
        availableDays,
        maxTrainee: this.$data.maxTrainee,
        price: this.$data.price,
        bookingLimitPerWeek,
        bookingLimitPerMonth,
        dailyBookingChangeLimit: this.$data.dailyBookingChangeLimit,
        bookingStartTime,
        bookingEndTime,
        isSelling: true,
      });
      // this.$router.push({ path: '/ticket' });
    } catch (err) {
      console.error(err);
    }
  }

  @Watch('availableDays')
  onAvailableDaysChanged() {
    if (this.$data.availableDays === -1) {
      this.$data.isAvailableDaysSelf = true;
    } else {
      this.$data.isAvailableDaysSelf = false;
    }
  }

  @Watch('bookingLimit')
  onBookingLimitChanged() {
    if (this.$data.bookingLimit === -1) {
      this.$data.isBookingLimitSelf = true;
    } else {
      this.$data.isBookingLimitSelf = false;
    }
  }
}
</script>

<style scoped>
.container {
  padding: 60px 80px 120px;
}
.content-header {
  background: rgba(248, 249, 250, 0.5);
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
  width: 100%;
}
.content-header__inner {
  padding: 72px;
  padding-top: 50px;
  padding-bottom: 30px;
}
.content-title {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.content-title h3 {
  font-size: 28px;
  font-weight: 700;
  margin: 12px 8px;
}
.product-form {
  display: grid;
  grid-row-gap: 30px;
  padding: 60px 80px 120px;
  margin: auto;
}
.form-block {
  display: grid;
  grid-template-columns: 60px 1fr;
  color: #343a40;
  font-size: 15px;
  font-weight: 700;
}
.form-block__index {
  width: 60px;
}
.form-block__content {
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  padding-bottom: 30px;
}
.form-block__label {
  display: grid;
  grid-template-columns: 1fr 210px;
  grid-gap: 24px;
  margin-bottom: 12px;
}
.form-block__label__title {
  display: flex;
  flex-direction: row;
}
.form-block__label__check {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
.form-block__label {
  display: grid;
  grid-template-columns: 1fr 210px;
  grid-gap: 24px;
  margin-bottom: 12px;
}
.form-block__inputs {
  display: flex;
}
.custom-radio-group {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  margin: 10px 0;
}
.custom-radio-group label:first-child {
  border-width: 1px;
  border-radius: 4px 0 0 4px;
}
.custom-radio-group label:last-child {
  border-radius: 0 4px 4px 0;
}
.custom-radio-group label {
  border: solid #64aeff;
  border-width: 1px 1px 1px 0;
  color: #64aeff;
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
  padding: 7px;
  text-align: center;
  width: 100%;
  margin: 0;
  transition: background 0.2s;
}
.custom-radio-group label.active {
  background: #64aeff;
  color: #fff;
}
.bottom-action-bar {
  position: fixed;
  bottom: 0px;
  left: 56px;
  right: 0px;
  padding-left: 24px;
  padding-right: 24px;
  background-color: #64aeff;
  width: 97%;
  height: 60px;
  z-index: 1;
  display: flex;
  align-items: center;
  color: white;
}
</style>
