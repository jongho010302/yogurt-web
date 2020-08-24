<template>
  <div>detail</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import { parseDate } from '@/util/date';

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
      calendarDate: parseDate(new Date(), 'yyyy/mm/dd'),

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

  get primary() {
    return this.$store.state.primary;
  }

  clickCalendarIcon() {
    setTimeout(() => {
      this.$data.showCalendar = true;
    }, 1);
  }

  hideCalendar() {
    this.$data.showCalendar = false;
  }

  onSubmit(stepper: any) {
    if (this.$data.step === 3) {
      this.$store.dispatch(`${namespace}/saveStaff`, {
        staffType: this.$data.staffType,
        name: this.$data.staffName,
        phone: this.$data.phone,
        introduce: this.$data.introduce,
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
      });
      this.$router.push({ path: '/staff' });
    }
    stepper.next();
  }

  @Watch('calendarDate')
  onDateFileterChanged() {
    this.hideCalendar();
  }
}
</script>
