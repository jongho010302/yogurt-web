<template>
  <div>
    <!-- 검색 조건 -->
    <div class="q-gutter-x-md q-mb-md row">
      <!-- 날짜/기간 선택 필터 -->
      <q-select
        v-model="periodFilter"
        :options="periodOptions"
        outlined
        style="width: 90px"
      />

      <!-- 날짜 필터 -->
      <q-input v-model="dateFilter" :color="primaryColor" mask="####-##-##" outlined style="width: 150px">
        <template v-slot:prepend>
          <q-icon name="event" :color="primaryColor" style="cursor: pointer">
            <q-menu>
              <q-list dense>
                <q-item style="padding: 0 0px">
                  <q-date v-model="dateFilter" :color="primaryColor" minimal />
                </q-item>
              </q-list>
            </q-menu>
          </q-icon>
        </template>
      </q-input>

      <!-- 수업 타입 필터 -->
      <q-select
        v-model="lectureTypeFilter"
        :options="lectureTypeOptions"
        outlined
        style="width: 130px"
      />
    </div>

    <!-- 테이블 -->
    <q-table
      :data="lectureList"
      :columns="columns"
      color="primary"
      row-key="name"
      :filter="gridFilter"
      selection="multiple"
      :selected-rows-label="getSelectedString"
      :selected.sync="selected"
    >
      <template v-slot:top-right>
        <q-btn
          :color="primaryColor"
          icon-right="archive"
          label="Export to excel"
          no-caps
        />
      </template>

      <template v-slot:top-left>
        <q-input borderless dense debounce="300" v-model="gridFilter" placeholder="Search" class="q-mr-md">
          <template v-slot:append>
            <q-icon name="search" :color="primaryColor" />
          </template>
        </q-input>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';

const namespace = 'lecture';

@Component
export default class Lecture extends Vue {
  data() {
    return {
      // Filter
      periodFilter: '날짜',
      periodOptions: ['날짜', '기간'],
      lectureTypeFilter: {
        label: '그룹',
        value: 'group',
      },
      lectureTypeOptions: [
        {
          label: '그룹',
          value: 'group',
        },
        {
          label: '프라이빗',
          value: 'private',
        },
      ],
      dateFilter: '',
      gridFilter: '',

      // Calendar
      selected: [],
      columns: [
        { name: 'lectureDate', required: true, label: '수업일시', align: 'center', field: (row: any) => row.name, sortable: true },
        { name: 'instructor', align: 'center', label: '강사', field: 'instructor' },
        { name: 'lectureType', align: 'center', label: '수업', field: 'lectureType' },
        { name: 'lectureName', align: 'center', label: '수업명', field: 'lectureName' },
        { name: 'entry', align: 'center', label: '인원', field: 'entry' },
        { name: 'reservationTime', align: 'center', label: '예약 가능 시간', field: 'reservationTime' },
        { name: 'cancelTime', align: 'center', label: '취소 가능 시간', field: 'cancelTime' },
      ],
    };
  }

  get primaryColor() {
    return this.$store.state.primaryColor;
  }

  get lectureList() {
    return this.$store.getters[`${namespace}/getLectureList`];
  }

  // Life Cycle
  created() {
    this.loadTodayDate();
  }

  // Methods
  loadTodayDate() {
    // Date Picker
    const currentDay = new Date();
    const year = currentDay.getFullYear().toString();
    let month = (currentDay.getMonth() + 1).toString();
    let day = (currentDay.getDate()).toString();

    if(month.length < 2) month = `0${month}`;
    if(day.length < 2) day = `0${day}`;

    this.$data.dateFilter = `${year}/${month}/${day}`;
  }

  getSelectedString() {
    return this.$data.selected.length === 0 ? '' : `${this.$data.selected.length} record${this.$data.selected.length > 1 ? 's' : ''} selected of ${this.lectureList.length}`;
  }

  loadLectureList() {
    this.$store.dispatch(`${namespace}/loadLectureList`, {
      lectureDate: this.$data.dateFilter,
      lectureType: this.$data.lectureTypeFilter.value,
    });
  }

  @Watch('periodFilter')
  onPeriodFilterChanged() {
    this.loadLectureList();
  }

  @Watch('lectureTypeFilter')
  onLectureTypeFilterChanged() {
    this.loadLectureList();
  }

  @Watch('dateFilter')
  onDateFilterChanged() {
    this.loadLectureList();
  }
}
</script>
