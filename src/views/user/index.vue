<template>
  <div class="padded">
    <h3>회원</h3>

    <el-table
      v-loading="usersWaiting"
      :data="userData"
      style="width: 100%;"
      @row-click="onRowClick"
    >
      <el-table-column prop="name" label="이름" width="180"></el-table-column>
      <el-table-column prop="phone" label="전화번호" width="180"></el-table-column>
      <el-table-column prop="createdAt" label="등록일" width="180"></el-table-column>
      <el-table-column prop="ticket" label="보유 수강권" width="180"></el-table-column>
    </el-table>

    <!-- 유저 로딩 중 -->
    <!-- <div v-if="usersWaiting">
      <Skeleton height="50px" />
    </div>-->
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Skeleton } from 'vue-loading-skeleton';
import { User as UserType, UsersData } from '@/store/user/types';
import { AsyncStatus } from '@/store/types';

const namespace = 'user';

interface Column {
  id: number;
  name: string;
  phone: string;
  ticket: string;
  createdAt: string;
}

// @ts-ignore
@Component({
  components: {
    Skeleton,
  },
})
export default class User extends Vue {
  data() {
    return {
      gridFilter: '',
    };
  }

  get users(): UsersData {
    return this.$store.getters[`${namespace}/getUsers`];
  }

  get usersWaiting() {
    return this.users.status === AsyncStatus.WAITING;
  }

  get usersSuccess() {
    return this.users.status === AsyncStatus.SUCCESS;
  }

  get userData(): Column[] | null {
    if (this.users.data) {
      const ang = this.users.data.map((user: UserType) => {
        const userColumn: Column = {
          id: user.id,
          name: user.name,
          phone: user.phone,
          createdAt: user.createdAt.substring(0, 10),
          ticket: user.userTickets.length
            ? user.userTickets[0].ticket.title
            : '',
        };
        return userColumn;
      });
      return ang;
    } else {
      return null;
    }
  }

  async created() {
    await this.getUsers();
  }

  async getUsers() {
    await this.$store.dispatch(`${namespace}/getUsers`);
  }

  onRowClick(row: Column) {
    this.$router.push(`/user/detail/${row.id}`);
  }
}
</script>

<style></style>
