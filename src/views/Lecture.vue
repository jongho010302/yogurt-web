<template>
  <div class="q-pa-lg">
    <PageTitle text="수업 목록" class="q-mb-xl" />

    <!-- 검색 조건 -->
    <div class="q-gutter-x-md q-mb-md row">
      <!-- 날짜/기간 -->
      <el-select v-model="searchType" style="width: 90px;">
        <el-option
          v-for="item in searchTypeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>

      <!-- 날짜-->
      <el-date-picker
        v-if="searchType === 'date'"
        v-model="dateFilter"
        type="date"
        :clearable="false"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        style="width: 140px;"
      ></el-date-picker>
      <!-- 기간 날짜 -->
      <el-date-picker
        v-if="searchType === 'period'"
        v-model="periodFilter"
        type="daterange"
        :clearable="false"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
      >
      </el-date-picker>

      <!-- 요일 -->
      <el-select
        v-model="weekFilter"
        placeholder="모든 요일"
        style="width: 140px;"
      >
        <el-option
          v-for="item in ['월', '화', '수', '목', '금', '토', '일']"
          :key="item"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>

      <!-- 강사 -->
      <el-select
        v-model="staffFilter"
        placeholder="강사 전체"
        style="width: 140px;"
      >
        <el-option
          v-for="item in staffOptions"
          :key="item"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>

      <!-- 수업 타입 -->
      <el-select
        v-model="lectureType"
        clearable
        placeholder="수업 전체"
        style="width: 140px;"
      >
        <el-option
          v-for="item in lectureTypeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
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
        <q-btn
          color="primary"
          icon-right="archive"
          label="Export to excel"
          no-caps
        />
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
import { parseDate, getCurrentDate, getDateByCalculateDay } from '@/util/date';
import { Staff } from '@/store/staff/types';

const lectureNamespace = 'lecture';
const staffNamespace = 'staff';

@Component({
  components: {
    PageTitle,
  },
})
export default class Lecture extends Vue {
  data() {
    return {
      // Filter
      searchType: 'date',
      searchTypeOptions: [
        {
          label: '날짜',
          value: 'date',
        },
        {
          label: '기간',
          value: 'period',
        },
      ],
      weekFilter: null,
      lectureType: null,
      staffFilter: null,
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
      dateFilter: parseDate(getCurrentDate(), 'yyyy-mm-dd'),
      periodFilter: [
        parseDate(getDateByCalculateDay(-7), 'yyyy-mm-dd'),
        parseDate(getCurrentDate(), 'yyyy-mm-dd'),
      ],
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
    return this.$store.getters[`${lectureNamespace}/getLectures`];
  }

  get staffOptions() {
    const staffs = this.$store.getters[`${staffNamespace}/getStaffs`];
    return staffs.map((staff: Staff) => staff.user.name);
  }

  async created() {
    await this.getStaffs();
  }

  async getStaffs() {
    await this.$store.dispatch(`${staffNamespace}/getStaffs`);
  }

  getSelectedString() {
    return this.$data.selected.length === 0
      ? ''
      : `${this.$data.selected.length} record${
          this.$data.selected.length > 1 ? 's' : ''
        } selected of ${this.lectures.length}`;
  }

  getLectures() {
    // const searchType = this.$data.searchType;
    // if (searchType === 'date') {
    // }
    // this.$store.dispatch(`${lectureNamespace}/getLectures`, {
    //   lectureDate: this.$data.dateFilter,
    //   lectureType: this.$data.lectureType,
    // });
  }

  @Watch('searchType')
  onPeriodFilterChanged() {
    this.getLectures();
  }

  @Watch('lectureType')
  onLectureTypeFilterChanged() {
    this.getLectures();
  }

  @Watch('dateFilter')
  onDateFilterChanged() {
    this.getLectures();
  }
}
</script>
