<template>
  <div class="q-pa-lg">
    <PageTitle text="수업 목록" class="q-mb-xl" />

    <el-table :data="users" style="width: 100%;">
      <el-table-column prop="name" label="이름" width="180"></el-table-column>
      <el-table-column prop="phone" label="전화번호" width="180"></el-table-column>
      <el-table-column prop="createdAt" label="등록일" width="180"></el-table-column>
      <el-table-column prop="ticket" label="보유 수강권" width="180"></el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import PageTitle from '@/components/base/PageTitle.vue';
import { User as UserType } from '@/store/user/types';

const namespace = 'user';

@Component({
  components: {
    PageTitle,
  },
})
export default class User extends Vue {
  data() {
    return {
      gridFilter: '',
    };
  }

  get primary() {
    return this.$store.state.primary;
  }

  get users() {
    const users = this.$store.getters[`${namespace}/getUsers`];
    if (users) {
      return users.map((user: UserType) => {
        const userColumn: any = {};
        userColumn.name = user.name;
        userColumn.phone = user.phone;
        userColumn.createdAt = user.createdAt.substring(0, 10);
        userColumn.ticket = user.userTickets.length
          ? user.userTickets[0].ticket.title
          : '';
        return userColumn;
      });
    } else {
      return [];
    }
  }

  async created() {
    await this.getUsers();
  }

  async getUsers() {
    await this.$store.dispatch(`${namespace}/getUsers`);
  }
}
</script>

<style></style>
