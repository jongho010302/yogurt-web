<template>
  <div>
    <div class="q-pa-lg q-pl-xl">
      <div class="q-mb-xl text-weight-bold">수강권 > 수강권등록</div>

      <!-- 수강권 종류 -->
      <div class="text-weight-bold">수강권 종류</div>
      <q-option-group
        v-model="lessonType"
        :options="lessonTypeOptions"
        :color="primaryColor"
        inline
        class="q-mb-xl"
      />

      <!-- 수강권 명 -->
      <div class="text-weight-bold">수강권 명</div>
      <q-input
        v-model="lessonTitle"
        dense
        placeholder="수강권 명을 입력하세요."
        :color="primaryColor"
        class="q-mb-xl"
      />

      <!-- 이용 횟수 -->
      <div class="text-weight-bold">이용 횟수</div>
      <q-input
        v-model.number="lessonCount"
        type="number"
        dense
        placeholder="이용 횟수를 입력하세요"
        :color="primaryColor"
        class="q-mb-xl"
        style="max-width: 200px;"
      />

      <!-- 수강권 사용기한 -->
      <div class="text-weight-bold">수강권 사용기한</div>
      <q-option-group
        v-model="availablePeriod"
        :options="availablePeriodOptions"
        :color="primaryColor"
        inline
        class="q-mb-xl"
      />

      <!-- 수강 인원 -->
      <div class="text-weight-bold">수강 인원</div>
      <q-input
        v-model.number="maxTrainee"
        type="number"
        dense
        placeholder="수강 인원을 입력하세요"
        :color="primaryColor"
        class="q-mb-xl"
        style="max-width: 200px;"
      />

      <!-- 수강권 판매가 -->
      <div class="text-weight-bold">수강권 판매가</div>
      <q-input
        v-model.number="price"
        dense
        :color="primaryColor"
        class="q-mb-xl"
        style="max-width: 200px;"
      />
    </div>

    <!-- Footer -->
    <div
      class="q-px-lg"
      style="
        position: fixed;
        bottom: 0px;
        left: 56px;
        right: 0px;
        background-color: #64aeff;
        width: 97%;
        height: 60px;
        z-index: 1;
        display: flex;
        align-items: center;
        color: white;
      "
    >
      <span @click="$router.push('/ticket')" style="cursor: pointer;">
        <q-icon name="keyboard_arrow_left" />뒤로가기
      </span>
      <q-space />
      <q-btn
        label="수강권 등록 완료"
        color="white"
        text-color="black"
        @click="onSubmit"
      ></q-btn>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

const namespace = 'ticket';

@Component
export default class TicketCard extends Vue {
  data() {
    return {
      step: 1,
      // Step 1
      lessonType: 'group',
      lessonTypeOptions: [
        {
          label: '그룹형 수업 전용',
          value: 'group',
        },
        {
          label: '프라이빗형 수업 전용',
          value: 'private',
        },
      ],
      lessonTitle: '',
      lessonCount: 30,
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
      price: 0,
    };
  }

  get primaryColor() {
    return this.$store.state.primaryColor;
  }

  onSubmit() {
    try {
      this.$store.dispatch(`${namespace}/saveTicket`, {
        lessonType: this.$data.lessonType,
        lessonTitle: this.$data.lessonTitle,
        lessonCount: this.$data.lessonCount,
        availablePeriod: this.$data.availablePeriod,
        maxTrainee: this.$data.maxTrainee,
        price: this.$data.price,
      });
      this.$router.push({ path: '/ticket' });
    } catch (err) {}
  }
}
</script>
