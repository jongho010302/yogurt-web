<template>
  <div class="row">
    <div class="col-2"></div>
    <div class="col-8">
      <div class="q-mb-md"></div>
      <q-stepper v-model="step" ref="stepper" active-color="black" :done-color="primaryColor" class="no-shadow" animated>
        <q-step :name="1" title="기본 정보 기입" icon="assignment" :done="step > 1">

          <!-- 이름 -->
          <div class="text-weight-bold">이름</div>
          <q-input v-model="staffName" dense placeholder="이름을 입력해주세요." :color="primaryColor" style="width: 300px" class="q-mb-xl" />

          <!-- 프로필 -->

          <!-- 등록 일자 -->
          <div class="text-weight-bold">등록 일자</div>
          <q-input v-model="regDate" :color="primaryColor" mask="####-##-##" dense class="q-mb-xl" style="width: 120px; height: 50px">
            <template v-slot:prepend>
              <q-icon name="event" style="cursor: pointer">
                <q-menu>
                  <q-list dense>
                    <q-item style="padding: 0 0px">
                      <q-date v-model="regDate" :color="primaryColor" minimal />
                    </q-item>
                  </q-list>
                </q-menu>
              </q-icon>
            </template>
          </q-input>

          <!-- 역할 -->
          <div class="text-weight-bold">역할</div>
          <q-option-group v-model="staffType" :options="staffTypeOptions" :color="primaryColor" inline class="q-mb-xl" />

          <!-- 자기소개 -->
          <div class="text-weight-bold">자기소개</div>
          <q-input v-model="introduce" dense placeholder="자기 소개를 입력하세요." :color="primaryColor" class="q-mb-xl" />

          <!-- 전화번호 -->
          <div class="text-weight-bold">전화번호</div>
          <q-input v-model="phone" dense placeholder="전화번호를 입력해주세요." :color="primaryColor" style="width: 300px" class="q-mb-xl" mask="###-####-####" />

        </q-step>

        <q-step :name="2" title="근무시간 설정" icon="assignment" :done="step > 2">
          <div class="text-h5 text-weight-bold q-mb-lg">근무 시간</div>

          <div class="text-weight-bold q-mb-md q-mt-md">월요일</div>
          <div class="row items-center">
            <q-input v-model="monWorkingStartTime" dense :disabled="isMonHoliday" class="q-mr-md" style="width: 100px" /> ~
            <q-input v-model="monWorkingEndTime" dense :disabled="isMonHoliday" class="q-ml-md" style="width: 100px" />
            <q-checkbox v-model="isMonHoliday" dense class="q-ml-md q-mr-sm" /> 휴무일
          </div>

          <div class="text-weight-bold q-mb-md q-mt-md">화요일</div>
          <div class="row items-center">
            <q-input v-model="tueWorkingStartTime" dense :disabled="isTueHoliday" class="q-mr-md" style="width: 100px" /> ~
            <q-input v-model="tueWorkingEndTime" dense :disabled="isTueHoliday" class="q-ml-md" style="width: 100px" />
            <q-checkbox v-model="isTueHoliday" dense class="q-ml-md q-mr-sm" /> 휴무일
          </div>

          <div class="text-weight-bold q-mb-md q-mt-md">수요일</div>
          <div class="row items-center">
            <q-input v-model="wedWorkingStartTime" dense :disabled="isWedHoliday" class="q-mr-md" style="width: 100px" /> ~
            <q-input v-model="wedWorkingEndTime" dense :disabled="isWedHoliday" class="q-ml-md" style="width: 100px" />
            <q-checkbox v-model="isWedHoliday" dense class="q-ml-md q-mr-sm" /> 휴무일
          </div>

          <div class="text-weight-bold q-mb-md q-mt-md">목요일</div>
          <div class="row items-center">
            <q-input v-model="thuWorkingStartTime" dense :disabled="isThuHoliday" class="q-mr-md" style="width: 100px" /> ~
            <q-input v-model="thuWorkingEndTime" dense :disabled="isThuHoliday" class="q-ml-md" style="width: 100px" />
            <q-checkbox v-model="isThuHoliday" dense class="q-ml-md q-mr-sm" /> 휴무일
          </div>

          <div class="text-weight-bold q-mb-md q-mt-md">금요일</div>
          <div class="row items-center">
            <q-input v-model="friWorkingStartTime" dense :disabled="isFriHoliday" class="q-mr-md" style="width: 100px" /> ~
            <q-input v-model="friWorkingEndTime" dense :disabled="isFriHoliday" class="q-ml-md" style="width: 100px" />
            <q-checkbox v-model="isFriHoliday" dense class="q-ml-md q-mr-sm" /> 휴무일
          </div>

          <div class="text-weight-bold q-mb-md q-mt-md">토요일</div>
          <div class="row items-center">
            <q-input v-model="satWorkingStartTime" dense :disabled="isSatHoliday" class="q-mr-md" style="width: 100px" /> ~
            <q-input v-model="satWorkingEndTime" dense :disabled="isSatHoliday" class="q-ml-md" style="width: 100px" />
            <q-checkbox v-model="isSatHoliday" dense class="q-ml-md q-mr-sm" /> 휴무일
          </div>

          <div class="text-weight-bold q-mb-md q-mt-md">일요일</div>
          <div class="row items-center">
            <q-input v-model="sunWorkingStartTime" dense :disabled="isSunHoliday" class="q-mr-md" style="width: 100px" /> ~
            <q-input v-model="sunWorkingEndTime" dense :disabled="isSunHoliday" class="q-ml-md" style="width: 100px" />
            <q-checkbox v-model="isSunHoliday" dense class="q-ml-md q-mr-sm" /> 휴무일
          </div>
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
import { parseDate } from '../../assets/common';

const namespace = 'staff';

@Component
export default class TicketCard extends Vue {
  data() {
    return {
      step: 1,
      // Step 1
      staffName: '',
      phone: '',
      introduce: '',
      staffType: 'lecturer',
      profileUrl: '',
      staffTypeOptions: [
        {
          label: '강사',
          value: 'lecturer',
        },
        {
          label: '매니저',
          value: 'manager',
        },
        {
          label: '스튜디오 오너',
          value: 'owner',
        },
      ],
      showCalendar: false,
      regDate: parseDate(new Date(), 'yyyy/mm/dd'),

      // Step 2
      isMonHoliday: false,
      monWorkingStartTime: '09:00',
      monWorkingEndTime: '18:00',
      isTueHoliday: false,
      tueWorkingStartTime: '09:00',
      tueWorkingEndTime: '18:00',
      isWedHoliday: false,
      wedWorkingStartTime: '09:00',
      wedWorkingEndTime: '18:00',
      isThuHoliday: false,
      thuWorkingStartTime: '09:00',
      thuWorkingEndTime: '18:00',
      isFriHoliday: false,
      friWorkingStartTime: '09:00',
      friWorkingEndTime: '18:00',
      isSatHoliday: false,
      satWorkingStartTime: '09:00',
      satWorkingEndTime: '18:00',
      isSunHoliday: false,
      sunWorkingStartTime: '09:00',
      sunWorkingEndTime: '18:00',
    };
  }

  get primaryColor() {
    return this.$store.state.primaryColor;
  }

  onSubmit(stepper: any) {
    if(this.$data.step === 3) {
      this.$store.dispatch(`${namespace}/saveStaff`, {
        staffType: this.$data.staffType,
        name: this.$data.staffName,
        phone: this.$data.phone,
        introduce: this.$data.introduce,
        profileUrl: this.$data.profileUrl,
        isMonHoliday: this.$data.isMonHoliday,
        monWorkingStartTime: this.$data.monWorkingStartTime,
        monWorkingEndTime: this.$data.monWorkingEndTime,
        isTueHoliday: this.$data.isTueHoliday,
        tueWorkingStartTime: this.$data.tueWorkingStartTime,
        tueWorkingEndTime: this.$data.tueWorkingEndTime,
        isWedHoliday: this.$data.isWedHoliday,
        wedWorkingStartTime: this.$data.wedWorkingStartTime,
        wedWorkingEndTime: this.$data.wedWorkingEndTime,
        isThuHoliday: this.$data.isThuHoliday,
        thuWorkingStartTime: this.$data.thuWorkingStartTime,
        thuWorkingEndTime: this.$data.thuWorkingEndTime,
        isFriHoliday: this.$data.isFriHoliday,
        friWorkingStartTime: this.$data.friWorkingStartTime,
        friWorkingEndTime: this.$data.friWorkingEndTime,
        isSatHoliday: this.$data.isSatHoliday,
        satWorkingStartTime: this.$data.satWorkingStartTime,
        satWorkingEndTime: this.$data.satWorkingEndTime,
        isSunHoliday: this.$data.isSunHoliday,
        sunWorkingStartTime: this.$data.sunWorkingStartTime,
        sunWorkingEndTime: this.$data.sunWorkingEndTime,
        regTime: this.$data.regDate
      });
      this.$router.push({ path: '/staff' });
    }
    stepper.next();
  }
}
</script>
