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
      <StaffSelect style="margin-left: 14px;" @onChange="onStaffChange" />

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
import StaffSelect from '@/components/staff/StaffSelect.vue';
import { parseDate, getCurrentDate, getDateByCalculateDay } from '@/util/date';
import { StaffData } from '@/store/staff/types';

const lectureNamespace = 'lecture';
const staffNamespace = 'staff';

interface Column {
  id: number;
}

@Component({
  components: {
    StaffSelect,
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
    };
  }

  get lectures() {
    return this.$store.getters[`${lectureNamespace}/getLectures`];
  }

  get staffOptions() {
    const staffs: StaffData = this.$store.getters[
      `${staffNamespace}/getStaffs`
    ];
    if (staffs.data) {
      return staffs.data.map((staff) => staff.user.name);
    }
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

  onStaffChange(staffId: string) {
    this.$data.staffFilter = staffId;
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
