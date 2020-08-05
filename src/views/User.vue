<template>
  <div class="q-pa-lg">
    <PageTitle text="수업 목록" class="q-mb-xl" />

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
          label="엑셀다운로드"
          no-caps
        />
      </template>
      <template v-slot:top-left>
        <q-input
          v-model="gridFilter"
          :color="primaryColor"
          placeholder="검색"
          debounce="300"
          dense
          class="q-mr-md"
        >
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
import PageTitle from '@/components/base/PageTitle.vue';

const namespace = 'user';

@Component({
  components: {
    PageTitle
  }
})
export default class User extends Vue {
  data() {
    return {
      selected: [],
      columns: [
        {
          name: 'username',
          required: true,
          label: 'username',
          align: 'center',
          field: (row: any) => row.username,
          sortable: true,
        },
        { name: 'email', align: 'center', label: 'email', field: 'email' },
        { name: 'name', align: 'center', label: 'name', field: 'name' },
        { name: 'phone', align: 'center', label: 'phone', field: 'phone' },
        { name: 'role', align: 'center', label: 'role', field: 'role' },
      ],
      gridFilter: '',
    };
  }

  get primaryColor() {
    return this.$store.state.primaryColor;
  }

  get users() {
    console.log(this.$store.getters[`${namespace}/getUsers`]);
    return this.$store.getters[`${namespace}/getUsers`];
  }

  // Life Cycle
  async created() {
    await this.getUsers();
  }

  // Methods
  getSelectedString() {
    return this.$data.selected.length === 0
      ? ''
      : `${this.$data.selected.length} record${
          this.$data.selected.length > 1 ? 's' : ''
        } selected of ${this.users.length}`;
  }

  async getUsers() {
    await this.$store.dispatch(`${namespace}/getUsers`);
  }
}
</script>

<style></style>
