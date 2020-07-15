<template>
  <div>
    <q-table
      title="회원"
      :data="userList"
      :columns="columns"
      color="primary"
      row-key="username"
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

import { ApiResponse } from '../types';

const namespace = 'user';

@Component
export default class User extends Vue {
  data() {
    return {
      selected: [],
      userList: [],
      columns: [
        { name: 'username', required: true, label: '아이디', align: 'center', field: (row: any) => row.username, sortable: true },
        { name: 'email', align: 'center', label: '이메일', field: 'email' },
        { name: 'name', align: 'center', label: '이름', field: 'name' },
        { name: 'phone', align: 'center', label: '전화번호', field: 'phone' },
      ],
      gridFilter: '',
    };
  }

  get primaryColor() {
    return this.$store.state.primaryColor;
  }

  // Life Cycle
  created() {
    this.loadUserList();
  }

  // Methods
  getSelectedString() {
    return this.$data.selected.length === 0 ? '' : `${this.$data.selected.length} record${this.$data.selected.length > 1 ? 's' : ''} selected of ${this.$data.userList.length}`;
  }

  async loadUserList() {
    const result: ApiResponse = await this.$store.dispatch(`${namespace}/loadUserList`);
    this.$data.userList = result.data;
  }
}
</script>

<style>

</style>
