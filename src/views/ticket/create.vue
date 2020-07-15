<template>
  <div class="row">
    <div class="col-2"></div>
    <div class="col-8">
      <div class="q-mb-md"></div>
      <q-stepper v-model="step" ref="stepper" :active-color="primaryColor" :done-color="primaryColor" class="no-shadow" animated>
        <q-step :name="1" title="기본 정보 기입" icon="assignment" :done="step > 1">

          <!-- 수강권 종류 -->
          <div class="text-weight-bold">수강권 종류</div>
          <q-option-group v-model="lectureType" :options="lectureTypeOptions" :color="primaryColor" inline class="q-mb-xl" />

          <!-- 수강권 명 -->
          <div class="text-weight-bold">수강권 명</div>
          <q-input v-model="lectureTitle" dense placeholder="수강권 명을 입력하세요." :color="primaryColor" class="q-mb-xl" />

           <!-- 이용 횟수 -->
          <div class="text-weight-bold">이용 횟수</div>
          <q-input v-model.number="lectureCount" type="number" dense placeholder="이용 횟수를 입력하세요" :color="primaryColor" class="q-mb-xl" style="max-width: 200px" />

          <!-- 수강권 사용기한 -->
          <div class="text-weight-bold">수강권 사용기한</div>
          <q-option-group v-model="availablePeriod" :options="availablePeriodOptions" :color="primaryColor" inline class="q-mb-xl" />

          <!-- 수강 인원 -->
          <div class="text-weight-bold">수강 인원</div>
          <q-input v-model.number="maxTrainee" type="number" dense placeholder="수강 인원을 입력하세요" :color="primaryColor" class="q-mb-xl" style="max-width: 200px" />

          <!-- 수강권 판매가 -->
          <div class="text-weight-bold">수강권 판매가</div>
          <q-input v-model.number="price" dense :color="primaryColor" class="q-mb-xl" style="max-width: 200px" />

        </q-step>

        <q-step :name="2" title="냠" icon="assignment" :done="step > 2">
          <div class="text-h5 text-weight-bold q-mb-lg">냠</div>
        </q-step>

        <q-step :name="3" title="등록" icon="assignment" :done="step > 3">
          지금까지 입력한 정보를 바탕으로 등록을 진행하겠습니다.
        </q-step>

        <template v-slot:navigation>
          <q-stepper-navigation>
            <q-btn @click="onSubmit($refs.stepper);" :color="primaryColor" :label="step === 3 ? 'Finish' : 'Continue'" />
            <q-btn v-if="step > 1" flat :color="primaryColor" @click="$refs.stepper.previous()" label="Back" class="q-ml-sm" />
          </q-stepper-navigation>
        </template>
      </q-stepper>
    </div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';

const namespace = 'ticket';

@Component
export default class TicketCard extends Vue {
  data() {
    return {
      step: 1,
      // Step 1
      lectureType: 'group',
      lectureTypeOptions: [
        {
          label: '그룹형 수업 전용',
          value: 'group',
        },
        {
          label: '프라이빗형 수업 전용',
          value: 'private',
        }
      ],
      lectureTitle: '',
      lectureCount: 30,
      availablePeriod: 30,
      availablePeriodOptions: [
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
      maxTrainee: 4,
      price: 0
    };
  }

  get primaryColor() {
    return this.$store.state.primaryColor;
  }

  toggleCalendar() {
    this.$data.showCalendar = !this.$data.showCalenda;
  }

  hideCalendar() {
    this.$data.showCalendar = false;
  }

  onSubmit(stepper: any) {
    if(this.$data.step === 3) {
      this.$store.dispatch(`${namespace}/saveTicket`, {
        lectureType: this.$data.lectureType,
        lectureTitle: this.$data.lectureTitle,
        lectureCount: this.$data.lectureCount,
        availablePeriod: this.$data.availablePeriod,
        maxTrainee: this.$data.maxTrainee,
        price: this.$data.price
      });
      this.$router.push({ path: '/ticket' });
    }
    stepper.next();
  }

  @Watch('calendarDate')
  onDateFileterChanged() {
    this.hideCalendar();
  }
}
</script>
