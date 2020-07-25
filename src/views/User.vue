<template>
  <div>
    <q-table
      title="회원"
      :data="users"
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

const namespace = 'user';

@Component
export default class User extends Vue {
  data() {
    return {
      selected: [],
      columns: [
        { name: 'username', required: true, label: 'username', align: 'center', field: (row: any) => row.username, sortable: true },
        { name: 'email', align: 'center', label: 'email', field: 'email' },
        { name: 'name', align: 'center', label: 'name', field: 'name' },
        { name: 'phone', align: 'center', label: 'phone', field: 'phone' },
      ],
      gridFilter: '',
    };
  }

  get primaryColor() {
    return this.$store.state.primaryColor;
  }

  get users() {
    return this.$store.getters[`${namespace}/getUsers`];
  }

  // Life Cycle
  async created() {
    await this.getUsers();
  }

  // Methods
  getSelectedString() {
    return this.$data.selected.length === 0 ? '' : `${this.$data.selected.length} record${this.$data.selected.length > 1 ? 's' : ''} selected of ${this.$data.users.length}`;
  }

  async getUsers() {
    await this.$store.dispatch(`${namespace}/loadUsers`);
  }
}
</script>

<style>

</style>
