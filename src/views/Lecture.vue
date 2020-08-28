<template>
  <div class="q-pa-lg">
    <PageTitle text="수업 목록" class="q-mb-xl" />

    <!-- 검색 조건 -->
    <div class="q-gutter-x-md q-mb-md row">
      <!-- 날짜/기간 선택 필터 -->
      <q-select
        v-model="periodFilter"
        :options="periodOptions"
        color="primary"
        outlined
        style="width: 90px;"
      />

      <!-- 날짜 필터 -->
      <q-input
        v-model="dateFilter"
        color="primary"
        mask="####/##/##"
        outlined
        style="width: 150px;"
      >
        <q-popup-proxy transition-show="scale" transition-hide="scale">
          <q-date v-model="dateFilter" color="primary">
            <div class="row items-center justify-end q-gutter-sm">
              <q-btn label="Cancel" color="primary" flat v-close-popup />
              <q-btn label="OK" color="primary" flat @click="save" v-close-popup />
            </div>
          </q-date>
        </q-popup-proxy>
        <template v-slot:prepend>
          <q-icon name="event" />
        </template>
      </q-input>

      <!-- 수업 타입 필터 -->
      <q-select
        v-model="lectureTypeFilter"
        :options="lectureTypeOptions"
        outlined
        style="width: 130px;"
      />
    </div>

    <!-- 테이블 -->
    <q-table
      :data="lectures"
      :columns="columns"
      color="primary"
      row-key="name"
      :filter="gridFilter"
      selection="multiple"
      :selected-rows-label="getSelectedString"
      :selected.sync="selected"
    >
      <template v-slot:top-right>
        <q-btn color="primary" icon-right="archive" label="Export to excel" no-caps />
      </template>

      <template v-slot:top-left>
        <q-input
          borderless
          dense
          debounce="300"
          v-model="gridFilter"
          placeholder="Search"
          class="q-mr-md"
        >
          <template v-slot:append>
            <q-icon name="search" />
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
import PageTitle from '@/components/base/PageTitle.vue';
import { parseDate } from '@/util/date';

const namespace = 'lecture';

@Component({
  components: {
    PageTitle,
  },
})
export default class Lecture extends Vue {
  data() {
    return {
      // Filter
      periodFilter: {
        label: '날짜',
        value: 'date',
      },
      periodOptions: [
        {
          label: '날짜',
          value: 'date',
        },
        {
          label: '기간',
          value: 'period',
        },
      ],
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
      dateFilter: parseDate(new Date(), 'yyyy/mm/dd'),
      gridFilter: '',

      // Calendar
      selected: [],
      columns: [
        {
          name: 'lectureDate',
          required: true,
          label: '수업일시',
          align: 'center',
          field: (row: any) => row.name,
          sortable: true,
        },
        {
          name: 'instructor',
          align: 'center',
          label: '강사',
          field: 'instructor',
        },
        {
          name: 'lectureType',
          align: 'center',
          label: '수업',
          field: 'lectureType',
        },
        {
          name: 'lectureName',
          align: 'center',
          label: '수업명',
          field: 'lectureName',
        },
        {
          name: 'entry',
          align: 'center',
          label: '수강인원',
          field: 'entry',
        },
        {
          name: 'reservationTime',
          align: 'center',
          label: '예약 가능 시간',
          field: 'reservationTime',
        },
        {
          name: 'cancelTime',
          align: 'center',
          label: '취소 가능 시간',
          field: 'cancelTime',
        },
      ],
    };
  }

  get primary() {
    return this.$store.state.primary;
  }

  get lectures() {
    return this.$store.getters[`${namespace}/getLectures`];
  }

  getSelectedString() {
    return this.$data.selected.length === 0
      ? ''
      : `${this.$data.selected.length} record${
          this.$data.selected.length > 1 ? 's' : ''
        } selected of ${this.lectures.length}`;
  }

  getLectures() {
    this.$store.dispatch(`${namespace}/getLectures`, {
      // yyyy/mm/dd - yyyy-mm-dd
      lectureDate: this.$data.dateFilter.replace(/\//gi, '-'),
      lectureType: this.$data.lectureTypeFilter.value,
    });
  }

  @Watch('periodFilter')
  onPeriodFilterChanged() {
    this.getLectures();
  }

  @Watch('lectureTypeFilter')
  onLectureTypeFilterChanged() {
    this.getLectures();
  }

  @Watch('dateFilter')
  onDateFilterChanged() {
    this.getLectures();
  }
}
</script>
