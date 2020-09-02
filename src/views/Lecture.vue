<template>
  <div class="padded">
    <h3>수업 목록</h3>

    <!-- 검색 조건 -->
    <div>
      <!-- 날짜/기간 -->
      <el-select v-model="searchType" style="width: 90px;">
        <el-option
          v-for="item in searchTypeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>

      <!-- 날짜-->
      <el-date-picker
        v-if="searchType === 'date'"
        v-model="dateFilter"
        type="date"
        :clearable="false"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        style="width: 140px; margin-left: 10px;"
      ></el-date-picker>
      <!-- 기간 날짜 -->
      <el-date-picker
        v-if="searchType === 'period'"
        v-model="periodFilter"
        type="daterange"
        :clearable="false"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        style="margin-left: 10px;"
      ></el-date-picker>

      <!-- 요일 -->
      <el-select v-model="weekFilter" placeholder="모든 요일" style="width: 140px; margin-left: 10px;">
        <el-option
          v-for="item in ['월', '화', '수', '목', '금', '토', '일']"
          :key="item"
          :label="item"
          :value="item"
        ></el-option>
      </el-select>

      <!-- 강사 -->
      <el-select v-model="staffFilter" placeholder="강사 전체" style="width: 140px; margin-left: 10px;">
        <el-option v-for="item in staffOptions" :key="item" :label="item" :value="item"></el-option>
      </el-select>

      <!-- 수업 타입 -->
      <el-select
        v-model="lectureType"
        clearable
        placeholder="수업 전체"
        style="width: 140px; margin-left: 10px;"
      >
        <el-option
          v-for="item in lectureTypeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>

    <!-- 테이블 -->
    <el-table :data="lectures" style="width: 100%;" @row-click="onRowClick">
      <el-table-column prop="name" label="수업일시" width="180"></el-table-column>
      <el-table-column prop="phone" label="강사" width="180"></el-table-column>
      <el-table-column prop="createdAt" label="수업" width="180"></el-table-column>
      <el-table-column prop="ticket" label="수업명" width="180"></el-table-column>
      <el-table-column prop="ticket" label="수강인원" width="180"></el-table-column>
      <el-table-column prop="ticket" label="예약 가능 시간" width="180"></el-table-column>
      <el-table-column prop="ticket" label="취소 가능 시간" width="180"></el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import { parseDate, getCurrentDate, getDateByCalculateDay } from '@/util/date';
import { Staff } from '@/store/staff/types';

const lectureNamespace = 'lecture';
const staffNamespace = 'staff';

interface Column {
  id: number;
}

@Component
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

  getLectures() {
    // const searchType = this.$data.searchType;
    // if (searchType === 'date') {
    // }
    // this.$store.dispatch(`${lectureNamespace}/getLectures`, {
    //   lectureDate: this.$data.dateFilter,
    //   lectureType: this.$data.lectureType,
    // });
  }

  onRowClick(row: Column) {
    console.log(row);
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
