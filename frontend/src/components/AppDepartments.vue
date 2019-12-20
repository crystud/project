<template>
  <div class="departments">
    <app-card class="header">Departments</app-card>

    <app-card class="departments-list">
      <app-department-item
        v-for="(data, index) in departments"
        v-bind:key="index"
        :id="data.id"
        :name="data.name"
        :leader="data.leader"
        :specialtysCount="data.specialtys.length"
      ></app-department-item>

      <app-add-department></app-add-department>
    </app-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import AppCard from './AppCard.vue'
import AppDepartmentItem from './AppDepartmentItem.vue'
import AppAddDepartment from './AppAddDepartment.vue'

import store from '../store'

export default {
  name: 'departments',
  components: {
    AppCard,
    AppDepartmentItem,
    AppAddDepartment,
  },
  computed: {
    ...mapGetters({
      departments: 'departments/list',
    }),
  },
  created() {
    store.dispatch('departments/loadDepartments')
  },
}
</script>

<style lang="less">
.departments {
  .app-card {
    margin-bottom: 10px;
    padding: 10px;
    color: #fff;
  }

  .header {
    display: inline-block;
    font-size: 1.3em;
  }

  .departments-list {
    display: grid;

    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 220px;
    grid-gap: 15px;
  }
}
</style>
