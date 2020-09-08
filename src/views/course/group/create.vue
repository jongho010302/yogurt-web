<template>
  <div>
    <!-- Header -->
    <div class="create-header">
      <div class="create-header-block">
        <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 12px;">
          <el-breadcrumb-item :to="{ path: '/schedule' }">일정</el-breadcrumb-item>
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
            <StaffSelect class="el-custom-input" @onChange="onStaffChange" />
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
                <el-input-number v-model.number="maxTrainee" :min="1"></el-input-number>
              </div>
              <div>
                <label>최소 수강 인원</label>
                <el-input-number v-model.number="minTrainee" :min="1" :max="maxTrainee"></el-input-number>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 에약 / 취소 / 변경 가능 시간 -->
      <div class="create-form-block">
        <div class="create-form-block__index">04</div>
        <div class="create-form-block__content">
          <div class="create-form-block__label">
            <div class="create-form-block__label__title">에약 / 취소 / 변경 가능 시간 (HH:MM)</div>
          </div>
          <div class="create-form-block__input">
            <div class="create-form-block__booking-time">
              <el-time-select
                v-model="bookingEndTime"
                :picker-options="{
                  start: '00:00',
                  step: '00:05',
                  end: '47:55'
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
                v-model="bookingEndTime"
                :picker-options="{
                  start: '00:00',
                  step: '00:05',
                  end: '47:55'
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
                v-model="bookingEndTime"
                :picker-options="{
                  start: '00:00',
                  step: '00:05',
                  end: '47:55'
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
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import StaffSelect from '@/components/staff/StaffSelect.vue';

@Component({
  components: {
    StaffSelect,
  },
})
export default class TicketCard extends Vue {
  data() {
    return {
      title: '',
      description: '',
      staff: '',
      maxTrainee: 3,
      minTrainee: 1,
      bookingEndTime: '00:10',
      bookingCancelEndTime: '00:10',
      bookingChangeEndTime: '00:10',
    };
  }

  onStaffChange(staffId: string) {
    this.$data.staff = staffId;
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
</style>
