<template>
  <div class="row">
    <div class="col-2"></div>
    <div class="col-8">
      <div class="q-mb-md"></div>
      <q-stepper v-model="step" ref="stepper" :active-color="primaryColor" :done-color="primaryColor" class="no-shadow" animated>
        <q-step :name="1" title="Enter basic information" icon="assignment" :done="step > 1">

          <!-- 이름 -->
          <div class="text-weight-bold">name</div>
          <q-input v-model="staffName" dense placeholder="Please enter your name" :color="primaryColor" style="width: 300px" class="q-mb-xl" />

          <!-- 프로필 -->

          <!-- 등록 일자 -->
          <div class="text-weight-bold">hired date</div>
          <q-input v-model="hiredAt" :color="primaryColor" mask="####-##-##" dense class="q-mb-xl" style="width: 120px; height: 50px">
            <template v-slot:prepend>
              <q-icon name="event" :color="primaryColor" style="cursor: pointer">
                <q-menu>
                  <q-list dense>
                    <q-item style="padding: 0 0px">
                      <q-date v-model="hiredAt" :color="primaryColor" minimal />
                    </q-item>
                  </q-list>
                </q-menu>
              </q-icon>
            </template>
          </q-input>

          <!-- 역할 -->
          <div class="text-weight-bold">role</div>
          <q-option-group v-model="staffType" :options="staffTypeOptions" :color="primaryColor" inline class="q-mb-xl" />

          <!-- 자기소개 -->
          <div class="text-weight-bold">self-introduce</div>
          <q-input v-model="introduce" dense placeholder="Please enter your self-introduce" :color="primaryColor" class="q-mb-xl" />

          <!-- 전화번호 -->
          <div class="text-weight-bold">phone number</div>
          <q-input v-model="phone" dense placeholder="Please enter your phone number" :color="primaryColor" style="width: 300px" class="q-mb-xl" mask="###-####-####" />

        </q-step>

        <q-step :name="2" title="working time" icon="assignment" :done="step > 2">
          <div class="text-h5 text-weight-bold q-mb-lg">working time</div>

          <div class="text-weight-bold q-mb-md q-mt-md">monday</div>
          <div class="row items-center">
            <q-input v-model="monWorkingStartTime" dense :disable="isMonHoliday" class="q-mr-md" style="width: 100px" /> ~
            <q-input v-model="monWorkingEndTime" dense :disable="isMonHoliday" class="q-ml-md" style="width: 100px" />
            <q-checkbox v-model="isMonHoliday" :color="primaryColor" dense class="q-ml-md q-mr-sm" /> off
          </div>

          <div class="text-weight-bold q-mb-md q-mt-md">tuesday</div>
          <div class="row items-center">
            <q-input v-model="tueWorkingStartTime" dense :disable="isTueHoliday" class="q-mr-md" style="width: 100px" /> ~
            <q-input v-model="tueWorkingEndTime" dense :disable="isTueHoliday" class="q-ml-md" style="width: 100px" />
            <q-checkbox v-model="isTueHoliday" :color="primaryColor" dense class="q-ml-md q-mr-sm" /> off
          </div>

          <div class="text-weight-bold q-mb-md q-mt-md">wednesday</div>
          <div class="row items-center">
            <q-input v-model="wedWorkingStartTime" dense :disable="isWedHoliday" class="q-mr-md" style="width: 100px" /> ~
            <q-input v-model="wedWorkingEndTime" dense :disable="isWedHoliday" class="q-ml-md" style="width: 100px" />
            <q-checkbox v-model="isWedHoliday" :color="primaryColor" dense class="q-ml-md q-mr-sm" /> off
          </div>

          <div class="text-weight-bold q-mb-md q-mt-md">thursday</div>
          <div class="row items-center">
            <q-input v-model="thuWorkingStartTime" dense :disable="isThuHoliday" class="q-mr-md" style="width: 100px" /> ~
            <q-input v-model="thuWorkingEndTime" dense :disable="isThuHoliday" class="q-ml-md" style="width: 100px" />
            <q-checkbox v-model="isThuHoliday" :color="primaryColor" dense class="q-ml-md q-mr-sm" /> off
          </div>

          <div class="text-weight-bold q-mb-md q-mt-md">friday</div>
          <div class="row items-center">
            <q-input v-model="friWorkingStartTime" dense :disable="isFriHoliday" class="q-mr-md" style="width: 100px" /> ~
            <q-input v-model="friWorkingEndTime" dense :disable="isFriHoliday" class="q-ml-md" style="width: 100px" />
            <q-checkbox v-model="isFriHoliday" :color="primaryColor" dense class="q-ml-md q-mr-sm" /> off
          </div>

          <div class="text-weight-bold q-mb-md q-mt-md">saturday</div>
          <div class="row items-center">
            <q-input v-model="satWorkingStartTime" dense :disable="isSatHoliday" class="q-mr-md" style="width: 100px" /> ~
            <q-input v-model="satWorkingEndTime" dense :disable="isSatHoliday" class="q-ml-md" style="width: 100px" />
            <q-checkbox v-model="isSatHoliday" :color="primaryColor" dense class="q-ml-md q-mr-sm" /> off
          </div>

          <div class="text-weight-bold q-mb-md q-mt-md">sunday</div>
          <div class="row items-center">
            <q-input v-model="sunWorkingStartTime" dense :disable="isSunHoliday" class="q-mr-md" style="width: 100px" /> ~
            <q-input v-model="sunWorkingEndTime" dense :disable="isSunHoliday" class="q-ml-md" style="width: 100px" />
            <q-checkbox v-model="isSunHoliday" :color="primaryColor" dense class="q-ml-md q-mr-sm" /> off
          </div>
        </q-step>

        <q-step :name="3" title="registration" icon="assignment" :done="step > 3">
          We will register based on the information you have entered so far.
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
import { parseDate } from '../../util';

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
      staffType: 'instructor',
      profileUrl: '',
      staffTypeOptions: [
        {
          label: 'instructor',
          value: 'instructor',
        },
        {
          label: 'manager',
          value: 'manager',
        },
        {
          label: 'owner',
          value: 'owner',
        },
      ],
      showCalendar: false,
      hiredAt: parseDate(new Date(), 'yyyy/mm/dd'),

      // Step 2
      isMonHoliday: true,
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
